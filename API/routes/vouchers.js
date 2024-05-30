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

//TÌM KIẾM VOUCHERS THEO CODE
router.post("/findVouchers", async (req, res) => {
    try {
        const sql = "SELECT * FROM vouchers WHERE codevoucher LIKE ?";
        const searchTerm = '%' + req.body.codevoucher + '%';
        con.query(sql, [searchTerm], (err, result) => {
            if (err) {
                console.error("Lỗi truy vấn CSDL:", err);
                res.status(500).json({ error: "Đã xảy ra lỗi khi tìm kiếm vouchers." });
                return;
            }
            res.status(200).json(result);
            console.log("Tìm kiếm VOUCHERS có tên chứa: " + req.body.codevoucher + " - thành công!", result);
        });
    } catch (error) {
        console.error("Lỗi không xác định:", error);
        res.status(500).json({ error: "Đã xảy ra lỗi không xác định." });
    }
});

//TÌM KIẾM VOUCHERS bằng ID
router.post("/findVouchersById", async (req, res) => {
    try {
        const sql = "SELECT * FROM vouchers WHERE mavoucher = ? GROUP BY mavoucher";
        con.query(sql, [req.body.mavoucher], (err, result) => {
            if (err) {
                console.error("Lỗi truy vấn CSDL:", err);
                res.status(500).json({ error: "Đã xảy ra lỗi khi tìm kiếm vouchers." });
                return;
            }
            res.status(200).json(result);
            console.log("Tìm kiếm VOUCHERS bằng ID " + req.body.mavoucher + " - thành công!", result);
        });
    } catch (error) {
        console.error("Đã xảy ra lỗi lấy vouchers theo Id:", error);
        res.status(500).json({ error: "Đã xảy ra lỗi lấy vouchers theo Id." });
    }
});


            //   mavoucher,
            //   codevoucher,
            //   tenvoucher,
            //   dieukienvoucher,
            //   soluongvoucher,
            //   tinhtrangvoucher,
            //   giavoucher,
            //   motavoucher,
            //   ngaytaovoucher,
            //   ngayhethanvoucher
//Thêm vouchers
// router.post("/insertVouchers", (req, res) => {
//     try {
//         // const ngaytaomoi = new Date().toISOString();
//         const sql = "insert into vouchers (codevoucher, tenvoucher, dieukienvoucher, soluongvoucher, tinhtrangvoucher, giavoucher, motavoucher, ngaytaovoucher,ngayhethanvoucher) values (?, ?, ?, ?, ?, ?, ?, ?, ?);";
//         con.query(sql, [req.body.codevoucher, req.body.tenvoucher, req.body.dieukienvoucher, req.body.soluongvoucher, req.body.tinhtrangvoucher, req.body.giavoucher, req.body.motavoucher, req.body.ngaytaovoucher, req.body.ngayhethanvoucher], (err, result) => {
//             if (err) {
//                 console.log("Thêm vouchers thất bại: ", err);
//             } else {
//                 res.status(200).json(result);
//                 console.log("Thêm vouchers mới thành công");
//             }
//         })

//     } catch (error) {
//         console.error("Lỗi khi cập nhật vouchers:", error);
//         res.status(500).json({ error: "Đã xảy ra lỗi khi thêm vouchers." });
//     }
// })


router.post("/insertVouchers", (req, res) => {
    try {
        const { codevoucher, tenvoucher, dieukienvoucher, soluongvoucher, tinhtrangvoucher, giavoucher, motavoucher, ngaytaovoucher, ngayhethanvoucher } = req.body;

        // Chuyển đổi ngày tạo và ngày hết hạn sang đối tượng Date
        const ngayTao = new Date(ngaytaovoucher);
        const ngayHetHan = new Date(ngayhethanvoucher);

        // Kiểm tra nếu ngày tạo sau ngày hết hạn
        if (ngayTao >= ngayHetHan) {
            return res.status(400).json({ error: "Ngày tạo phải trước ngày hết hạn." });
        }

        const sql = "INSERT INTO vouchers (codevoucher, tenvoucher, dieukienvoucher, soluongvoucher, tinhtrangvoucher, giavoucher, motavoucher, ngaytaovoucher, ngayhethanvoucher) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
        con.query(sql, [codevoucher, tenvoucher, dieukienvoucher, soluongvoucher, tinhtrangvoucher, giavoucher, motavoucher, ngaytaovoucher, ngayhethanvoucher], (err, result) => {
            if (err) {
                console.log("Thêm vouchers thất bại: ", err);
                return res.status(500).json({ error: "Đã xảy ra lỗi khi thêm vouchers." });
            } else {
                res.status(200).json(result);
                console.log("Thêm vouchers mới thành công");
            }
        });

    } catch (error) {
        console.error("Lỗi khi cập nhật vouchers:", error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi thêm vouchers." });
    }
});




// Cập nhật vouchers
router.post("/updateVouchers", async (req, res) => {
    try {
        const sql = "UPDATE vouchers SET codevoucher = ?,tenvoucher = ?, dieukienvoucher = ?, soluongvoucher = ?, tinhtrangvoucher=?, giavoucher=?, motavoucher=?,ngaytaovoucher=?,ngayhethanvoucher=? WHERE mavoucher = ?;";
        con.query(sql, [req.body.codevouchermoi, req.body.tenvouchermoi, req.body.dieukienvouchermoi, req.body.soluongvouchermoi, req.body.tinhtrangvouchermoi, req.body.giavouchermoi, req.body.motavouchermoi, req.body.ngaytaovouchermoi, req.body.ngayhethanvouchermoi, req.body.mavoucher], (err, result) => {
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
router.post("/deleteVouchers", async (req, res) => {
    try {
        console.log(req.body.mavoucher);
        const sql1 = "delete from vouchers where mavoucher = ?;";
        con.query(sql1, [req.body.mavoucher], (err, result1) => {
            if (err) {
                console.log("Lỗi khi Delete vouchers: ", err);
            } else {
                res.status(200).json({ message: "Xóa vouchers thành công" });
                console.log("Xóa vouchers có mã " + req.body.mavoucher + " thành công");
            }
        })
    } catch (error) {
        console.error("Lỗi khi xóa vouchers:", error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi xóa vouchers." });
    }

})


module.exports = router;