const router = require("express").Router();
const express = require('express');
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);
const con = require("../config/database.config");

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


// router.post("/payment", (req, res) => {
//     stripe.charges.create(
//         {
//             source: req.body.tokenId,
//             amount: req.body.amount,
//             currency: "usd",
//         },
//         (stripeErr, stripeRes) => {
//             if(stripeErr) {
//                 console.log("Lỗi!", req.body.tokenId, req.body.amount);
//                 res.status(500).json(stripeErr);
//             }else {
//                 res.status(200).json(stripeRes);
//             }
//         }
//     )
// })

router.post('/create-checkout-session', async (req, res) => {
    const cartMetadata = req.body.CartItems.products.map(item => {
        const {
            mathucung,
            tenthucung,
            // hinhanhdanhmuc,
            // mota,
            soluong,
            giaban,
            giamgia,
        } = item.data[0];
        return {
            id: mathucung,
            name: tenthucung,
            // image: hinhanhdanhmuc,
            // description: mota,
            quantity: item.soluongmua,
            price: giaban,
            discount: giamgia,
        };
    });

    const customer = await stripe.customers.create({
        metadata: {
            userId: req.body.userId,
            madonhang: req.body.madonhang,
            cart: JSON.stringify(cartMetadata)
        }
    })
    const exchangeRate = 23000;
    const line_items = req.body.CartItems.products.map(item => {
        // Trích xuất thông tin cần thiết của mỗi thú cưng
        const {
            mathucung,
            madanhmuc,
            tenthucung,
            gioitinhthucung,
            tuoithucung,
            datiemchung,
            baohanhsuckhoe,
            tieude,
            mota,
            ghichu,
            soluong,
            giaban,
            giamgia,
            tendanhmuc,
            tieudedanhmuc,
            hinhanhdanhmuc,
        } = item.data[0];
        const unitAmountUSD = Math.round((giamgia / exchangeRate) * 100);
        const soluongmua = item.soluongmua;
        // Trả về thông tin thú cưng được trích xuất
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: tenthucung,
                    images: [hinhanhdanhmuc],
                    // description: mota,
                    metadata: {
                        id: mathucung
                    }
                },
                unit_amount: unitAmountUSD,
            },
            quantity: soluongmua,
        };
    });


    console.log("check line", line_items);
    console.log("check customize", customer);
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_address_collection: {
            allowed_countries: ["US", "CA", "KE"],
        },
        shipping_options: [
            {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: 0,
                        currency: "usd",
                    },
                    display_name: "Free shipping",
                    // Delivers between 5-7 business days
                    delivery_estimate: {
                        minimum: {
                            unit: "business_day",
                            value: 5,
                        },
                        maximum: {
                            unit: "business_day",
                            value: 7,
                        },
                    },
                },
            },
            {
                shipping_rate_data: {
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: 1500,
                        currency: "usd",
                    },
                    display_name: "Next day air",
                    // Delivers in exactly 1 business day
                    delivery_estimate: {
                        minimum: {
                            unit: "business_day",
                            value: 1,
                        },
                        maximum: {
                            unit: "business_day",
                            value: 1,
                        },
                    },
                },
            },
        ],
        phone_number_collection: {
            enabled: true,
        },
        customer: customer.id,
        line_items,
        mode: 'payment',
        //   ui_mode: 'embedded',
        //   return_url: 'https://example.com/checkout/return?session_id={CHECKOUT_SESSION_ID}'
        success_url: `http://localhost:3000/success?paymentStatus=success`,
        cancel_url: `http://localhost:3000/datmua?paymentStatus=cancel`,
    });
    // res.send({clientSecret: session.client_secret});
    res.send({ url: session.url }).end();
});

// , paymentCompleted: true 
// , paymentCompleted: true 
//Create don hang

// const createOrder = async(customer, data)=>{
//     const Items = JSON.parse(customer.metadata.cart);
//     const newOrder = new Order({
//         manguoimua:customer.metadata.userId,
//         maxa:'00001',
//         hotendathang:data.customer.customer_details.name,
//         emaildathang:data.customer.customer_details.email,
//         sdtdathang:data.customer.customer_details.phone,
//         diachidathang:data.customer.customer_details.address.country,
//         ghichudathang:'thanh toan stripe',
//         tongtiendathang:data.amount_total,
//         trangthaidathang:3,
//         giohang:customer.metadata.cart
//     });
//     try {
//        const saveOrder = await newOrder.save()

