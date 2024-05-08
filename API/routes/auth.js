const router = require("express").Router();
const con = require("../config/database.config");
const CryptoJS = require("crypto-js");  //Thư viện mã hóa mật khẩu
const { verifyUserToken, verifyUserTokenAndAuthorization, verifyAdminToken } = require("./verifyToken");
var nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');


const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 3000,
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

//Login email
router.post("/LoginEmail", (req, res) => {
  const email = req.body.emailnguoimua;
  // Truy vấn SQL để kiểm tra xem email đã tồn tại trong cơ sở dữ liệu chưa
  const checkEmailQuery = "SELECT * FROM nguoimua WHERE emailnguoimua = ?";
  con.query(checkEmailQuery, [email], (err, rows) => {
    if (rows.length < 0 || rows.length === 0) {
      const sql = "INSERT INTO nguoimua ( maxa,emailnguoimua, hotennguoimua, hinhdaidien) VALUES (?, ?,  ?, ?)";
      con.query(sql, [req.body.maxa, req.body.emailnguoimua, req.body.hotennguoimua, req.body.hinhdaidien], (err, result) => {
        if (err) {
          console.log("Login email thất bại: ", err);
        } else {
          res.status(200).json(result);
          console.log("Login với Email thành công");
        }
      })
    }
  })
});

// Đăng ký
router.post("/register", (req, res) => {
  if (req.body.tennguoimuadangky == "" || req.body.emailnguoimua == "" || req.body.matkhaudangky == "") {
    res.status(500).json("Thông tin không hợp lệ");
  }
  else {
    // Kiếm tra trong CSDL
    con.query("SELECT emailnguoimua FROM nguoimua where emailnguoimua = ?", [req.body.emailnguoimuadangky], function (err, result, fields) {
      if (err) throw err;
      // Nếu chưa có email này
      if (result.length === 0) {
        console.log("Chưa có email này");
        var sql1 = "insert into nguoimua (hotennguoimua, maxa, emailnguoimua, matkhau, hinhdaidien) values (?, '00001', ?, ?, ?)";
        con.query(sql1, [req.body.tennguoimuadangky, req.body.emailnguoimuadangky, CryptoJS.AES.encrypt(req.body.matkhaudangky, process.env.PRIVATE_KEY).toString(),'https://grn-admin.mpoint.vn/uploads/avatar-mac-dinh.png'], function (err, result1) {
          if (err) throw err;
          var sql2 = "select * from nguoimua where emailnguoimua = ?";
          con.query(sql2, [req.body.emailnguoimuadangky], function (err, result2) {
            if (err) throw err;
            res.status(201).json({ ...result2[0], message: "Đăng ký thành công" });
            console.log("1 record inserted");
            //Mailer
            var noidung = "";
            noidung += '<div><p>Cảm ơn bạn đã đăng ký tại <font color="#fd5d32"><b>Kimoon Shop</b></font>. Chúng tôi rất vui mừng thông báo rằng tài khoản của bạn đã được tạo thành công!</p></div>';
            noidung += '<p><b>Tên đăng nhập:</b> ' + result2[0].hotennguoimua +
              '<br /><b>Email đăng ký:</b> ' + result2[0].emailnguoimua;
            // '<br /><b>Liên kết xác thực tài khoản:</b> <a href="' + linkXacThuc + '" style="color: #fd5d32; text-decoration: none;">Xác thực ngay</a></p>';
            noidung += '<div><p>Để bắt đầu sử dụng dịch vụ của chúng tôi, vui lòng xác thực địa chỉ email của bạn và kích hoạt tài khoản. Sau khi xác thực, bạn có thể truy cập vào các tính năng nổi bật của chúng tôi và bắt đầu trải nghiệm.</p></div>';
            noidung += '<div><p>Nếu bạn cần hỗ trợ, đừng ngần ngại liên hệ với chúng tôi tại <font color="#fd5d32"><b>letuankiet29102k2@gmail.com</b></font> hoặc gọi đến số <font color="#32e5fd"><b>0123456789</b></font>.</p></div>';
            noidung += '<div><p>Chúc bạn một ngày tuyệt vời và trải nghiệm thú vị tại <font color="#fd5d32"><b>Kimoon Shop</b></font>!</p></div>';


            const mailOptions = {
              from: process.env.EMAIL_USERNAME,
              to: result2[0].emailnguoimua,
              subject: 'Bạn đã đăng ký thành công tài khoản tại KimoonShop',
              html: noidung,
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.error("Lỗi khi gửi mail: ", error.message);
                res.status(500).json({ error: error.message });
              } else {
                console.log('Email đã được gửi: ' + info.response);
                res.status(200).json({ message: 'Email đã được gửi: ' + info.response, user: result2[0] });
              }
            });
          })
        });
      } else {
        // Nếu có email
        res.status(500).json("Email đã tồn tại");
        console.log("Đã có email " + result[0].emailnguoimua + " trong CSDL");
      }
    });
  }

});

