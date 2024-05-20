const router = require("express").Router();
const con = require("../config/database.config");

//API feedback 

//LẤY FEEDBACK
router.post("/getFeedBack", async (req, res) => {
    try {
        const sql = "select * from feedback d join nguoimua m on d.manguoimua = m.manguoimua join thucung t on d.mathucung = t.mathucung ";
        con.query(sql, (err, result) => {
            if(err) throw err;
            res.status(200).json(result);
            console.log("LẤY Feedback-success!");
        })
        
    } catch (error) {
        console.error(error);
    }
})

//LẤY FEEDBACK THEO MATHUCUNG
router.post("/getFeedbackByMaThuCung", async (req, res) => {
    try {
        const mathucung = req.body.mathucung; // Lấy mã thú cưng từ yêu cầu HTTP POST
        
        const sql = "SELECT d.*, m.*, t.* FROM feedback d JOIN nguoimua m ON d.manguoimua = m.manguoimua JOIN thucung t ON d.mathucung = t.mathucung WHERE d.mathucung = ?";
        con.query(sql, [mathucung], (err, result) => {
            if (err) throw err;
            res.status(200).json(result);
            console.log("LẤY Feedback theo mathucung - Success!");
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Đã xảy ra lỗi khi lấy thông tin phản hồi theo mã thú cưng." });
    }
});

//LẤY FEEDBACK THEO FEEDBACK_ID
router.post("/getFeedbackById", async (req, res) => {
    try {
        // const mathucung = req.body.feedback_id; // Lấy mã thú cưng từ yêu cầu HTTP POST
        
        const sql = "SELECT d.*, m.*, t.* FROM feedback d JOIN nguoimua m ON d.manguoimua = m.manguoimua JOIN thucung t ON d.mathucung = t.mathucung WHERE d.feedback_id = ?";
        con.query(sql, [req.body.feedback_id], (err, result) => {
            if (err) throw err;
            res.status(200).json(result);
            console.log("LẤY Feedback theo feedback_id- Success!");
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Đã xảy ra lỗi khi lấy thông tin phản hồi theo mã thú cưng." });
    }
});

//LẤY SỐ LƯỢNG FEEDBACK CỦA MỘT THÚ CƯNG
// router.post("/getSoLuongFeedBack", async (req, res) => {
//     try {
//         const mathucung = req.body.mathucung; // Lấy mã thú cưng từ yêu cầu HTTP POST
//         const sql = "SELECT j.mathucung, tenthucung, COUNT(feedback_id) AS soluongfeedback, ROUND(AVG(rating), 1) AS diemtb FROM feedback j JOIN thucung t ON j.mathucung = t.mathucung WHERE j.mathucung = ? GROUP BY j.mathucung";
//         con.query(sql,[mathucung], (err, result) => {
//             if (err) throw err;
//             res.status(200).json(result);
//             console.log("LẤY số lượng feedback-success!");
//         })
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ message: "Đã xảy ra lỗi khi lấy số lượng phản hồi theo mã thú cưng." });
//     }

// })


// router.post("/getSoLuongFeedBack", async (req, res) => {
//     try {
//         const mathucung = req.body.mathucung; // Lấy mã thú cưng từ yêu cầu HTTP POST

//         // Query để lấy thông tin về số lượng feedback và điểm trung bình
//         const sql = "SELECT j.mathucung, tenthucung, COUNT(feedback_id) AS soluongfeedback, ROUND(AVG(rating), 1) AS diemtb FROM feedback j JOIN thucung t ON j.mathucung = t.mathucung WHERE j.mathucung = ? GROUP BY j.mathucung";
        
//         con.query(sql, [mathucung], (err, result) => {
//             if (err) {
//                 throw err;
//             } else {
//                 // Nếu có kết quả trả về từ cơ sở dữ liệu
//                 if (result.length > 0) {
//                     const feedbackData = result[0];
//                     const soluongfeedback = feedbackData.soluongfeedback; // Số lượng feedback
//                     const diemtb = feedbackData.diemtb; // Điểm trung bình
//                     const totalRate = 100; // Tổng rate là 100%
                    
//                     // Query để lấy thông tin chi tiết về số lượng mỗi loại đánh giá
//                     const sqlDetail = "SELECT rating, COUNT(feedback_id) AS soluong FROM feedback WHERE mathucung = ? GROUP BY rating";
                    
//                     con.query(sqlDetail, [mathucung], (err, detailResult) => {
//                         if (err) {
//                             throw err;
//                         } else {
//                             let rateDetails = {}; // Đối tượng để lưu thông tin chi tiết về số lượng mỗi loại đánh giá
                            
//                             // Tính toán số lượng và phần trăm của mỗi loại đánh giá
//                             detailResult.forEach(detail => {
//                                 const rating = detail.rating; // Điểm đánh giá
//                                 const soluong = detail.soluong; // Số lượng đánh giá

//                                 // Tính phần trăm của loại đánh giá hiện tại
//                                 const percent = (soluong / soluongfeedback) * 100;

//                                 // Lưu thông tin vào đối tượng rateDetails
//                                 rateDetails[rating] = {
//                                     soluong: soluong,
//                                     percent: percent.toFixed(2) // Làm tròn đến 2 chữ số thập phân
//                                 };
//                             });

//                             // Gửi phản hồi về số liệu chi tiết về số lượng đánh giá
//                             res.status(200).json({
//                                 ...feedbackData,
//                                 totalRate: totalRate,
//                                 rateDetails: rateDetails
//                             });
//                         }
//                     });
//                 } else {
//                     // Nếu không có kết quả trả về từ cơ sở dữ liệu
//                     res.status(404).json({ error: "Không tìm thấy thông tin đánh giá cho thú cưng này." });
//                 }
//             }
//         });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ message: "Đã xảy ra lỗi khi lấy số lượng phản hồi theo mã thú cưng." });
//     }
// });

router.post("/getSoLuongFeedBack", async (req, res) => {
    try {
        const mathucung = req.body.mathucung; // Lấy mã thú cưng từ yêu cầu HTTP POST

        // Query để lấy thông tin về số lượng feedback và điểm trung bình
        const sql = "SELECT j.mathucung, tenthucung, COUNT(feedback_id) AS soluongfeedback, ROUND(AVG(rating), 1) AS diemtb FROM feedback j JOIN thucung t ON j.mathucung = t.mathucung WHERE j.mathucung = ? GROUP BY j.mathucung";
        
        con.query(sql, [mathucung], (err, result) => {
            if (err) {
                throw err;
            } else {
                // Nếu có kết quả trả về từ cơ sở dữ liệu
                if (result.length > 0) {
                    const feedbackData = result[0];
                    const soluongfeedback = feedbackData.soluongfeedback; // Số lượng feedback
                    const diemtb = feedbackData.diemtb; // Điểm trung bình
                    const totalRate = 100; // Tổng rate là 100%
                    
                    // Query để lấy thông tin chi tiết về số lượng mỗi loại đánh giá
                    const sqlDetail = "SELECT rating, COUNT(feedback_id) AS soluong FROM feedback WHERE mathucung = ? GROUP BY rating";
                    
                    con.query(sqlDetail, [mathucung], (err, detailResult) => {
                        if (err) {
                            throw err;
                        } else {
                            let rateDetails = {}; // Đối tượng để lưu thông tin chi tiết về số lượng mỗi loại đánh giá
                            
                            // Tính toán số lượng và phần trăm của mỗi loại đánh giá
                            [1, 2, 3, 4, 5].forEach(rating => {
                                const detail = detailResult.find(detail => detail.rating === rating);
                                const soluong = detail ? detail.soluong : 0; // Số lượng đánh giá
                                
                                // Tính phần trăm của loại đánh giá hiện tại
                                const percent = soluong ? (soluong / soluongfeedback) * 100 : 0;

                                // Lưu thông tin vào đối tượng rateDetails
                                rateDetails[rating] = {
                                    soluong: soluong,
                                    percent: percent.toFixed(2) // Làm tròn đến 2 chữ số thập phân
                                };
                            });

                            // Gửi phản hồi về số liệu chi tiết về số lượng đánh giá
                            res.status(200).json({
                                ...feedbackData,
                                totalRate: totalRate,
                                rateDetails: rateDetails
                            });
                        }
                    });
                } else {
                    // Nếu không có kết quả trả về từ cơ sở dữ liệu
                    res.status(404).json({ error: "Không tìm thấy thông tin đánh giá cho thú cưng này." });
                }
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Đã xảy ra lỗi khi lấy số lượng phản hồi theo mã thú cưng." });
    }
});


//SỬA FEEDBACK
router.post("/updateFeedBack", async (req, res) => {
    try {
        const ngaysuamoi = new Date().toISOString();
        const sql = "UPDATE feedback SET rating = ?, comments = ?, updated_at = ? WHERE feedback_id = ?;";
        con.query(sql, [req.body.ratingmoi, req.body.commentsmoi, ngaysuamoi, req.body.feedback_id], (err, result) => {
            if (err) {
                console.error("Lỗi cập nhật feedback:", err);
                res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật thông tin feedback." });
                return;
            }
            res.status(200).json(result);
            console.log("Cập nhật thông tin feedback thành công!");
        });
    } catch (error) {
        console.error("Lỗi khi cập nhật thú cưng:", error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi cập nhật feedback." });
    }
});

//XÓA FEEDBACK
router.post("/deleteFeedBack", async (req, res) => {
    try {
        console.log(req.body);
        const { mathucung, manguoimua, feedback_id } = req.body;

        const sql1 = "DELETE FROM feedback WHERE feedback_id = ? AND mathucung = ? AND manguoimua = ? AND manguoimua != 0;";
        con.query(sql1, [feedback_id, mathucung, manguoimua], (err, result1) => {
            if (err) {
                console.log("Lỗi khi Delete feedback: ", err);
                res.status(500).json({ error: "Đã xảy ra lỗi khi xóa feedback." });
            } else {
                if (result1.affectedRows > 0) {
                    res.status(200).json({ message: "Xóa feedback thành công" });
                    console.log("Xóa feedback có mã thành công");
                } else {
                    res.status(404).json({ error: "Không tìm thấy phản hồi để xóa" });
                }
            }
        });
    } catch (error) {
        console.error("Lỗi khi xóa feedback:", error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi xóa feedback." });
    }
});



//THÊM FEEDBACK
router.post("/insertFeedBack", (req, res) => {
    try {
        const ngaytaomoi = new Date().toISOString();
        const ngaysuamoi = new Date().toISOString();
        const sql = "insert into feedback (manguoimua, rating, comments,updated_at, mathucung, created_at ) values (?, ?, ?, ?, ?, ?);";
        con.query(sql, [req.body.manguoimua, req.body.rating, req.body.comments, ngaysuamoi, req.body.mathucung, ngaytaomoi ], (err, result) => {
            if (err) {
                console.log("Thêm feedback thất bại: ", err);
            } else {
                res.status(200).json(result);
                console.log("Thêm feedback mới thành công");
            }
        })

    } catch (error) {
        console.error("Lỗi khi cập nhật feedback:", error);
        res.status(500).json({ error: "Đã xảy ra lỗi khi thêm feedback." });
    }
})

//REPLY FEEDBACK


module.exports = router;