//        console.log("Processed order:", saveOrder)
//     } catch (error) {
//         console.log(error);
//     }
// }


//Stripe webhook




// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;

// endpointSecret = "whsec_417a56c7f4d038935680181601469aabc08380b61c4bf9ebacde28751da65710";

router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let data;
    let eventType;
    if (endpointSecret) {
        let event;

        try {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
            console.log("Webhook verified");
        } catch (err) {
            console.log(`Webhook Error: ${err.message}`);
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
        data = event.data.object;
        eventType = event.type;
    } else {
        data = req.body.data.object;
        eventType = req.body.type;
    }


    // Handle the event
    if (eventType === "checkout.session.completed") {
        stripe.customers.retrieve(data.customer).then(
            (customer) => {
                console.log("customer:", customer);
                console.log("data:", data);
                // createOrder(customer, data)
            }
        ).catch(err => console.log(err.message));
    }

    if (eventType === "checkout.session.completed") {
        const session = data;
        const customerId = session.customer;//data.customer

        try {
            const customer = await stripe.customers.retrieve(customerId);
            const cartItems = JSON.parse(customer.metadata.cart);

            const address = session.shipping_details.address;
            const ngaydathang = new Date(session.created * 1000).toISOString().slice(0, 19).replace('T', ' ');

            // Tỉ giá hiện tại (được cập nhật theo nhu cầu)
            let exchangeRate = 23000; // 1 USD = 23000 VND

            // Chuyển đổi từ cents sang dollars trước, sau đó nhân với tỉ giá để chuyển đổi sang VND
            let totalAmountUSD = session.amount_total / 100; // Chuyển cents sang USD
            let totalAmountVND = Math.round(totalAmountUSD * exchangeRate); // Chuyển USD sang VND


            // Thêm đơn hàng vào cơ sở dữ liệu
            const insertOrderSql = "INSERT INTO dathang (manguoimua, maxa, manhanvien, hotendathang, emaildathang, sodienthoaidathang, diachidathang, ghichudathang, ngaydathang, trangthaidathang, tongtiendathang) VALUES (?, ?, 0, ?, ?, ?, ?, ?, ?, 3, ?);";
            con.query(insertOrderSql, [
                customer.metadata.userId,
                '00001', // Mã xã giả định
                session.customer_details.name,
                session.customer_details.email,
                session.customer_details.phone,
                `${address.line1}, ${address.city}, ${address.state}, ${address.country}, ${address.postal_code}`,
                'thanh toan stripe',
                ngaydathang,
                totalAmountVND
            ], (error, orderResults) => {
                if (error) {
                    console.error('Error inserting order:', error.message);
                    return;
                }
                const orderId = orderResults.insertId;

                // Thêm chi tiết đơn hàng
                cartItems.forEach(item => {
                    const insertItemSql = "INSERT INTO chitietdathang (mathucung, madathang, giachitietdathang, soluongchitietdathang, tongtienchitietdathang) VALUES (?, ?, ?, ?, ?);";
                    con.query(insertItemSql, [
                        item.id,
                        orderId,
                        item.discount, // Giá đã giảm
                        item.quantity,
                        item.discount * item.quantity
                    ], (error, itemResults) => {
                        if (error) {
                            console.error('Error inserting order item:', error.message);
                        } else {
                            // Sau khi thêm chi tiết đơn hàng thành công, cập nhật số lượng thú cưng
                            const updateProductQuantitySql = "UPDATE thucung SET soluong = soluong - ? WHERE mathucung = ?;";
                            con.query(updateProductQuantitySql, [item.quantity, item.id], (error, updateResult) => {
                                if (error) {
                                    console.error('Error updating product quantity:', error.message);
                                } else {
                                    console.log('Product quantity updated successfully');
                                }
                            });
                        }
                    });

                });

                // Gửi email xác nhận
                var noidung = "";
                noidung +=
                    '<div><p>Cảm ơn bạn đã tin tưởng và đặt mua thú cưng tại <font color="#fd5d32"><b>Kimoon Pets</b></font> với mã đơn: ' +
                    orderId +
                    '</p></div>';
                noidung +=
                    "<p><b>Khách hàng:</b> " +
                    session.customer_details.name +
                    "<br /><b>Email:</b> " +
                    session.customer_details.email +
                    "<br /><b>Điện thoại:</b> " +
                    session.customer_details.phone +
                    "<br /><b>Địa chỉ:</b> " +
                    `${address.line1}, ${address.city}, ${address.state}, ${address.country}, ${address.postal_code}`
                "</p>";

                // Danh sách Sản phẩm đã mua
                noidung +=
                    ' <table border="1px" cellpadding="10px" cellspacing="1px"width="100%"><tr><td align="center" bgcolor="#fd5d32" colspan="4"><fontcolor="white"><b>ĐƠN ĐẶT MUA CỦA BẠN</b></fontcolor=></td></tr><tr id="invoice-bar"><td width="45%"><b>Tên thú cưng</b></td><td width="20%"><b>Giá</b></td><td width="15%"><b>Số lượng</b></td><td width="20%"><b>Thành tiền</b></td></tr>';
                cartItems.forEach(item => {
                    noidung +=
                        '<tr><td className="prd-name">' +
                        item.name +
                        '</td><td className="prd-price"><font color="#C40000">' +
                        item.discount +
                        'VNĐ</font></td><td className="prd-number">' +
                        item.quantity +
                        '</td><td className="prd-total"><font color="#C40000">' +
                        item.discount * item.quantity
                    "VNĐ</font></td></tr>";
                });
                noidung +=
                    '<tr><td className="prd-name">Tổng giá trị đơn hàng là:</td><td colspan="2"></td><td className="prd-total"><b><font color="#C40000">' +
                    totalAmountVND +
                    "VNĐ</font></b></td></tr></table>";
                noidung +=
                    '<p align="justify"><b>Quý khách đã đặt thú cưng thành công!</b><br />• Thú cưng của Quý khách sẽ được chuyển đến Địa chỉ có trong phần Thông tin Khách hàng của chúng Tôi sau thời gian 2 đến 3 ngày, tính từ thời điểm này.<br/>• Nhân viên giao hàng sẽ liên hệ với Quý khách qua Số Điện thoại trước khi giao hàng 24 tiếng.<br /><b><br />Cám ơn Quý khách đã lựa chọn thú cưng ở cửa hàng chúng tôi!</b></p>';
                var mailOptions = {
                    from: "letuankiet29102k2@gmail.com",
                    to: session.customer_details.email,
                    subject: "Đặt hàng và thanh toán đơn hàng tại Kimoon Pets thành công!",
                    html: noidung
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log("Lỗi khi gửi email:", error);
                    } else {
                        console.log("Email đã được gửi thành công: " + info.response);
                    }
                });

                // res.json({ received: true });
            });
        } catch (err) {
            console.error('Error:', err.message);
            res.status(500).send('Internal Server Error');
        }
    }


    //THÀNH CÔNG CHECK STATUS TRONG BANG PAYMENT đỡ mở webhook cmd
    // if (eventType === "checkout.session.completed") {
    //     const session = data;
    //     const customerId = session.customer;

    //     stripe.customers.retrieve(customerId)
    //     .then(customer => {
    //         console.log("Customer:", customer);
    //         console.log("Session Data:", session);

    //         // Thực hiện các hành động liên quan đến việc xử lý đơn hàng ở đây

    //         const insertQuery = 'INSERT INTO payments (customerId, status) VALUES (?, "success")';
    //         con.query(insertQuery, [customerId], (error, results, fields) => {
    //             if (error) {
    //                 console.error('Error inserting payment into database:', error.message);
    //                 return;
    //             }
    //             console.log('Payment Status Recorded:', results.insertId);
    //         });
    //     })
    //     .catch(err => console.error('Error retrieving customer data from Stripe:', err.message));
    // }

    // if (eventType === "checkout.session.completed") {
    //     console.log("Payment has been made successfully.");
    //     // Lưu trạng thái thành công vào MySQL
    //     const customerId = data.customer.customer_details.phone;
    //     const insertQuery = 'INSERT INTO payments (customerId, status) VALUES (?, "success")';
    //     mysqlConnection.query(insertQuery, [customerId], (error, results, fields) => {
    //         if (error) {
    //             return console.error(error.message);
    //         }
    //         console.log('Payment Status Recorded:', results.insertId);
    //     });
    // }





    // Return a 200 res to acknowledge receipt of the event
    res.send().end();


});


module.exports = router;