//Đăng nhập
router.post("/login", (req, res) => {
  var sql1 = "select * from nguoimua n join xaphuongthitran x on n.maxa = x.maxa join quanhuyen q on x.maquanhuyen = q.maquanhuyen join tinhthanhpho t on q.mathanhpho = t.mathanhpho where n.emailnguoimua = ?";
  con.query(sql1, [req.body.emailnguoimua], function (err, result1) {
    if (err) throw err;
    // Nếu có email này
    if (result1.length !== 0) {
      // Giải mã mật khẩu trong CSDL để so sánh với mật khẩu được nhập
      const hashedPassword = CryptoJS.AES.decrypt(
        result1[0].matkhau,
        process.env.PRIVATE_KEY
      );
      const matkhau = hashedPassword.toString(CryptoJS.enc.Utf8);
      // So sánh mật khẩu
      if (req.body.matkhau === matkhau) {
        // Token được tạo bằng cách Băm email người mua & PRIVATE_KEY
        // const usertoken = CryptoJS.AES.encrypt(req.body.emailnguoimua, process.env.PRIVATE_KEY).toString();
        // console.log(usertoken);

        res.cookie('userToken', result1[0].manguoimua + "123", { expires: new Date(Date.now() + 900000000) });
        var sql2 = "select * from tokens where manguoimua = ?";
        con.query(sql2, [result1[0].manguoimua], function (err, result2) {
          if (err) throw err;
          // Nếu trong token chưa có manguoimua này thì thêm vào
          if (result2.length === 0) {
            var sql3 = "insert into tokens (manguoimua, token, created_at) values (?, ?, ?)";
            var today = new Date();
            con.query(sql3, [result1[0].manguoimua, result1[0].manguoimua + "123", today], function (err, result) {
              if (err) throw err;
              console.log("Thêm token thành công");
            });
          } else {
            console.log("Token đã tồn tại");
          }
        });
        res.status(201).json(result1[0]);
      } else {
        res.status(401).json("Mật khẩu không đúng!");
      }
    } else {
      res.status(401).json("Email chưa được đăng ký");
    }
  });
});

// Đăng xuất
// Xác minh người mua trước khi logout.
// Nếu người mua lấy từ token-cookie trùng với người mua gửi yêu cầu logout thì cho logout
// LOGOUT: Xóa token-cookie trong CDSDL, Xóa cookie browser;
router.post("/logout", verifyUserToken, (req, res) => {
  const manguoimua = req.body.manguoimua;
  const token = req.cookies.userToken;
  var sql = "delete from tokens where manguoimua = ? and token = ?";
  con.query(sql, [manguoimua, token], function (err, result) {
    if (err) console.log(err);
    console.log("Logout thanhcong roi nhe");
  })
  res.cookie('userToken', '', { expires: new Date(0) });

  res.json("Logout thanh cong");
  console.log("MaNguoimua: ", req.body.manguoimua);
  console.log("Token: ", req.cookies.userToken);

})

// TEST
router.get("/delete/:manguoimua", verifyUserTokenAndAuthorization, (req, res) => {
  res.status(201).json("Xac minh duoc roi ne");
  // res.json(req);
});

// ---------------------------Đăng nhập Admin------------------------------------------
// router.post("/loginadmin", (req, res) => { 
//   var sql1 = "select * from nhanvien where emailnhanvien = ?";
//   con.query(sql1, [req.body.emailnhanvien], function (err, result1) {
//     if(err) throw err;
//     // Nếu có email này
//     if(result1.length !== 0) {
//       // Giải mã mật khẩu trong CSDL để so sánh với mật khẩu được nhập
//       const hashedPassword = CryptoJS.AES.decrypt(
//         result1[0].matkhau, 
//         process.env.PRIVATE_KEY
//       );
//       const matkhau = hashedPassword.toString(CryptoJS.enc.Utf8);
//       // So sánh mật khẩu
//       if(req.body.matkhau === matkhau) {

