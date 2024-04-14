const router = require("express").Router();
const con = require("../config/database.config");


// ============================== Quản lý thú cưng lạc ==============================
//LẤY THÚ CƯNG LẠC
router.post("/getThuCungLac", async (req, res) => {
    const sql = "select * from thulac l join nguoimua n on l.manguoimua = n.manguoimua join trangthaithu t on l.trangthaithucung = t. trangthaithucung";
    con.query(sql, (err, result) => {
        if(err) throw err;
        res.status(200).json(result);
        console.log("LẤY THÚ CƯNG LẠC-success!");
    })
})

//LẤY SỐ LƯỢNG THÚ CƯNG LẠC
router.get("/getSoLuongThuCungLac", async (req, res) => {
    const sql = "select count(mathulac) as soluongthucunglac from thulac";
    con.query(sql, (err, result) => {
        if(err) throw err;
        res.status(200).json(result);
        console.log("LẤY số lượng THÚ CƯNG LẠC-success!");
    })
})

//TÌM KIẾM THÚ CƯNG LẠC
router.post("/findThuCungLac", async (req, res) => {
    const sql = "select *, n.hotennguoimua from thulac l join nguoimua n on l.manguoimua = n.manguoimua where l.tenthulac like concat('%', ?, '%')";
    con.query(sql, [req.body.tenthulac], (err, result) => {
        if(err) throw err;
        res.status(200).json(result);
        console.log("Tìm kiếm TÊN THÚ CƯNG LẠC" +req.body.tenthulac+ " -success!", result);
    })
})

// //TÌM KIẾM THÚ CƯNG bằng ID
// router.post("/findThuCungById", async (req, res) => {
//     const sql = "select * from thucung t join danhmuc d on t.madanhmuc = d.madanhmuc join hinhanh a on t.mathucung = a.mathucung where t.mathucung = ? group by t.mathucung";
//     con.query(sql, [req.body.mathucung], (err, result) => {
//         if(err) throw err;
//         res.status(200).json(result);
//         console.log("Tìm kiếm TÊN THÚ CƯNG by ID " +req.body.mathucung+ " -success!", result);
//     })
// })

// //TÌM KIẾM THÚ CƯNG bằng tenthucung
// router.post("/findThuCungByTen", async (req, res) => {
//     const sql = "select * from thucung t join danhmuc d on t.madanhmuc = d.madanhmuc join hinhanh a on t.mathucung = a.mathucung where t.tenthucung = ? group by t.mathucung";
//     con.query(sql, [req.body.tenthucungmoi], (err, result) => {
//         if(err) throw err;
//         res.status(200).json(result);
//         console.log("Tìm kiếm TÊN THÚ CƯNG by Ten " +req.body.tenthucungmoi+ " -success!", result);
//     })
// })

// // Thêm thú cưng
// router.post("/insertThuCung", async (req, res) => {
//     const sql = "insert into thucung (madanhmuc, tenthucung, gioitinhthucung, tuoithucung, datiemchung, baohanhsuckhoe, tieude, mota, ghichu, soluong, giaban, giamgia) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
//     con.query(sql, [req.body.madanhmuc, req.body.tenthucung, req.body.gioitinhthucung, req.body.tuoithucung, req.body.datiemchung, req.body.baohanhsuckhoe, req.body.tieude, req.body.mota, req.body.ghichu, req.body.soluong, req.body.giaban, req.body.giamgia ], (err, result) => {
//         if(err) {
//             console.log("Lỗi insert thú cưng: ", err);
//         } else {
//             const sql1 = "select * from thucung where madanhmuc = ? && tenthucung = ? && tuoithucung = ? && gioitinhthucung = ? && datiemchung = ? && baohanhsuckhoe = ? && tieude = ? && mota = ? && ghichu = ? && soluong = ? && giaban = ? && giamgia = ?";
//             con.query(sql1, [req.body.madanhmuc, req.body.tenthucung, req.body.tuoithucung, req.body.gioitinhthucung, req.body.datiemchung, req.body.baohanhsuckhoe, req.body.tieude, req.body.mota, req.body.ghichu, req.body.soluong, req.body.giaban, req.body.giamgia], (err, result1) => {
//                 if(err) {
//                     console.log("Lỗi tìm kiếm thú cưng vừa thêm: ", err);
//                 } else {
//                     const mathucungvuathem = result1[0].mathucung;
//                     console.log("Mã thú cưng vừa thêm: ", result1[0].mathucung);
//                     const manghinhanh = req.body.hinhanh;
//                     manghinhanh.map((hinhanh, key) => {
//                         const sql2 = "insert into hinhanh (mathucung, hinhanh) values (?, ?);";
//                         con.query(sql2, [mathucungvuathem, hinhanh], (err, result2) => {
//                             if (err) {
//                                 console.log("Lỗi thêm hình cho thú cưng: ", err);
//                             } else {
//                                 console.log("Thêm hình ảnh cho mã thú cưng " + mathucungvuathem + " thành công");         
//                             }
//                         })
//                     })
//                     res.status(200).json({message: "Thêm thú cưng thành công"});
//                     console.log("Thêm thú cưng "+req.body.tenthucung+" thành công");  
//                 }
//             })
//         }
//     })
// })

