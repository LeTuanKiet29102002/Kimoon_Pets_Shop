import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import Stack from '@mui/material/Stack';
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CloseIcon from "@mui/icons-material/Close";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import KeyboardReturnOutlinedIcon from "@mui/icons-material/KeyboardReturnOutlined";
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
// import Left from "../assets/svg/icons8-pets-100.png";
// import Right from "../assets/svg/icons8-person-100.png";
import Tren from "../assets/svg/quotation-marktren.png";
import Duoi from "../assets/svg/quotation-markduoi.png";

const Container = styled.div`
  background-color: #f8f9fa;
  padding: 30px 80px;
`;

const H4 = styled.h4`
  /* text-align: center; */
  font-weight: bold;
  margin-bottom: 40px;
  color: var(--color-primary);
`;
const Content = styled.div`
  display: flex;
`;

const ContentLeft = styled.div`
  display: flex;
  flex: 1;
`;

const ContentRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const P = styled.p`
  font-size: 16px;
  color: #6c757d;
  text-align: center;
  margin-bottom: 20px;
`;

const P2 = styled.p`
  font-size: 50px;
  color: #6c757d;
  font-weight: bold;
  margin-bottom: 0 !important;
  // text-align: center;
  /* margin-bottom: none; */
`;

const P3 = styled.p`
  font-size: 30px;
  color: #6c757d;
  margin-bottom: 0 !important;
  text-align: center;
  top: 22px;
  position: relative;
  font-weight: bold;
`;

const P4 = styled.p`
  font-size: 16px;
  color: #6c757d;
  text-align: center;
  margin-bottom: 0 !important;
  min-width: 64px;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NumberStar = styled.div`
  display: flex;
  text-align: center;
`;

const Right = styled.div``;

const BarPercent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 50px;
  text-align: center;
`;
const Bar = styled.div`
  width: 300px;
  height: 6px;
  border-radius: 3px;
  background-color: #cccc;
  margin: 10px 10px 0 10px;
`;

const BarCon = styled.div`
  /* width: 100px; */
  width: ${props => props.percent}%;
  height: 6px;
  border-radius: 3px;
  background-color: var(--color-primary);
  position: relative;
`;

const ButtonContainer = styled.div`
  position: relative;
  /* float:center; */
  margin: 0 22px 22px 0;
  /* display: flex; */
  z-index: 1;
  height: 60px;
  width: 200px;
  &::after {
    content: "";
    border: 2px solid black;
    position: absolute;
    top: 5px;
    left: 5px;
    /* right: 5px; */
    background-color: transparent;
    width: 81%;
    height: 102%;
    z-index: -1;
    border-radius: 5px;
  }
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  border-radius: 5px;
  &:hover {
    background-color: #fe6430;
  }
  &:active {
    background-color: #f8f4f4;
    transform: translate(5px, 5px);
    transition: transform 0.25s;
  }
`;

const growAnimation = keyframes`
    from {
        transform: scale(0.1);
    }
    to {
        transform: scale(1);
    }
`;

const ModalContent = styled.div`
  height: 60%;
  width: 60%;
  background-color: white;
  /* justify-content: center */
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  border-radius: 5px;
  z-index: 2;
  animation: ${growAnimation} linear 0.5s;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ModalFormItem = styled.div`
  margin: 2px 30px;
  display: flex;
  flex-direction: column;
`;

const FormSpan = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-dark-light);
  margin-bottom: 3px;
`;
const FormInput = styled.input`
  background-color: var(--color-white);
  color: var(--color-dark);
  width: auto;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  &:focus {
    border: 1px solid var(--color-success);
    box-shadow: var(--color-success) 0px 1px 4px,
      var(--color-success) 0px 0px 0px 3px;
  }
`;

const FormTextArea = styled.textarea`
  background-color: var(--color-white);
  color: var(--color-dark);
  width: auto;
  padding: 12px 20px;
  margin: 8px 0 20px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  &:focus {
    border: 1px solid var(--color-success);
    outline: none; /* Xóa viền mặc định */
    box-shadow: var(--color-success) 0px 1px 4px,
      var(--color-success) 0px 0px 0px 3px;
  }
`;

const Comments = styled.div``;

const CommentHead = styled.div`
  display: flex;
  margin-bottom: 20px;
`;
const Avatar = styled.img`
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background-image: cover;
`;