//         // Token được tạo bằng cách Băm email người mua & PRIVATE_KEY
//         // const usertoken = CryptoJS.AES.encrypt(req.body.emailnguoimua, process.env.PRIVATE_KEY).toString();
//         // console.log(usertoken);

//         res.cookie('adminToken', result1[0].manhanvien + "345", { expires: new Date(Date.now() + 900000)});
//         var sql2 = "select * from nhanvien_tokens where manhanvien = ?";
//         con.query(sql2, [result1[0].manhanvien], function (err, result2) {
//           if (err) throw err;
//           // Nếu trong nhanvien_tokens chưa có manhanvien này thì thêm vào
//           if(result2.length === 0) {
//             var sql3 = "insert into nhanvien_tokens (manhanvien, token, created_at) values (?, ?, ?)";
//             var today = new Date();
//             con.query(sql3, [result1[0].manhanvien, result1[0].manhanvien + "345", today], function (err, result) {
//               if (err) throw err;
//               console.log("Thêm token thành công");
//             });
//           }else {
//             console.log("Token đã tồn tại");
//           }
//         });
//         res.status(201).json(result1[0].emailnhanvien + " đăng nhập thành công!");
//       }else {
//         res.status(401).json("Mật khẩu không đúng!");
//       }
//     }else {
//       res.status(401).json("Email chưa được đăng ký");
//     }
//   });
// });

// router.post("/loginadmin", (req, res) => { 
//   var sql1 = "select * from nhanvien where emailnhanvien = ?";
//   con.query(sql1, [req.body.emailnhanvien], function (err, result1) {
//     if(err) throw err;
//     // Nếu có email này
//     if(result1.length !== 0) {
//       // Giải mã mật khẩu trong CSDL để so sánh với mật khẩu được nhập
//       const hashedPassword = CryptoJS.AES.decrypt(
//         result1[0].matkhau, 
//         process.env.PRIVATE_KEY
//       );
//       const matkhau = hashedPassword.toString(CryptoJS.enc.Utf8);
//       // So sánh mật khẩu
//       if(req.body.matkhau === matkhau) {
//         // Token được tạo bằng cách Băm email người mua & PRIVATE_KEY
//         // const usertoken = CryptoJS.AES.encrypt(req.body.emailnguoimua, process.env.PRIVATE_KEY).toString();
//         // console.log(usertoken);

//         res.cookie('adminToken', result1[0].manhanvien + "123", { expires: new Date(Date.now() + 900000000)});
//         var sql2 = "select * from nhanvien_tokens where manhanvien = ?";
//         con.query(sql2, [result1[0].manhanvien], function (err, result2) {
//           if (err) throw err;
//           // Nếu trong token chưa có manguoimua này thì thêm vào
//           if(result2.length === 0) {
//             var sql3 = "insert into nhanvien_tokens (manhanvien, token, created_at) values (?, ?, ?)";
//             var today = new Date();
//             con.query(sql3, [result1[0].manhanvien, result1[0].manhanvien + "123", today], function (err, result) {
//               if (err) throw err;
//               console.log("Thêm nhân viên token thành công");
//             });
//           }else {
//             console.log("Nhân viên Token đã tồn tại");
//           }
//         });
//         res.status(201).json(result1[0]);
//       }else {
//         res.status(401).json("Mật khẩu không đúng!");
//       }
//     }else {
//       res.status(401).json("Email chưa được đăng ký");
//     }
//   });
// });



// router.post("/loginadmin", async (req, res) => {
//   try {
//     const sql1 = "SELECT * FROM nhanvien WHERE emailnhanvien = ? AND matkhau = ?";
//     const result1 = await query(sql1, [req.body.emailnhanvien, req.body.matkhau]);

//     if (result1.length !== 0) {
//       // Tài khoản hợp lệ, trả về mã token hoặc thông báo thành công
//       const token = result1[0].manhanvien + "345";
//       res.cookie('adminToken', token, { expires: new Date(Date.now() + 900000) });
//       res.status(201).json(result1[0]);
//       console.log("check result1: ", result1[0]);
//       // const adminInfo = {
//       //   email: result1[0].emailnhanvien,
//       //   role: result1[0].machucvu
//       // };
//     } else {
//       // Sai tên đăng nhập hoặc mật khẩu
//       res.status(401).json("Tên đăng nhập hoặc mật khẩu không đúng!");
//     }
//   } catch (err) {
//     console.error("Lỗi xảy ra: ", err);
//     res.status(500).json("Đã xảy ra lỗi trong quá trình xử lý yêu cầu");
//   }
// });

