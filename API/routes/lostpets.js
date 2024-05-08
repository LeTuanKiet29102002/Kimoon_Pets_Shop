const router = require("express").Router();
const con = require("../config/database.config");


// ============================== Quản lý thú cưng lạc ==============================
//LẤY THÚ CƯNG LẠC
router.post("/getThuCungLac", async (req, res) => {
    try {
        const sql = "select * from thulac l join nguoimua n on l.manguoimua = n.manguoimua join trangthaithu t on l.trangthaithucung = t. trangthaithucung join xaphuongthitran x on l.maxa = x.maxa JOIN quanhuyen q ON q.maquanhuyen = x.maquanhuyen JOIN tinhthanhpho e ON e.mathanhpho = q.mathanhpho";
        con.query(sql, (err, result) => {
            if (err) throw err;
            res.status(200).json(result);
            console.log("LẤY THÚ CƯNG LẠC-success!");
        })
    } catch (error) {
        console.error("Lỗi không xác định:", error);
        res.status(500).json({ error: "Đã xảy ra lỗi không lấy được thông tin thú lạc." });
    }
})

//LẤY SỐ LƯỢNG THÚ CƯNG LẠC
router.get("/getSoLuongThuCungLac", async (req, res) => {
    const sql = "select count(mathulac) as soluongthucunglac from thulac";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.status(200).json(result);
        console.log("LẤY số lượng THÚ CƯNG LẠC-success!");
    })
})

//TÌM KIẾM THÚ CƯNG LẠC
router.post("/findThuCungLac", async (req, res) => {
    try {
        const sql = "SELECT * FROM thulac t JOIN nguoimua n ON t.manguoimua = n.manguoimua JOIN trangthaithu a ON t.trangthaithucung = a.trangthaithucung JOIN xaphuongthitran x ON t.maxa = x.maxa JOIN quanhuyen q ON q.maquanhuyen = x.maquanhuyen JOIN tinhthanhpho e ON e.mathanhpho = q.mathanhpho WHERE t.tenthulac LIKE ?";
        const searchTerm = '%' + req.body.tenthulac + '%';
        con.query(sql, [searchTerm], (err, result) => {
            if (err) {
                console.error("Lỗi truy vấn CSDL:", err);
                res.status(500).json({ error: "Đã xảy ra lỗi khi tìm kiếm thú cưng lạc." });
                return;
            }
            res.status(200).json(result);
            console.log("Tìm kiếm THÚ CƯNG LẠC có tên chứa: " + req.body.tenthulac + " - thành công!", result);
        });
    } catch (error) {
        console.error("Lỗi không xác định:", error);
        res.status(500).json({ error: "Đã xảy ra lỗi không xác định." });
    }
});

//TÌM KIẾM THÚ CƯNG LẠC bằng ID
router.post("/findThuCungLacById", async (req, res) => {
    try {
        const sql = "SELECT * FROM thulac t JOIN nguoimua n ON t.manguoimua = n.manguoimua JOIN trangthaithu a ON t.trangthaithucung = a.trangthaithucung JOIN xaphuongthitran x ON t.maxa = x.maxa JOIN quanhuyen q ON q.maquanhuyen = x.maquanhuyen JOIN tinhthanhpho e ON e.mathanhpho = q.mathanhpho WHERE t.mathulac = ? GROUP BY t.mathulac";
        con.query(sql, [req.body.mathulac], (err, result) => {
            if (err) {
                console.error("Lỗi truy vấn CSDL:", err);
                res.status(500).json({ error: "Đã xảy ra lỗi khi tìm kiếm thú cưng." });
                return;
            }
            res.status(200).json(result);
            console.log("Tìm kiếm THÚ CƯNG bằng ID " + req.body.mathulac + " - thành công!", result);
        });
    } catch (error) {
        console.error("Đã xảy ra lỗi lấy thú lạc theo Id:", error);
        res.status(500).json({ error: "Đã xảy ra lỗi lấy thú lạc theo Id." });
    }
});

