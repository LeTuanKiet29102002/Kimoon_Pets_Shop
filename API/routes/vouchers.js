const router = require("express").Router();
const con = require("../config/database.config");


// ============================== Quản lý vouchers ==============================
//LẤY VOUCHERS
router.post("/getVouchers", async (req, res) => {
    try {
        const sql = "select * from vouchers";
        con.query(sql, (err, result) => {
            if (err) throw err;
            res.status(200).json(result);
            console.log("LẤY VOUCHERS-success!");
        })
    } catch (error) {
        console.error("Lỗi không xác định:", error);
        res.status(500).json({ error: "Đã xảy ra lỗi không lấy được thông tin vouchers." });
    }
})

//LẤY SỐ LƯỢNG VOUCHERS
router.get("/getSoLuongVouchers", async (req, res) => {
    const sql = "select count(mavoucher) as soluongvouchers from vouchers";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
        console.log("LẤY số lượng VOUCHERS-success!");
    })
})

//TÌM KIẾM THÚ VOUCHERS
router.post("/findVouchers", async (req, res) => {
    try {
        const sql = "SELECT * FROM vouchers WHERE tenvoucher LIKE ?";
        const searchTerm = '%' + req.body.tenvoucher + '%';
        con.query(sql, [searchTerm], (err, result) => {
            if (err) {
                console.error("Lỗi truy vấn CSDL:", err);
                res.status(500).json({ error: "Đã xảy ra lỗi khi tìm kiếm vouchers." });
                return;
            }
            res.status(200).json(result);
            console.log("Tìm kiếm VOUCHERS có tên chứa: " + req.body.tenvoucher + " - thành công!", result);
        });
    } catch (error) {
        console.error("Lỗi không xác định:", error);
        res.status(500).json({ error: "Đã xảy ra lỗi không xác định." });
    }
});

//TÌM KIẾM VOUCHERS bằng ID
router.post("/findThuCungLacById", async (req, res) => {
    try {
        const sql = "SELECT * FROM thulac t JOIN nguoimua n ON t.manguoimua = n.manguoimua JOIN trangthaithu a ON t.trangthaithucung = a.trangthaithucung JOIN xaphuongthitran x ON t.maxa = x.maxa JOIN quanhuyen q ON q.maquanhuyen = x.maquanhuyen JOIN tinhthanhpho e ON e.mathanhpho = q.mathanhpho WHERE t.mathulac = ? GROUP BY t.mathulac";
        con.query(sql, [req.body.mathulac], (err, result) => {
            if (err) {
                console.error("Lỗi truy vấn CSDL:", err);
                res.status(500).json({ error: "Đã xảy ra lỗi khi tìm kiếm vouchers." });
                return;
            }
            res.status(200).json(result);
            console.log("Tìm kiếm THÚ CƯNG bằng ID " + req.body.mathulac + " - thành công!", result);
        });
    } catch (error) {
        console.error("Đã xảy ra lỗi lấy vouchers theo Id:", error);
        res.status(500).json({ error: "Đã xảy ra lỗi lấy vouchers theo Id." });
    }
});

// LẤY CHỨC TRẠNG THÁI VOUCHERS
router.post("/getTrangThaiThu", async (req, res) => {
    try {
        const sql = "select * from trangthaithu;";
        con.query(sql, (err, result) => {
            if (err) {
                console.log("Lỗi lấy trạng thái vouchers: ", err);
                res.status(500).json({ error: "Đã xảy ra lỗi không lấy được trạng thái vouchers." });
            } else {
                console.log("Lấy trạng thái vouchers thành công");
                res.status(200).json(result);
            }
        });
    } catch (error) {
        console.error("Lỗi không xác định:", error);
        res.status(500).json({ error: "Đã xảy ra lỗi không lấy được trạng thái vouchers." });
    }
});

//LẤY MÃ NGƯỜI MUA
router.post("/getMaNguoiMua", async (req, res) => {
    try {
        const sql = "SELECT manguoimua FROM nguoimua WHERE manguoimua IS NOT NULL AND manguoimua != 0;";
        con.query(sql, (err, result) => {
            if (err) {
                console.log("Lỗi lấy mã người mua: ", err);
                res.status(500).json({ error: "Đã xảy ra lỗi không lấy được mã người mua." });
            } else {
                console.log("Lấy mã người mua thành công");
                res.status(200).json(result);
            }
        });
    } catch (error) {
        console.error("Lỗi không xác định:", error);
        res.status(500).json({ error: "Đã xảy ra lỗi không lấy được mã người mua." });
    }
});