// async function query(sql, params) {
//   return new Promise((resolve, reject) => {
//     con.query(sql, params, (err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result);
//       }
//     });
//   });
// }


router.post("/loginadmin", (req, res) => {
  var sql1 = "select * from nhanvien where emailnhanvien = ?";
  con.query(sql1, [req.body.emailnhanvien], function (err, result1) {
    if (err) throw err;
    // Nếu có email này
    if (result1.length !== 0) {
      // Giải mã mật khẩu trong CSDL để so sánh với mật khẩu được nhập
      const hashedPassword = CryptoJS.AES.decrypt(
        result1[0].matkhau,
        process.env.PRIVATE_KEY
      );
      const matkhau = hashedPassword.toString(CryptoJS.enc.Utf8);
      // So sánh mật khẩu
      if (req.body.matkhau === matkhau) {
        // Token được tạo bằng cách Băm email người mua & PRIVATE_KEY
        // const usertoken = CryptoJS.AES.encrypt(req.body.emailnguoimua, process.env.PRIVATE_KEY).toString();
        // console.log(usertoken);

        res.cookie('adminToken', result1[0].manhanvien + "123", { expires: new Date(Date.now() + 900000000) });
        var sql2 = "select * from nhanvien_tokens where manhanvien = ?";
        con.query(sql2, [result1[0].manhanvien], function (err, result2) {
          if (err) throw err;
          // Nếu trong token chưa có manguoimua này thì thêm vào
          if (result2.length === 0) {
            var sql3 = "insert into nhanvien_tokens (manhanvien, token, created_at) values (?, ?, ?)";
            var today = new Date();
            con.query(sql3, [result1[0].manhanvien, result1[0].manhanvien + "123", today], function (err, result) {
              if (err) throw err;
              console.log("Thêm nhân viên token thành công");
            });
          } else {
            console.log("Nhân viên Token đã tồn tại");
          }
        });
        res.status(201).json(result1[0]);
      } else {
        res.status(401).json("Mật khẩu không đúng!");
      }
    } else {
      res.status(401).json("Email chưa được đăng ký");
    }
  });
});

// Đăng ký admin
router.post("/registeradmin", (req, res) => {
  console.log("Admin đăng ký");
  if (req.body.hotennhanvien == "" || req.body.emailnguoimua == "" || req.body.matkhau == "")
    res.status(500).json("Thông tin không hợp lệ");
  else {
    // Kiếm tra trong CSDL
    con.query("SELECT emailnhanvien FROM nhanvien where emailnhanvien = ?", [req.body.emailnhanvien], function (err, result, fields) {
      if (err) throw err;
      // Nếu chưa có email này
      if (result.length === 0) {
        console.log("Chưa có email nhân viên này");
        var sql1 = "insert into nhanvien (machucvu, hotennhanvien, maxa, emailnhanvien, matkhau) values ('1', ?, '00001', ?, ?)";
        con.query(sql1, [req.body.hotennhanvien, req.body.emailnhanvien, CryptoJS.AES.encrypt(req.body.matkhau, process.env.PRIVATE_KEY).toString()], function (err, result1) {
          if (err) throw err;
          var sql2 = "select * from nhanvien where emailnhanvien = ?";
          con.query(sql2, [req.body.emailnhanvien], function (err, result2) {
            if (err) throw err;
            res.status(201).json({ ...result2[0], message: "Đăng ký thành công" });
            console.log("1 record inserted");
          })
        });
      } else {
        // Nếu có email
        res.status(500).json("Email nhân viên đã tồn tại");
        console.log("Đã có email " + result[0].emailnhanvien + " trong CSDL Nhân viên");
      }
    });
  }
});