// LẤY CHỨC TRẠNG THÁI THÚ CƯNG LẠC
router.post("/getTrangThaiThu", async (req, res) => {
    try {
        const sql = "select * from trangthaithu;";
        con.query(sql, (err, result) => {
            if (err) {
                console.log("Lỗi lấy trạng thái thú cưng lạc: ", err);
                res.status(500).json({ error: "Đã xảy ra lỗi không lấy được trạng thái thú lạc." });
            } else {
                console.log("Lấy trạng thái thú cưng lạc thành công");
                res.status(200).json(result);
            }
        });
    } catch (error) {
        console.error("Lỗi không xác định:", error);
        res.status(500).json({ error: "Đã xảy ra lỗi không lấy được trạng thái thú lạc." });
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

//Thêm thú cưng lạc 
router.post("/insertThuCungLac", (req, res) => {
    try {
        // const ngaytaomoi = new Date().toISOString();
        const sql = "insert into thulac (tenthulac, trangthaithucung, dacdiem, hinhanhthulac, manguoimua, hotenlienhe, emaillienhe, sdtlienhe,maxa, diachilienhe, ngaytao) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);";
        con.query(sql, [req.body.tenthulac, req.body.trangthaithucung, req.body.dacdiem, req.body.hinhanhthulac, req.body.manguoimua, req.body.hotenlienhe, req.body.emaillienhe, req.body.sdtlienhe, req.body.maxa,req.body.diachilienhe, req.body.ngaytao], (err, result) => {
            if (err) {
                console.log("Thêm thú cưng lạc thất bại: ", err);
            } else {
                res.status(200).json(result);
                console.log("Thêm thú cưng lạc mới thành công");
            }
        })

    } catch (error) {
        console.error("Lỗi khi cập nhật thú cưng:", error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi thêm thú cưng lạc." });
    }
})

// Cập nhật thú cưng lạc
router.post("/updateThuCungLac", async (req, res) => {
    try {
        const sql = "UPDATE thulac SET tenthulac = ?,trangthaithucung = ?, dacdiem = ?, hinhanhthulac = ?, hotenlienhe=?, emaillienhe=?, sdtlienhe=?,maxa=?,diachilienhe=?, ngaytao = ? WHERE mathulac = ?;";
        con.query(sql, [req.body.tenthulacmoi, req.body.trangthaithucungmoi, req.body.dacdiemmoi, req.body.hinhanhthulacmoi, req.body.hotenlienhemoi, req.body.emaillienhemoi, req.body.sdtlienhemoi, req.body.maxamoi, req.body.diachilienhemoi, req.body.ngaytaomoi, req.body.mathulac], (err, result) => {
            if (err) {
                console.error("Lỗi cập nhật thú cưng lạc:", err);
                res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật thông tin thú cưng lạc." });
                return;
            }
            res.status(200).json(result);
            console.log("Cập nhật thông tin thú cưng lạc thành công!");
        });
    } catch (error) {
        console.error("Lỗi khi cập nhật thú cưng:", error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật thú cưng lạc." });
    }
});


// // Xóa thú cưng lạc
router.post("/deleteThuCungLac", async (req, res) => {
    try {
        console.log(req.body.mathulac);
        const sql1 = "delete from thulac where mathulac = ?;";
        con.query(sql1, [req.body.mathulac], (err, result1) => {
            if (err) {
                console.log("Lỗi khi Delete thú lạc: ", err);
            } else {
                res.status(200).json({ message: "Xóa thú cưng lạc thành công" });
                console.log("Xóa thú cưng lạc có mã " + req.body.mathulac + " thành công");
            }
        })
    } catch (error) {
        console.error("Lỗi khi xóa thú cưng lạc:", error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi xóa thú cưng lạc." });
    }

})


module.exports = router;