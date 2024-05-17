const router = require("express").Router();
const express = require('express');
const con = require("../config/database.config");
const axios = require('axios').default; // npm install axios
const CryptoJS = require('crypto-js'); // npm install crypto-js
const moment = require('moment'); // npm install moment
const qs = require('qs');
const bodyParser = require('body-parser');


var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  port: 3000,
  secure: true,
  auth: {
    user: "letuankiet29102k2@gmail.com",
    // pass: "grkaaxhoeradbtop",
    pass: "gxlz sdie qgpn byug",
  },
});

// Sử dụng body-parser để parse JSON
router.use(bodyParser.json());


// APP INFO
const config = {
  app_id: '2553',
  key1: 'PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL',
  key2: 'kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz',
  endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
};


router.post('/payment', async (req, res) => {
  const { CartItems, user } = req.body;
  console.log('Received CartItems:', CartItems);
  console.log('Received User:', user);

  // Kiểm tra dữ liệu
  if (!CartItems || !user || !CartItems.products) {
    return res.status(400).json({ error: 'Invalid request data' });
  }

  // Embed data for redirect after payment
  const embed_data = {
    redirecturl: 'http://localhost:3000/success?paymentStatus=success',
    diachinguoimua: user.diachinguoimua, // Thêm thông tin địa chỉ từ user vào embed_data
    emailnguoimua: user.emailnguoimua, // Thêm thông tin email từ user vào embed_data
    sdtnguoimua: user.sdtnguoimua, // Thêm thông tin số điện thoại từ user vào embed_data
    manguoimua: user.manguoimua,
    hotennguoimua: user.hotennguoimua,
    maxa: user.maxa,
  };

  // Generate a random transaction ID
  const transID = Math.floor(Math.random() * 1000000);

  // Initialize the items array and total amount
  const items = [];
  let totalAmount = 0;

  // Iterate over CartItems.products to populate items array and calculate total amount
  CartItems.products.forEach(product => {
    product.data.forEach(item => {
      items.push({
        item_id: item.mathucung,
        item_name: item.tenthucung,
        item_price: item.giamgia,
        item_quantity: product.soluongmua,
      });
      totalAmount += item.giamgia * product.soluongmua;
    });
  });

  console.log("check item :", items);

  // Prepare the order object
  const order = {
    app_id: config.app_id,
    app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
    app_user: 'user123',
    app_time: Date.now(),
    item: JSON.stringify(items),
    embed_data: JSON.stringify(embed_data),
    amount: totalAmount,
    description: `Kimoon Pets - Payment for the order #${transID} by ${user.hotennguoimua}`,
    bank_code: '',
    callback_url: 'https://dbdb-2001-ee0-1a57-6420-8070-17e6-f8a0-45b8.ngrok-free.app/api/zalopay/callback',
  };

  console.log('check order:', order);

  // Generate the MAC
  const data = `${config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
  order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

  // Send the payment request to ZaloPay
  try {
    const result = await axios.post(config.endpoint, null, { params: order });
    return res.status(200).json(result.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});




router.post('/callback', (req, res) => {
  const result = {};

  try {
    const dataStr = req.body.data;
    const reqMac = req.body.mac;

    const mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
    console.log("mac =", mac);

    // Kiểm tra tính hợp lệ của callback (từ ZaloPay server)
    if (reqMac !== mac) {
      // Callback không hợp lệ
      result.return_code = -1;
      result.return_message = "mac not equal";
      res.json(result);
    } else {
      // Thanh toán thành công
      // Merchant cập nhật trạng thái cho đơn hàng và chèn thông tin vào cơ sở dữ liệu
      const dataJson = JSON.parse(dataStr);
      console.log("update order's status = success where app_trans_id =", dataJson["app_trans_id"]);

      // Chèn thông tin vào cơ sở dữ liệu
      const { amount, embed_data, item } = dataJson;
      const { diachinguoimua, emailnguoimua, sdtnguoimua, manguoimua, maxa, hotennguoimua } = JSON.parse(embed_data);

      const address = diachinguoimua;
      // const orderTime = new Date(dataJson.app_time * 1000).toISOString().slice(0, 19).replace('T', ' ');
      const orderTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

      // Đoạn code chèn thông tin vào cơ sở dữ liệu ở đây
      const insertOrderSql = `
        INSERT INTO dathang (manguoimua, maxa, manhanvien, hotendathang, emaildathang, sodienthoaidathang, diachidathang, ghichudathang, ngaydathang, trangthaidathang, tongtiendathang)
        VALUES (?, ?, 0, ?, ?, ?, ?, ?, ?, 3, ?);
      `;
      con.query(insertOrderSql, [
        manguoimua,
        maxa,
        hotennguoimua,
        emailnguoimua,
        sdtnguoimua,
        address,
        'thanh toan zalopay',
        orderTime,
        amount
      ], (error, results) => {
        if (error) {
          console.error('Error inserting order:', error.message);
          result.return_code = 0;
          result.return_message = error.message;
          res.json(result);
          return;
        }

        console.log('Order inserted successfully');
        const orderId = results.insertId;

        // Chèn thông tin chi tiết đơn hàng vào cơ sở dữ liệu
        const insertOrderDetailSql = `
          INSERT INTO chitietdathang (mathucung, madathang, giachitietdathang, soluongchitietdathang, tongtienchitietdathang)
          VALUES (?, ?, ?, ?, ?);
        `;
        const items = JSON.parse(item);

        const promises = items.map(item => {
          return new Promise((resolve, reject) => {
            con.query(insertOrderDetailSql, [
              item.item_id,
              orderId,
              item.item_price,
              item.item_quantity,
              item.item_price * item.item_quantity
            ], (error, results) => {
              if (error) {
                reject(error);
              } else {
                // Sau khi thêm chi tiết đơn hàng thành công, cập nhật số lượng thú cưng
                const updateProductQuantitySql = "UPDATE thucung SET soluong = soluong - ? WHERE mathucung = ?;";
                con.query(updateProductQuantitySql, [item.item_quantity, item.item_id], (error, updateResult) => {
                  if (error) {
                    reject(error);
                  } else {
                    console.log('Product quantity updated successfully');
                    resolve(results);
                  }
                });
              }
            });
          });
        });

        Promise.all(promises)
          .then(() => {
            console.log('All order details inserted and product quantities updated successfully');
            // result.return_code = 1;
            // result.return_message = "success";
            // res.json(result);
            // })
            // Gửi email xác nhận
            var noidung = "";
            noidung +=
              '<div><p>Cảm ơn bạn đã tin tưởng và đặt mua thú cưng tại <font color="#fd5d32"><b>Kimoon Pets</b></font> với mã đơn: ' +
              orderId +
              '</p></div>';
            noidung +=
              "<p><b>Khách hàng:</b> " +
              hotennguoimua +
              "<br /><b>Email:</b> " +
              emailnguoimua +
              "<br /><b>Điện thoại:</b> " +
              sdtnguoimua +
              "<br /><b>Địa chỉ:</b> " +
              address +
              "</p>";

            // Danh sách Sản phẩm đã mua
            noidung +=
              ' <table border="1px" cellpadding="10px" cellspacing="1px"width="100%"><tr><td align="center" bgcolor="#fd5d32" colspan="4"><font color="white"><b>ĐƠN ĐẶT MUA CỦA BẠN</b></font></td></tr><tr id="invoice-bar"><td width="45%"><b>Tên thú cưng</b></td><td width="20%"><b>Giá</b></td><td width="15%"><b>Số lượng</b></td><td width="20%"><b>Thành tiền</b></td></tr>';
            items.forEach(item => {
              noidung +=
                '<tr><td className="prd-name">' +
                item.item_name +
                '</td><td className="prd-price"><font color="#C40000">' +
                item.item_price +
                'VNĐ</font></td><td className="prd-number">' +
                item.item_quantity +
                '</td><td className="prd-total"><font color="#C40000">' +
                item.item_price * item.item_quantity +
                "VNĐ</font></td></tr>";
            });
            noidung +=
              '<tr><td className="prd-name">Tổng giá trị đơn hàng là:</td><td colspan="2"></td><td className="prd-total"><b><font color="#C40000">' +
              amount +
              "VNĐ</font></b></td></tr></table>";
            noidung +=
              '<p align="justify"><b>Quý khách đã đặt thú cưng thành công!</b><br />• Thú cưng của Quý khách sẽ được chuyển đến Địa chỉ có trong phần Thông tin Khách hàng của chúng Tôi sau thời gian 2 đến 3 ngày, tính từ thời điểm này.<br/>• Nhân viên giao hàng sẽ liên hệ với Quý khách qua Số Điện thoại trước khi giao hàng 24 tiếng.<br /><b><br />Cám ơn Quý khách đã lựa chọn thú cưng ở cửa hàng chúng tôi!</b></p>';

            var mailOptions = {
              from: "letuankiet29102k2@gmail.com",
              to: emailnguoimua,
              subject: "Đặt hàng và thanh toán đơn hàng tại Kimoon Pets thành công!",
              html: noidung
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log("Lỗi khi gửi email:", error);
                result.return_code = 0;
                result.return_message = error.message;
              } else {
                console.log("Email đã được gửi thành công: " + info.response);
                result.return_code = 1;
                result.return_message = "success";
              }
              res.json(result);
            });
          })
          .catch(error => {
            console.error('Error inserting order details or updating product quantities:', error.message);
            result.return_code = 0;
            result.return_message = error.message;
            res.json(result);
          });
      });
    }
  } catch (ex) {
    result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message;
    res.json(result);
  }
});




router.post("/oder-status/:app_trans_id", async (req, res) => {
  const app_trans_id = req.params.app_trans_id;
  let postData = {
    app_id: config.app_id,
    app_trans_id: app_trans_id, // Input your app_trans_id
  }

  let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
  postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();


  let postConfig = {
    method: 'post',
    url: "https://sb-openapi.zalopay.vn/v2/query",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(postData)
  };

  // axios(postConfig)
  //   .then(function (response) {
  //     console.log(JSON.stringify(response.data));
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  try {
    const result = await axios(postConfig);
    return res.status(200).json(result.data);
  } catch (error) {
    console.log(error.message);
  }
})
module.exports = router;