// Đăng ký admin
// router.post("/registeradmin", (req, res) => {
//   console.log("Admin đăng ký");
//   if (req.body.hotennhanvien == "" || req.body.emailnguoimua == "" || req.body.matkhau == "")
//     res.status(500).json("Thông tin không hợp lệ");
//   else {
//     // Kiếm tra trong CSDL
//     con.query("SELECT emailnhanvien FROM nhanvien where emailnhanvien = ?", [req.body.emailnhanvien], function (err, result, fields) {
//       if (err) throw err;
//       // Nếu chưa có email này
//       if (result.length === 0) {
//         console.log("Chưa có email nhân viên này");
//         var sql1 = "insert into nhanvien (machucvu, hotennhanvien, maxa, emailnhanvien, matkhau) values ('1', ?, '00001', ?, ?)";
//         con.query(sql1, [req.body.hotennhanvien, req.body.emailnhanvien, CryptoJS.AES.encrypt(req.body.matkhau, process.env.PRIVATE_KEY).toString()], function (err, result1) {
//           if (err) throw err;
//           var sql2 = "select * from nhanvien where emailnhanvien = ?";
//           con.query(sql2, [req.body.emailnhanvien], function (err, result2) {
//             if (err) throw err;
//             res.status(201).json({ ...result2[0], message: "Đăng ký thành công" });
//             console.log("1 record inserted");
//           })
//         });
//       } else {
//         // Nếu có email
//         res.status(500).json("Email nhân viên đã tồn tại");
//         console.log("Đã có email " + result[0].emailnhanvien + " trong CSDL Nhân viên");
//       }
//     });
//   }
// });

// Đăng xuất Admin
// Xác minh người mua trước khi logout.
// Nếu người mua lấy từ token-cookie trùng với người mua gửi yêu cầu logout thì cho logout
// LOGOUT: Xóa token-cookie trong CDSDL, Xóa cookie browser;
router.post("/logoutadmin", verifyAdminToken, (req, res) => {
  const manhanvien = req.body.manhanvien;
  const token = req.cookies.adminToken;
  var sql = "delete from nhanvien_tokens where manhanvien = ? and token = ?";
  con.query(sql, [manhanvien, token], function (err, result) {
    if (err) console.log(err);
    console.log("Logout thanhcong roi nhe");
  })
  res.cookie('adminToken', '', { expires: new Date(0) });

  res.json("Nhan vien logout thanh cong");
  console.log("Ma nhan vien: ", req.body.manhanvien);
  console.log("Token: ", req.cookies.adminToken);

})


// router.post("/logoutadmin", (req, res) => {
//   res.clearCookie('adminToken');
//   res.json({ message: "Đăng xuất thành công !" })
// })



// API Đặt lại mật khẩu
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   port: 3000,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USERNAME,
//     pass: process.env.EMAIL_PASSWORD
//   }
// });

router.post('/request-reset-password', (req, res) => {
  const { email } = req.body;

  con.query(
    'SELECT * FROM nguoimua WHERE emailnguoimua = ?',
    [email],
    async (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      if (results.length == 0) {
        return res.status(404).json({ message: 'Không tìm thấy người dùng' });
      }

      // const user = results[0];
      // // const token = jwt.sign(
      // //   { id: user.id, email: user.email },
      // //   process.env.JWT_SEC,
      // //   { expiresIn: '1h' }
      // // );

      // // Gửi email với liên kết đặt lại mật khẩu
      // const resetLink = `http://localhost:3000/ResetPassword`;

      const user = results[0];
      const token = jwt.sign({ id: user.manguoimua, email: user.emailnguoimua }, process.env.JWT_SEC, { expiresIn: '1h' });
      const resetLink = `http://localhost:3000/ResetPassword?token=${token}`;

      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Yêu Cầu Đặt Lại Mật Khẩu',
        html: `Vui lòng nhấp vào liên kết sau để đặt lại mật khẩu của bạn: <button style="background-color: #fd5d32; border: none; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; border-radius: 5px;"><a href="${resetLink}" style="color: white; text-decoration: none;">Đổi mật khẩu</a></button>
        `
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return res.status(500).json({ error: error.message });
        } else {
          res.status(200).json({ message: 'Email đã được gửi: ' + info.response });
        }
      });
    }
  );
});

// API Đặt lại mật khẩu
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SEC);
    console.log("check deco:", decoded);
    // Mã hóa mật khẩu mới bằng CryptoJS
    const hashedPassword = CryptoJS.AES.encrypt(newPassword, process.env.PRIVATE_KEY).toString();
    console.log("check new pass:", hashedPassword, "end email", decoded.email);

    con.query('UPDATE nguoimua SET matkhau = ? WHERE emailnguoimua = ?', [hashedPassword, decoded.email], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(200).json({ message: 'Mật khẩu đã được cập nhật thành công' });
    });
  } catch (error) {
    res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
});



module.exports = router;