const Name = styled.div`
  display: flex;
  font-weight: bold;
  margin-right: 50px;
  margin-left: 10px;
  align-items: center;
`;
const Time = styled.div`
  display: flex;
  align-items: center;
`;
const StartNumber = styled.div`
  display: flex;
`;
const ContentComment = styled.div`
  /* display: flex; */
  margin-left: 50px;
  width: 80%;
  height: auto;
  background-color:#fef0f0;
  flex-wrap: wrap;
  word-wrap: break-word; 
  padding:8px;
  border-radius: 5px;
`;

const Action = styled.div`
  width: 10%;
  display: flex;
  /* float:right; */
  margin-top: 20px;
  margin-right: 50px;
  justify-content: space-between;
  margin-left: auto;
`;

const RatingStar = () => {
    const [Rate, setRate] = useState([]);
    const [numberRate, setNumberRate] = useState([]);
    const [rateFeedBack, setRateFeedBack] = useState([]);
    const [intervalId, setIntervalId] = useState(null);
    const user = useSelector(state => state.user.currentUser);

    // ===== TOAST =====
    const [dataToast, setDataToast] = useState({ message: "alo00000 alo", type: "success" });
    const toastRef = useRef(null);  // useRef có thể gọi các hàm bên trong của Toast
    // bằng các dom event, javascript, ...


    const showToastFromOut = (dataShow) => {
        console.log("showToastFromOut da chay", dataShow);
        setDataToast(dataShow);
        toastRef.current.show();
    }
    // const navigate = useNavigate();
    const location = useLocation();
    const mathucung = location.pathname.split("/")[2];

    const labels = {
        // 0:"Click vào để review!",
        // 0.5: "Useless",
        1: "Useless",
        // 1.5: "Poor",
        2: "Poor",
        // 2.5: "Ok",
        3: "Ok",
        // 3.5: "Good",
        4: "Good",
        // 4.5: "Excellent",
        5: "Excellent",
    };
    function getLabelText(value) {
        return `${value} Star${value !== 1 ? "s" : " "}, ${labels[value]}`;
    }
    const [value, setValue] = useState(0);
    const [hover, setHover] = useState(-1);

    const getRateFeedBack = async () => {
        try {
            const res = await axios.post(
                "http://localhost:3001/api/feedback/getFeedback", {}
            );
            setRateFeedBack(res.data);
            // Clear interval nếu intervalId tồn tại
            if (intervalId) {
                clearInterval(intervalId);
                setIntervalId(null); // Đặt lại intervalId
            }
        } catch (err) {
            console.log("Error occurred:", err);
        }
    };

    useEffect(() => {
        getRateFeedBack();
    }, []);

    useEffect(() => {
        const getRate = async () => {
            try {
                const res = await axios.post(
                    "http://localhost:3001/api/feedback/getFeedbackByMaThuCung", { mathucung: mathucung }
                );
                setRate(res.data);
                if (intervalId) {
                    clearInterval(intervalId);
                    setIntervalId(null); // Đặt lại intervalId
                }
            } catch (err) {
                console.log("Error occurred:", err);
            }
        };

        getRate();
    }, [rateFeedBack]); // Đặt dependency là mathucung để useEffect chạy lại khi mathucung thay đổi

    useEffect(() => {
    }, [rateFeedBack]);

    useEffect(() => {
        const getNumberRate = async () => {
            try {
                const res = await axios.post(
                    "http://localhost:3001/api/feedback/getSoLuongFeedBack", { mathucung: mathucung }
                );
                setNumberRate(res.data);
                if (intervalId) {
                    clearInterval(intervalId);
                    setIntervalId(null); // Đặt lại intervalId
                }
            } catch (err) {
                console.log("Error occurred:", err);
            }
        };

        getNumberRate();
    }, [rateFeedBack]);

    console.log("check All Rating", rateFeedBack);

    console.log('check rate', Rate);
    // console.log('check numberrate', numberRate.diemtb);
    console.log("check Rating", numberRate);
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);

    const handleVietDanhGia = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };


    const closeModalEdit = () => {
        // setFeedbackIdModalOld(feedbackIdModalOld);
        setMaNguoiMuaModalOld(maNguoiMuaModalOld);
        setRatingModalOld(ratingModalOld);
        setCommentsModalOld(commentsModalOld);
        setMaThuCungModalOld(maThuCungModalOld);
        setShowModalEdit(false);
    };

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    const handleBackdropClickEdit = (event) => {
        if (event.target === event.currentTarget) {
            closeModalEdit();
        }
    };

    const handleContentClick = (event) => {
        event.stopPropagation(); // Ngăn chặn sự kiện click từ việc lan ra ngoài
    };
    const handleContentClickEdit = (event) => {
        event.stopPropagation(); // Ngăn chặn sự kiện click từ việc lan ra ngoài
    };
    //Add FeedBack
    const [ratingMoi, setRatingMoi] = useState(0);
    const [commentsMoi, setCommentsMoi] = useState("");

    const handleSubmitComment = async ({
        manguoimuamoi,
        ratingmoi,
        commentsmoi,
        mathucungmoi
    }) => {
        console.log("FeedBack được thêm mới: ", {
            manguoimuamoi,
            ratingmoi,
            commentsmoi,
            mathucungmoi
        });
        if (
            manguoimuamoi !== "" &&
            ratingmoi !== "" &&
            commentsmoi !== "" &&
            mathucungmoi !== ""
        ) {
            try {
                const insertfeedbackres = axios.post(
                    "http://localhost:3001/api/feedback/insertFeedBack",
                    {
                        manguoimua: manguoimuamoi,
                        rating: ratingmoi,
                        comments: commentsmoi,
                        mathucung: mathucungmoi
                    }
                );
                console.log("KQ trả về update: ", insertfeedbackres);
                
                // setShowModal((prev) => !prev);
                const dataShow = {
                    message:
                        "Thêm feed back thành công!",
                    type: "success",
                };
                showToastFromOut(dataShow);
                getRateFeedBack();
                setShowModal(false);
            } catch (err) {
                console.log("Lỗi insert: ", err);
                // setShowModal((prev) => !prev);
                const dataShow = {
                    message: "Đã có lỗi khi thêm feedback ",
                    type: "danger",
                };
                showToastFromOut(dataShow); //Hiện toast thông báo
            }

        } else {
            const dataShow = {
                message: "Bạn chưa nhập thông tin cho feedback",
                type: "danger",
            };
            showToastFromOut(dataShow); //Hiện toast thông báo
        }
    };

    const handleRelay = () => {

    };


    //Edit FeedBack
    const handleEdit = async ({ feedback_id }) => {
        try {
            const editres = await axios.post(
                "http://localhost:3001/api/feedback/getFeedbackById",
                { feedback_id: feedback_id }
            );
            console.log("check feedback edit:", editres);

            setFeedBackModal(editres.data);
            setFeedbackIdModal(editres.data[0].feedback_id);
            setMaNguoiMuaModal(editres.data[0].manguoimua);
            setRatingModal(editres.data[0].rating);
            setCommentsModal(editres.data[0].comments);
            setMaThuCungModal(editres.data[0].mathucung);
            setShowModalEdit(true);

            setFeedBackModalOld(editres.data);
            setFeedbackIdModalOld(editres.data[0].feedback_id);
            setMaNguoiMuaModalOld(editres.data[0].manguoimua);
            setRatingModalOld(editres.data[0].rating);
            setCommentsModalOld(editres.data[0].comments);
            setMaThuCungModalOld(editres.data[0].mathucung);
        } catch (err) {
            console.log("Lỗi lấy thông tin feedback: ", err);
        }
    };

    const handleEditComment = async ({
        feedback_id,
        manguoimuamoi,
        ratingmoi,
        commentsmoi,
        mathucungmoi,
    }) => {
        console.log("Đầu vào Cập nhật feedback:", {
            feedback_id,
            manguoimuamoi,
            ratingmoi,
            commentsmoi,
            mathucungmoi,
        });

        if (ratingmoi !== "" && commentsmoi !== "") {
            try {
                if (manguoimuamoi === user.manguoimua) {
                    const resupdate = await axios.post("http://localhost:3001/api/feedback/updateFeedBack", {
                        feedback_id,
                        ratingmoi,
                        commentsmoi,
                        mathucungmoi,
                    });
                    console.log("KQ trả về update: ", resupdate);
                    getRateFeedBack()
                    setShowModalEdit(false);
                    const dataShow = {
                        message: "Thay đổi feedback có mã " + feedback_id + " thành công!",
                        type: "success",
                    };
                    showToastFromOut(dataShow);
                } else {
                    const dataShow = {
                        message: "Bạn không phải chủ tài khoản comment trên!!!",
                        type: "danger",
                    };
                    showToastFromOut(dataShow);
                }
            } catch (error) {
                const dataShow = {
                    message: "Thất bại! Không thể cập nhật feedback",
                    type: "danger",
                };
                showToastFromOut(dataShow);
            }
        } else {
            const dataShow = {
                message: "Bạn chưa nhập đủ thông tin cho thú cưng lạc",
                type: "danger",
            };
            showToastFromOut(dataShow);
        }
    };

    // Trạng thái mới
    const [feedBackModal, setFeedBackModal] = useState();
    const [feedbackIdModal, setFeedbackIdModal] = useState();
    const [maNguoiMuaModal, setMaNguoiMuaModal] = useState();
    const [ratingModal, setRatingModal] = useState();
    const [commentsModal, setCommentsModal] = useState();
    const [maThuCungModal, setMaThuCungModal] = useState();

    // Trạng thái cũ
    const [feedBackModalOld, setFeedBackModalOld] = useState();
    const [feedbackIdModalOld, setFeedbackIdModalOld] = useState();
    const [maNguoiMuaModalOld, setMaNguoiMuaModalOld] = useState();
    const [ratingModalOld, setRatingModalOld] = useState();
    const [commentsModalOld, setCommentsModalOld] = useState();
    const [maThuCungModalOld, setMaThuCungModalOld] = useState();


    // useEffect(() => {
    //     const getFeedBack = async () => {
    //         try {
    //             const editfeedbackres = await axios.post(
    //                 "http://localhost:3001/api/feedback/getFeedbackById",
    //                 { feedback_id: 13}
    //             );
    //             console.log("check feedback:", editfeedbackres);
    //             setFeedBackModal(editfeedbackres.data);
    //             setFeedbackIdModal(editfeedbackres.data[0].feedback_id);
    //             setMaNguoiMuaModal(editfeedbackres.data[0].manguoimua);
    //             setRatingModal(editfeedbackres.data[0].rating);
    //             setCommentsModal(editfeedbackres.data[0].comments);
    //             setMaThuCungModal(editfeedbackres.data[0].mathucung);

    //             setFeedBackModalOld(editfeedbackres.data);
    //             setFeedbackIdModalOld(editfeedbackres.data[0].feedback_id);
    //             setMaNguoiMuaModalOld(editfeedbackres.data[0].manguoimua);
    //             setRatingModalOld(editfeedbackres.data[0].rating);
    //             setCommentsModalOld(editfeedbackres.data[0].comments);
    //             setMaThuCungModalOld(editfeedbackres.data[0].mathucung);


    //         } catch (err) {
    //             console.log("Lỗi lấy thú cưng lạc: ", err);
    //         }
    //     };
    //     getFeedBack();
    // }, [rateFeedBack]);
    // console.log("Feed Back modal: ", feedBackModal);

    //Delete FeedBack
    const handleDelete = async ({ feedback_id, mathucung, manguoimua }) => {
        try {
            if (mathucung !== '' && manguoimua !== '') {
                // Lặp qua mảng Rate để kiểm tra xem manguoimua của người dùng hiện tại khớp với manguoimua của bất kỳ phản hồi nào không
                console.log('check is user rate:', Rate);
                console.log('check is user login:', manguoimua);
                const isUserRate = Rate.some(item => item.manguoimua === manguoimua);
                console.log('check is user:', isUserRate);
                if (isUserRate) {
                    const resDelete = await axios.post("http://localhost:3001/api/feedback/deleteFeedBack", { feedback_id, mathucung, manguoimua });
                    getRateFeedBack();
                    const dataShow = {
                        message: "Bạn đã xóa comment thành công",
                        type: "success",
                    };
                    showToastFromOut(dataShow); //Hiện toast thông báo
                    if (resDelete.data && resDelete.data.length > 0) {

                        setRate(resDelete.data);
                        const dataShow = {
                            message: "Bạn đã xóa comment thành công",
                            type: "success",
                        };
                        getRateFeedBack();
                        // setReRenderData((prev) => !prev);
                        showToastFromOut(dataShow); //Hiện toast thông báo
                    } else {
                        // Nếu không có dữ liệu trả về hoặc dữ liệu trả về rỗng, giữ nguyên danh sách bình luận hiện tại
                        console.log("Không có dữ liệu trả về từ server sau khi xóa bình luận.");
                        const dataShow = {
                            message: "Bạn đã xóa comment thành công",
                            type: "success",
                        };
                        // setReRenderData((prev) => !prev);
                        showToastFromOut(dataShow); //Hiện toast thông báo
                    }
                } else {
                    // Thông báo cho người dùng rằng họ không có quyền xóa phản hồi này
                    console.log('Bạn không có quyền xóa phản hồi này!');
                    const dataShow = {
                        message: "Comment này không phải comment của bạn!",
                        type: "danger",
                    };
                    showToastFromOut(dataShow); //Hiện toast thông báo
                }
            } else {
                // Thông báo cho người dùng rằng họ phải đăng nhập
                alert('Bạn phải đăng nhập');
            }
        } catch (error) {
            // Xử lý lỗi một cách cẩn thận hơn, có thể thông báo cho người dùng hoặc thực hiện các hành động phù hợp
            console.error('Lỗi khi xóa phản hồi:', error);
            const dataShow = {
                message: "Comment này không phải comment của bạn!",
                type: "danger",
            };
            showToastFromOut(dataShow); //Hiện toast thông báo
        }
    };


    return (
        <Container >
            <H4>Đánh giá thú cưng {numberRate ? numberRate.tenthucung : ''}</H4>
            {
                user ?
                    <>
                        {/* Khi đã login */}
                        <Content>
                            <ContentLeft>
                                <Left>
                                    <NumberStar>
                                        <P2>{numberRate && numberRate.diemtb ? numberRate.diemtb : '0'}</P2>
                                        <P3>/5</P3>
                                    </NumberStar>
                                    {/* <Rating name="no-value" value={}/> */}
                                    <Rating name="size-medium" defaultValue={numberRate && numberRate.diemtb ? numberRate.diemtb : '4'} />
                                    <Typography
                                        component="legend"
                                        style={{ textAlign: "center", marginTop: "10px" }}
                                    >
                                        ({numberRate && numberRate.soluongfeedback ? numberRate.soluongfeedback : ''} Đánh giá & nhận xét)
                                    </Typography>
                                </Left>
                                <Right>
                                    {
                                        numberRate && numberRate.diemtb
                                            ?
                                            <>
                                                <BarPercent>
                                                    <P4>5 sao</P4>
                                                    <Bar>
                                                        <BarCon percent={numberRate.rateDetails["5"].percent}></BarCon>
                                                    </Bar>
                                                    <P4>{numberRate.rateDetails["5"].percent}%</P4>
                                                </BarPercent>
                                                <BarPercent>
                                                    <P4>4 sao</P4>
                                                    <Bar>
                                                        <BarCon percent={numberRate.rateDetails["4"].percent}></BarCon>
                                                    </Bar>
                                                    <P4>{numberRate.rateDetails["4"].percent}%</P4>
                                                </BarPercent>
                                                <BarPercent>
                                                    <P4>3 sao</P4>
                                                    <Bar>
                                                        <BarCon percent={numberRate.rateDetails["3"].percent}></BarCon>
                                                    </Bar>
                                                    <P4>{numberRate.rateDetails["3"].percent}%</P4>
                                                </BarPercent>
                                                <BarPercent>
                                                    <P4>2 sao</P4>
                                                    <Bar>
                                                        <BarCon percent={numberRate.rateDetails["2"].percent}></BarCon>
                                                    </Bar>
                                                    <P4>{numberRate.rateDetails["2"].percent}%</P4>
                                                </BarPercent>
                                                <BarPercent>
                                                    <P4>1 sao</P4>
                                                    <Bar>
                                                        <BarCon percent={numberRate.rateDetails["1"].percent}></BarCon>
                                                    </Bar>
                                                    <P4>{numberRate.rateDetails["1"].percent}%</P4>
                                                </BarPercent>
                                            </>
                                            :
                                            <>
                                                <BarPercent>
                                                    <P4>5 sao</P4>
                                                    <Bar>
                                                    </Bar>
                                                    <P4>0%</P4>
                                                </BarPercent>
                                                <BarPercent>
                                                    <P4>4 sao</P4>
                                                    <Bar>
                                                    </Bar>
                                                    <P4>0%</P4>
                                                </BarPercent>
                                                <BarPercent>
                                                    <P4>3 sao</P4>
                                                    <Bar>
                                                    </Bar>
                                                    <P4>0%</P4>
                                                </BarPercent>
                                                <BarPercent>
                                                    <P4>2 sao</P4>
                                                    <Bar>
                                                    </Bar>
                                                    <P4>0%</P4>
                                                </BarPercent>
                                                <BarPercent>
                                                    <P4>1 sao</P4>
                                                    <Bar>
                                                    </Bar>
                                                    <P4>0%</P4>
                                                </BarPercent>
                                            </>
                                    }
                                </Right>
                            </ContentLeft>
                            <ContentRight>
                                <ButtonContainer>
                                    <Button onClick={handleVietDanhGia}>
                                        <ModeEditOutlineIcon style={{ marginRight: "10px" }} />
                                        Viết đánh giá
                                    </Button>
                                </ButtonContainer>
                            </ContentRight>
                        </Content>
                        <hr></hr>
                        {/* Vòng lặp lấy thông tin feedback theo mathucung*/}
                        {Rate && Rate.length ? Rate.map((item, index) => (
                            <>
                                <Comments>
                                    <CommentHead>
                                        <Avatar src={item.hinhdaidien} />
                                        <Name>{item.hotennguoimua}</Name>
                                        <Time>{item.updated_at}</Time>
                                    </CommentHead>
                                    <StartNumber>
                                        <Rating name="size-medium" defaultValue={item.rating ? item.rating : 5} />
                                        <ContentComment>
                                            {item.newcomments ? item.newcomments : item.comments}
                                        </ContentComment>
                                    </StartNumber>
                                    <Action>
                                        <KeyboardReturnOutlinedIcon onClick={handleRelay()} />
                                        {/* <ModeEditOutlineOutlinedIcon onClick={handleEdit({ mathucung: mathucung, manguoimua: user.manguoimua })} /> */}
                                        <ModeEditOutlineOutlinedIcon onClick={() => handleEdit({ feedback_id: item.feedback_id })} />
                                        <DeleteOutlineOutlinedIcon onClick={() => handleDelete({ feedback_id: item.feedback_id, mathucung: mathucung, manguoimua: user.manguoimua })} />
                                    </Action>
                                </Comments>
                                <hr></hr>
                            </>
                        )) :

                            <></>}
                    </>
                    :
                    <>
                        <Content>
                            <ContentLeft>
                                <Left>
                                    <NumberStar>
                                        <P2>0</P2>
                                        <P3>/5</P3>
                                    </NumberStar>
                                    <Rating name="no-value" value={null} />
                                    <Typography
                                        component="legend"
                                        style={{ textAlign: "center", marginTop: "10px" }}
                                    >
                                        (0 Đánh giá & nhận xét)
                                    </Typography>
                                </Left>
                                <Right>
                                    <BarPercent>
                                        <P4>5 sao</P4>
                                        <Bar>
                                            {/* <BarCon></BarCon> */}
                                        </Bar>
                                        <P4>0%</P4>
                                    </BarPercent>
                                    <BarPercent>
                                        <P4>4 sao</P4>
                                        <Bar>
                                            {/* <BarCon></BarCon> */}
                                        </Bar>
                                        <P4>0%</P4>
                                    </BarPercent>
                                    <BarPercent>
                                        <P4>3 sao</P4>
                                        <Bar>
                                            {/* <BarCon></BarCon> */}
                                        </Bar>
                                        <P4>0%</P4>
                                    </BarPercent>
                                    <BarPercent>
                                        <P4>2 sao</P4>
                                        <Bar>
                                            {/* <BarCon></BarCon> */}
                                        </Bar>
                                        <P4>0%</P4>
                                    </BarPercent>
                                    <BarPercent>
                                        <P4>1 sao</P4>
                                        <Bar>
                                            {/* <BarCon></BarCon> */}
                                        </Bar>
                                        <P4>0%</P4>
                                    </BarPercent>
                                </Right>
                            </ContentLeft>
                            <ContentRight>
                                <P>
                                    Chỉ có thành viên mới có thể viết nhận xét.Vui lòng
                                    <Link style={{ color: "orange" }} to={"/login"}>
                                        &nbsp;đăng nhập&nbsp;
                                    </Link>
                                    hoặc{" "}
                                    <Link style={{ color: "orange" }} to={"/register"}>
                                        đăng ký
                                    </Link>
                                    .
                                </P>
                            </ContentRight>
                        </Content>
                    </>
            }
            {/* Modal */}
            {showModal && (
                <Modal onClick={handleBackdropClick}>
                    <ModalContent onClick={handleContentClick}>
                        {/* Modal content */}
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h3 style={{ marginBottom: "none" }}>Nhập thông tin đánh giá</h3>
                            <CloseIcon onClick={closeModal} />
                        </div>
                        {/* Your input fields for rating */}
                        <div style={{ display: "flex" }}>
                            <ModalFormItem style={{ flex: "1" }}>
                                <FormSpan>Mức độ đánh giá</FormSpan>
                                <Box
                                    sx={{
                                        width: 200,
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Rating
                                        name="hover-feedback"
                                        value={value}
                                        precision={1}
                                        getLabelText={getLabelText}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                            setRatingMoi(newValue);
                                        }}
                                        onChangeActive={(event, newHover) => {
                                            setHover(newHover);
                                        }}
                                        emptyIcon={
                                            <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                                        }
                                    />
                                    {value !== null && (
                                        <Box sx={{ ml: 2 }}>
                                            {labels[hover !== -1 ? hover : value]}
                                        </Box>
                                    )}
                                </Box>
                            </ModalFormItem>
                        </div>
                        <div style={{ display: "flex" }}>
                            <ModalFormItem style={{ flex: "1" }}>
                                <FormSpan>Đánh giá</FormSpan>
                                <FormTextArea
                                    rows="4"
                                    cols="50"
                                    onChange={(e) => setCommentsMoi(e.target.value)}
                                    placeholder="Nhập vào nhận xét của bạn về thú cưng"
                                // value={thuLacModalDacDiem}
                                />
                            </ModalFormItem>
                        </div>
                        {/* Close button */}
                        <ButtonGroup>
                            <Button onClick={closeModal}>Hủy</Button>
                            <Button onClick={() => handleSubmitComment({
                                feedback_id: feedbackIdModal,
                                mathucungmoi: mathucung,
                                ratingmoi: ratingMoi,
                                commentsmoi: commentsMoi,
                                manguoimuamoi: user.manguoimua
                            })}>Gửi nhân xét</Button>
                        </ButtonGroup>
                    </ModalContent>
                </Modal>
            )}
            {/* Modal Edit */}
            {showModalEdit && (
                <Modal onClick={handleBackdropClickEdit}>
                    <ModalContent onClick={handleContentClickEdit}>
                        {/* Modal content */}
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h3 style={{ marginBottom: "none" }}>Nhập thông tin đánh giá</h3>
                            <CloseIcon onClick={closeModalEdit} />
                        </div>
                        {/* Your input fields for rating */}
                        <div style={{ display: "flex" }}>
                            <ModalFormItem style={{ flex: "1" }}>
                                <FormSpan>Mức độ đánh giá</FormSpan>
                                <Box
                                    sx={{
                                        width: 200,
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Rating
                                        name="hover-feedback"
                                        value={value}
                                        precision={1}
                                        getLabelText={getLabelText}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                            setRatingModal(newValue);

                                        }}
                                        onChangeActive={(event, newHover) => {
                                            setHover(newHover);
                                        }}
                                        emptyIcon={
                                            <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                                        }
                                    />
                                    {ratingModal !== null && (
                                        <Box sx={{ ml: 2 }}>
                                            {labels[hover !== -1 ? hover : ratingModal]}
                                        </Box>
                                    )}
                                </Box>
                            </ModalFormItem>
                        </div>
                        <div style={{ display: "flex" }}>
                            <ModalFormItem style={{ flex: "1" }}>
                                <FormSpan>Đánh giá</FormSpan>
                                <FormTextArea
                                    rows="4"
                                    cols="50"
                                    onChange={(e) => setCommentsModal(e.target.value)}
                                    placeholder="Nhập vào nhận xét của bạn về thú cưng"
                                    value={commentsModal}
                                />
                            </ModalFormItem>
                        </div>
                        {/* Close button */}
                        <ButtonGroup>
                            <Button onClick={closeModalEdit}>Hủy</Button>
                            <Button onClick={() => handleEditComment({
                                feedback_id: feedbackIdModal,
                                mathucungmoi: mathucung,
                                ratingmoi: ratingModal,
                                commentsmoi: commentsModal,
                                manguoimuamoi: maNguoiMuaModal
                            })}>Sửa nhân xét</Button>
                        </ButtonGroup>
                    </ModalContent>
                </Modal>
            )}
            {/* === TOAST === */}
            <Toast
                ref={toastRef}
                dataToast={dataToast}   // Thông tin cần hiện lên: Đối tượng { message,type }
            />
        </Container>
    );
};

export default RatingStar;