// LẤY THÀNH PHỐ
router.post("/getTinhThanhPho", (req, res) => {
    const sql = "select * from tinhthanhpho;";
    con.query(sql, (err, result) => {
        if (err) {
            console.log("Lỗi khi lấy Thành phố: ", err);
        } else {
            res.status(200).json(result);
            console.log("Lấy Thành phố thành công");
        }
    })
})

// LẤY QUẬN HUYỆN
router.post("/getQuanHuyen", (req, res) => {
    const sql = "select * from quanhuyen where mathanhpho = ?;";
    con.query(sql, [req.body.mathanhpho], (err, result) => {
        if (err) {
            console.log("Lỗi khi lấy quận huyện từ mã thành phố: ", err);
        } else {
            res.status(200).json(result);
            console.log("Lấy quận huyện thành công");
        }
    })
})

// LẤY XÃ PHƯỜNG THỊ TRẤN
router.post("/getXaPhuongThiTran", (req, res) => {
    const sql = "select * from xaphuongthitran where maquanhuyen = ?;";
    con.query(sql, [req.body.maquanhuyen], (err, result) => {
        if (err) {
            console.log("Lỗi khi lấy xã phường từ quận huyện: ", err);
        } else {
            res.status(200).json(result);
            console.log("Lấy xã phường thành công");
        }
    })
})
// LẤY XÃ PHƯỜNG THỊ TRẤN
router.post("/getXaPhuongThiTran", (req, res) => {
    const sql = "select * from xaphuongthitran where maquanhuyen = ?;";
    con.query(sql, [req.body.maquanhuyen], (err, result) => {
        if (err) {
            console.log("Lỗi khi lấy xã phường từ quận huyện: ", err);
        } else {
            res.status(200).json(result);
            console.log("Lấy xã phường thành công");
        }
    })
})

//Thêm vouchers
router.post("/insertThuCungLac", (req, res) => {
    try {
        // const ngaytaomoi = new Date().toISOString();
        const sql = "insert into thulac (tenthulac, trangthaithucung, dacdiem, hinhanhthulac, manguoimua, hotenlienhe, emaillienhe, sdtlienhe,maxa, diachilienhe, ngaytao) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);";
        con.query(sql, [req.body.tenthulac, req.body.trangthaithucung, req.body.dacdiem, req.body.hinhanhthulac, req.body.manguoimua, req.body.hotenlienhe, req.body.emaillienhe, req.body.sdtlienhe, req.body.maxa,req.body.diachilienhe, req.body.ngaytao], (err, result) => {
            if (err) {
                console.log("Thêm vouchers thất bại: ", err);
            } else {
                res.status(200).json(result);
                console.log("Thêm vouchers mới thành công");
            }
        })

    } catch (error) {
        console.error("Lỗi khi cập nhật vouchers:", error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi thêm vouchers." });
    }
})

// Cập nhật vouchers
router.post("/updateThuCungLac", async (req, res) => {
    try {
        const sql = "UPDATE thulac SET tenthulac = ?,trangthaithucung = ?, dacdiem = ?, hinhanhthulac = ?, hotenlienhe=?, emaillienhe=?, sdtlienhe=?,maxa=?,diachilienhe=?, ngaytao = ? WHERE mathulac = ?;";
        con.query(sql, [req.body.tenthulacmoi, req.body.trangthaithucungmoi, req.body.dacdiemmoi, req.body.hinhanhthulacmoi, req.body.hotenlienhemoi, req.body.emaillienhemoi, req.body.sdtlienhemoi, req.body.maxamoi, req.body.diachilienhemoi, req.body.ngaytaomoi, req.body.mathulac], (err, result) => {
            if (err) {
                console.error("Lỗi cập nhật vouchers:", err);
                res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật thông tin vouchers." });
                return;
            }
            res.status(200).json(result);
            console.log("Cập nhật thông tin vouchers thành công!");
        });
    } catch (error) {
        console.error("Lỗi khi cập nhật vouchers:", error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật vouchers." });
    }
});


// // Xóa vouchers
router.post("/deleteThuCungLac", async (req, res) => {
    try {
        console.log(req.body.mathulac);
        const sql1 = "delete from thulac where mathulac = ?;";
        con.query(sql1, [req.body.mathulac], (err, result1) => {
            if (err) {
                console.log("Lỗi khi Delete vouchers: ", err);
            } else {
                res.status(200).json({ message: "Xóa vouchers thành công" });
                console.log("Xóa vouchers có mã " + req.body.mathulac + " thành công");
            }
        })
    } catch (error) {
        console.error("Lỗi khi xóa vouchers:", error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi xóa vouchers." });
    }

})


module.exports = router;