// // Cập nhật thú cưng
// router.post("/updateThuCung", async (req, res) => {
//     try {
//         const sql = "update thucung set madanhmuc = ?, tenthucung = ?, gioitinhthucung =?, tuoithucung = ?, datiemchung = ?, baohanhsuckhoe = ?, tieude = ?, mota = ?, ghichu = ?, soluong = ?, giaban = ?, giamgia = ? where mathucung = ?;";
//         con.query(sql, [req.body.madanhmucmoi, req.body.tenthucungmoi, req.body.gioitinhthucungmoi, req.body.tuoithucungmoi, req.body.datiemchungmoi, req.body.baohanhsuckhoemoi, req.body.tieudemoi, req.body.motamoi, req.body.ghichumoi, req.body.soluongmoi, req.body.giabanmoi, req.body.giamgiamoi, req.body.mathucung ], (err, result) => {
//             if(err) {
//                 console.log("Lỗi Update thú cưng: ", err);
//             } else {
//                 const sql1 = "delete from hinhanh where mathucung = ?;";
//                 con.query(sql1, [req.body.mathucung], (err, result1) => {
//                     if(err) {
//                         console.log("Lỗi xóa tất cả hình của mã thú cưng ", req.body.mathucung);
//                     } else {
//                         const manghinhanh = req.body.hinhanhmoi;
//                         manghinhanh.map((hinhanh, key) => {
//                             const sql2 = "insert into hinhanh (mathucung, hinhanh) values (?, ?);";
//                             con.query(sql2, [req.body.mathucung, hinhanh], (err, result2) => {
//                                 if (err) {
//                                     console.log("Lỗi thêm hình cho thú cưng: ", err);
//                                 } else {
//                                     console.log("Thêm hình ảnh cho mã thú cưng " + req.body.mathucung + " thành công");         
//                                 }
//                             })
//                         })
//                         res.status(200).json({message: "Cập nhật thú cưng thành công"});
//                         console.log("Cập nhật thú cưng "+req.body.mathucung+" thành công");  
//                         // console.log("mang hinh anh: ", manghinhanh);
//                     }
//                 })
//             }
//         })
//     } catch(err) {
//         console.log("Lỗi khi cập nhật thú cưng");
//     }
// })

// // Xóa thú cưng
// router.post("/deleteThuCung", async (req, res) => {
//     console.log(req.body.mathucung);
//     const sql = "delete from hinhanh where mathucung = ?;";
//     con.query(sql, [req.body.mathucung], (err, result) => {
//         if(err) {
//             console.log("Lỗi khi xóa hình ảnh khi Delete thú cưng: ", err);
//         } else {
//             const sql1 = "delete from thucung where mathucung = ?;";
//             con.query(sql1, [req.body.mathucung], (err, result1) => {
//                 if(err) {
//                     console.log("Lỗi khi Delete thú cưng: ", err);
//                 } else {
//                     res.status(200).json({message: "Xóa thú cưng thành công"});
//                     console.log("Xóa thú cưng có mã "+req.body.mathucung+" thành công");
//                 }
//             })
//         };
//     })
// })

// // Lấy tên thú cưng
// router.post("/getTenThuCung", async (req, res) => {
//     const sql = "select DISTINCT t.tenthucung, d.tieudedanhmuc FROM thucung t join danhmuc d on t.madanhmuc = d.madanhmuc WHERE t.madanhmuc = ?;";
//     con.query(sql, [req.body.madanhmuc], (err, result) => {
//         if (err) {
//             console.log("Có lỗi khi lấy tên thú cưng: ", err);
//         } else {
//             res.status(200).json(result);
//             console.log("Lấy tên thú cưng từ madanhmuc thành công");
//         }
//     })
// })

// // Tìm kiếm thú cưng
// router.post("/getThuCungTimKiem", async (req, res) => {
//     const sql = "select * from thucung t join danhmuc d on t.madanhmuc = d.madanhmuc where t.tenthucung like concat('%', ?, '%') or d.tendanhmuc like concat('%', ?, '%')";
//     con.query(sql, [req.body.tenthucung, req.body.tenthucung], (err, result) => {
//         if(err) throw err;
//         res.status(200).json(result);
//         console.log("Tìm kiếm TÊN THÚ CƯNG -success!");
//     })
// })

module.exports = router;