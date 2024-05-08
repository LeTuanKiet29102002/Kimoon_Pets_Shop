import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import "../css/main.css";
import { Link } from "react-router-dom";
import Toast from "../components/Toast";
import { updateInfo } from "../redux/userRedux";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import moment from 'moment-timezone';


const Container = styled.div``;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 20px auto;
  overflow: hidden;
  background-color: #f8f9fa;
  box-shadow: 0 2px 3px #e0e0e0;
  display: flex;
  border-radius: 10px;
`;

const Box1 = styled.div`
  max-width: 600px;
  padding: 10px 40px;
  user-select: none;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Box2 = styled.div`
  width: 100%;
  padding: 10px 40px;
  flex: 1;
`;

const Title1 = styled.div`
  display: flex;
  justify-content: space-between;
`;

// const CartItem = styled.div`
// display: flex;
// width: 100%;
// font-size: 1.1rem;
// background: #ddd;
// margin-top: 10px;
// padding: 10px 12px;
// border-radius: 5px;
// cursor: pointer;
// border: 1px solid transparent;
// `

// const Circle = styled.span`
// height: 12px;
// width: 12px;
// background: #ccc;
// border-radius: 50%;
// margin-right: 15px;
// border: 4px solid transparent;
// display: inline-block
// `

// const Course = styled.div`
// width: 100%
// `

// const Content = styled.div`
// display: flex;
// align-items: center;
// justify-content: space-between;
// `

const InfomationTitle = styled.div`
  font-size: 1.2rem;
`;

const InfomationForm = styled.div``;

const ModalChiTietItem = styled.div`
  margin: 2px 0px;
  display: flex;
  flex-direction: column;
`;

const FormSpan = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-dark-light);
  margin-bottom: 3px;
`;
const FormInput = styled.input`
  background-color: var(--color-white);
  color: var(--color-dark);
  width: auto;
  padding: 8px 20px;
  margin: 5px 0;
  display: inline-block;
  outline: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  &:focus {
    border: 1px solid var(--color-success);
    box-shadow: var(--color-success) 0px 1px 4px,
      var(--color-success) 0px 0px 0px 3px;
  }
`;

const FormSelect = styled.select`
  background-color: var(--color-white);
  color: var(--color-dark);
  width: auto;
  padding: 8px 20px;
  margin: 5px 0;
  outline: 0;
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

const FormOption = styled.option`
  margin: auto;
`;

const FormTextArea = styled.textarea`
  background-color: var(--color-white);
  color: var(--color-dark);
  width: auto;
  padding: 8px 20px;
  margin: 5px 0;
  display: inline-block;
  outline: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  &:focus {
    border: 1px solid var(--color-success);
    box-shadow: var(--color-success) 0px 1px 4px,
      var(--color-success) 0px 0px 0px 3px;
  }
`;
const Total = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TotalItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  justify-content: center;
  position: relative;
  float: right;
  margin: 10px 22px 22px 0;
  display: flex;
  &::after {
    content: "";
    border: 2px solid black;
    position: absolute;
    top: 5px;
    right: -5px;
    background-color: transperent;
    width: 150px;
    height: 100%;
    z-index: 5;
    border-radius: 5px;
  }
`;

const Button = styled.button`
  padding: 10px;
  width: 150px;
  border: 2px solid black;
  background-color: black;
  color: white;
  cursor: pointer;
  font-weight: 500;
  z-index: 10;
  border-radius: 5px;

  &:hover {
    background-color: #fe6430;
  }
  &:active {
    background-color: #333;
    transform: translate(5px, 5px);
    transition: transform 0.25s;
  }
`;

const Avatar = styled.img`
  width: 100%;
  max-height: 400px;
  overflow: hidden;
  object-fit: contain;
  border-radius: 10px;
`;

const Label = styled.label``;

const ButtonImage = styled.div`
  padding: 10px;
  min-width: 150px;
  border: 2px solid black;
  background-color: black;
  color: white;
  cursor: pointer;
  font-weight: 500;
  z-index: 10;
  border-radius: 5px;

  &:hover {
    background-color: #fe6430;
  }
  &:active {
    background-color: #333;
    transform: translate(5px, 5px);
  }
`;

const ButtonImageContainer = styled.div`
  justify-content: center;
  position: relative;
  float: right;
  margin: 10px 22px 22px 0;
  display: flex;
  &::after {
    content: "";
    border: 2px solid black;
    position: absolute;
    top: 5px;
    right: -5px;
    background-color: transperent;
    min-width: 150px;
    height: 100%;
    z-index: 5;
    border-radius: 5px;
  }
`;


const LineTitle = styled.h2`
  position: relative;
  top:20px;
  width: 100px;
  padding: 0 20px;
  min-width: 320px;
  margin: auto;
  &::before,
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    border-radius: 2px;
  }

  &::before {
    width: 100%;
    background: #f2f2f2;
  }

  &::after {
    width: 100%;
    background: #e73700;
  }
`;

const LostPets = () => {
    // User từ redux
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch(); //Để gọi hàm từ redux updateInfo

    // ===== TOAST =====
    const [dataToast, setDataToast] = useState({
        message: "alorrrrr alo",
        type: "success",
    });
    const toastRef = useRef(null); // useRef có thể gọi các hàm bên trong của Toast
    // bằng các dom event, javascript, ...

    const showToastFromOut = (dataShow) => {
        console.log("showToastFromOut da chay", dataShow);
        setDataToast(dataShow);
        toastRef.current.show();
    };


    // Lấy thú lạc
    const [thulac, setThuCungLac] = useState([]);
    useEffect(() => {
        const getThuCungLac = async () => {
            try {
                const thulacres = await axios.post("http://localhost:3001/api/lostpets/getThuCungLac", {});
                console.log("check thu cung lac: ", thulacres);

                setThuCungLac(thulacres.data);
            } catch (err) {
                console.log("Lỗi lấy thú cưng lạc: ", err);
            }
        }
        getThuCungLac();
    }, []);
    //   useEffect(() => {
    //       const timThuCungLac = async () => {
    //           try {
    //               const ketquares = await axios.post("http://localhost:3001/api/lostpets/findThuCungLac", { tenthulac: timkiem });
    //               setThuCungLac(ketquares.data);
    //               console.log("Kết quả tìm trong effect: ", ketquares.data);
    //           } catch (err) {
    //               console.log("Lỗi tìm kiếm: ", err);
    //           }
    //       }
    //       timThuCungLac();
    //       setPageNumber(0);
    //   }, [timkiem])
    console.log("Thú cưng lạc: ", thulac);
    // Các state khởi tạo
    // =============== Xử lý thêm thú cưng lạc ===============
    const [tenThuLacMoi, setTenThuLacMoi] = useState(""); //Giới tính mặc định là "Đực"
    const [maTrangThaiThuCungMoi, setMaTrangThaiThuCungMoi] = useState("1"); //Danh mục mặc định là Chó
    const [dacDiemMoi, setDacDiemMoi] = useState("");
    const [maNguoiMuaMoi, setMaNguoiMuaMoi] = useState("");
    const [maXaMoi, setMaXaMoi] = useState("00001");
    const [hoTenLienHeMoi, setHoTenLienHeMoi] = useState("");
    const [emailLienHeMoi, setEmailLienHeMoi] = useState(""); //Giới tính 
    const [sdtLienHeMoi, setSdtLienHeMoi] = useState("");
    const [diaChiLienHeMoi, setDiaChiLienHeMoi] = useState("");
    const [ngayTaoMoi, setNgayTaoMoi] = useState("");
    const [hinhAnhMoi, setHinhAnhMoi] = useState([]); //Mảng chứa hình ảnh

    // Lấy TỈNH - HUYỆN - XÃ
    const [tinhThanhPho, setTinhThanhPho] = useState();
    const [quanHuyen, setQuanHuyen] = useState();
    const [xaPhuongThiTran, setXaPhuongThiTran] = useState();

    const [mangTinhThanhPho, setMangTinhThanhPho] = useState([]);
    const [mangQuanHuyen, setMangQuanHuyen] = useState([]);
    const [mangXaPhuongThiTran, setMangXaPhuongThiTran] = useState([]);

    useEffect(() => {
        const getTinhThanhPho = async () => {
            const thanhphores = await axios.post(
                "http://localhost:3001/api/lostpets/getTinhThanhPho",
                {}
            );
            setMangTinhThanhPho(thanhphores.data);
            console.log("Tỉnh TP [res]: ", thanhphores.data);
        };
        getTinhThanhPho();
    }, []);

    useEffect(() => {
        const getQuanHuyen = async () => {
            const quanhuyenres = await axios.post(
                "http://localhost:3001/api/lostpets/getQuanHuyen",
                { mathanhpho: tinhThanhPho }
            );
            setMangQuanHuyen(quanhuyenres.data);
            console.log("Quận huyện [res]: ", quanhuyenres.data);
        };
        getQuanHuyen();
    }, [tinhThanhPho]);

    useEffect(() => {
        const getXaPhuongThiTran = async () => {
            const xaphuongthitranres = await axios.post(
                "http://localhost:3001/api/lostpets/getXaPhuongThiTran",
                { maquanhuyen: quanHuyen }
            );
            setMangXaPhuongThiTran(xaphuongthitranres.data);
            console.log("Xã phường res: ", xaphuongthitranres.data);
        };
        getXaPhuongThiTran();
    }, [quanHuyen]);

    // Thay đổi hình ảnh
    const handleShowImg = (hinhmoi) => {
        // Chạy vòng lặp thêm từng hình trong mảng lên firebase rồi lưu vô mảng [hinhAnhMoi] ở modal Thêm thú cưng
        setHinhAnhMoi([]);
        // console.log("hinh moi: ", hinhmoiarray[i]);
        const hinhanhunique = new Date().getTime() + hinhmoi;
        const storage = getStorage(app);
        const storageRef = ref(storage, hinhanhunique);
        const uploadTask = uploadBytesResumable(storageRef, hinhmoi);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case "storage/unauthorized":
                        console.log("Người dùng không có quyền truy cập vào đối tượng");
                        // Có thể cung cấp thông báo cho người dùng ở đây
                        break;
                    case "storage/canceled":
                        console.log("Người dùng đã hủy tải lên");
                        // Có thể cung cấp thông báo cho người dùng ở đây
                        break;
                    case "storage/unknown":
                        console.log("Đã xảy ra lỗi không xác định");
                        // Có thể cung cấp thông báo cho người dùng ở đây
                        break;
                    default:
                        console.log("Lỗi không xác định:", error.code);
                    // Có thể cung cấp thông báo cho người dùng ở đây
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    try {
                        setHinhAnhMoi(downloadURL);
                        console.log("Up thành công 1 hình: ", downloadURL);
                    } catch (err) {
                        console.log("Lỗi show hình ảnh:", err);
                    }
                });
            }
        );
        console.log("Hình mới: ", hinhmoi);
    };

    const handleThemThuLac = async ({
        tenthulacmoi,
        trangthaithucungmoi,
        dacdiemmoi,
        manguoimuamoi,
        maxamoi,
        hotenlienhemoi,
        emaillienhemoi,
        sdtlienhemoi,
        diachilienhemoi,
        ngaytaomoi,
        hinhanhthulacmoi,//Hình đại diện thú cưng lạc mới
    }) => {
        console.log("Thú lạc được thêm mới: ", {
            tenthulacmoi,
            trangthaithucungmoi,
            dacdiemmoi,
            manguoimuamoi,
            maxamoi,
            hotenlienhemoi,
            emaillienhemoi,
            sdtlienhemoi,
            diachilienhemoi,
            ngaytaomoi,
            hinhanhthulacmoi, //Hình đại diện thú cưng lạc mới
        });
        if (
            tenthulacmoi !== "" &&
            trangthaithucungmoi !== "" &&
            dacdiemmoi !== "" &&
            manguoimuamoi !== "" &&
            maxamoi !== "" &&
            hotenlienhemoi !== "" &&
            emaillienhemoi !== "" &&
            sdtlienhemoi !== "" &&
            diachilienhemoi !== "" &&
            ngaytaomoi !== "" &&
            hinhanhthulacmoi !== ""
        ) {
            try {
                const insertthulacres = axios.post(
                    "http://localhost:3001/api/lostpets/insertThuCungLac",
                    {
                        tenthulac: tenthulacmoi,
                        trangthaithucung: trangthaithucungmoi,
                        dacdiem: dacdiemmoi,
                        manguoimua: manguoimuamoi,
                        maxa: maxamoi,
                        hotenlienhe: hotenlienhemoi,
                        emaillienhe: emaillienhemoi,
                        sdtlienhe: sdtlienhemoi,
                        diachilienhe: diachilienhemoi,
                        ngaytao: ngaytaomoi,
                        hinhanhthulac: hinhanhthulacmoi,
                    }
                );
                console.log("KQ trả về update: ", insertthulacres);
                // setReRenderData((prev) => !prev); //Render lại csdl ở Compo cha là - DanhMucMain & DanhMucRight.jsx
                // setShowModal((prev) => !prev);

                
                const dataShow = {
                    message:
                        "Thêm thú cưng lạc " + tenthulacmoi + " thành công!",
                    type: "success",
                };
                showToastFromOut(dataShow);
                // setTenThuLacMoi([]);
                // setMaTrangThaiThuCungMoi([]);
                // setDacDiemMoi([]);
                // setHoTenLienHeMoi([]);
                // setEmailLienHeMoi([]);
                // setSdtLienHeMoi([]);
                // setDiaChiLienHeMoi([]);
                // setNgayTaoMoi([]);
                
                setHinhAnhMoi([]); //Làm rỗng mảng hình
                // setMangQuanHuyen([]);   //Làm rỗng mảng Quận huyện
                // setMangXaPhuongThiTran([]); //Làm rỗng mảng Phường xã

            } catch (err) {
                console.log("Lỗi insert: ", err);
                // setReRenderData((prev) => !prev); //Render lại csdl ở Compo cha là - DanhMucMain & DanhMucRight.jsx
                // setShowModal((prev) => !prev);
                const dataShow = {
                    message: "Đã có lỗi khi thêm thú cưng lạc " + tenthulacmoi,
                    type: "danger",
                };
                showToastFromOut(dataShow); //Hiện toast thông báo
            }

        } else {
            const dataShow = {
                message: "Bạn chưa nhập đủ thông tin cho thú cưng lạc",
                type: "danger",
            };
            showToastFromOut(dataShow); //Hiện toast thông báo
        }
    };

    // State chứa mảng chức vụ - Lấy về chức vụ để hiện select-option
    const [trangThaiThuCung, setTrangThaiThuCung] = useState([]);
    useEffect(() => {
        const getTrangThaiThuCung = async () => {
            try {
                const trangthaithures = await axios.post(
                    "http://localhost:3001/api/lostpets/getTrangThaiThu",
                    {}
                );
                setTrangThaiThuCung(trangthaithures.data);
                console.log("Mảng trạng thái thú lạc: ", trangThaiThuCung);
            } catch (err) {
                console.log("Lỗi lấy trạng thái thú lạc: ", err);
            }
        };
        getTrangThaiThuCung();
    }, [thulac]);

    // State chứa mảng ma nguoi mua
    // const [maNguoiMua, setMaNguoiMua] = useState([]);
    // useEffect(() => {
    //     const getMaNguoiMua = async () => {
    //         try {
    //             const manguoimuares = await axios.post(
    //                 "http://localhost:3001/api/lostpets/getMaNguoiMua",
    //                 {}
    //             );
    //             setMaNguoiMua(manguoimuares.data);
    //             console.log("Mảng trạng thái thú lạc: ", maNguoiMua);
    //         } catch (err) {
    //             console.log("Lỗi lấy trạng thái thú lạc: ", err);
    //         }
    //     };
    //     getMaNguoiMua();
    // }, [thulac]);
    console.log("User: ", user);
    return (
        <Container>
            <Navbar />
            <Announcement />
            <LineTitle>Helps you find your lost pet</LineTitle>
            <Wrapper>
                <Box1>
                    <Title1>
                        <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                            Điền thông tin liên hệ cá nhân
                        </p>
                    </Title1>
                    {hinhAnhMoi != "" ?
                        ( //Khi mảng hình có hình thì hiện các hình trong mảng
                            <Avatar src={hinhAnhMoi} />
                        ) : //Khi mảng hình trống thì hiện No Available Image
                        (
                            <Avatar src="https://firebasestorage.googleapis.com/v0/b/kiet-kimoonpets.appspot.com/o/No-Image-Placeholder.svg.png?alt=media&token=c656488d-0993-4bd5-8f96-c324277e2f5c" />
                        )
                    }
                    <p style={{ fontWeight: "500", marginTop: "10px" }}>
                        Hình ảnh thú cưng của bạn:
                    </p>
                    <Label htmlFor="imageInput">
                        <ButtonImageContainer>
                            <ButtonImage>
                                <AddPhotoAlternateIcon />
                                Thêm hình ảnh
                            </ButtonImage>
                        </ButtonImageContainer>
                    </Label>
                    <FormInput
                        type="file"
                        style={{ display: "none" }}
                        id="imageInput"
                        onChange={(e) => handleShowImg(e.target.files[0])}
                    />
                    <FormSpan>Tên thú cưng lạc:</FormSpan>
                    <FormInput
                        type="text"
                        onChange={(e) => setTenThuLacMoi(e.target.value)}
                        placeholder="Tên của thú lạc"
                    />
                    <FormSpan>Đặc điểm:</FormSpan>
                    <FormTextArea
                        rows="4"
                        cols="50"
                        onChange={(e) => setDacDiemMoi(e.target.value)}
                        placeholder="Nhập vào đặc điểm thú cưng lạc"
                    //   value={thuLacModalDacDiem}
                    />
                </Box1>
                <Box2>
                    <InfomationTitle>
                        <p style={{ fontWeight: "bold", margin: "10px 0 0 0" }}>
                            Thông tin liên hệ chi tiết
                        </p>
                        <p style={{ fontSize: "1rem" }}>
                            Tìm kiếm thú cưng của bạn bằng việc cung cấp những thông tin sau
                        </p>
                    </InfomationTitle>
                    <InfomationForm>
                        <ModalChiTietItem>
                            <FormSpan>Mã người mua của bạn là:</FormSpan>
                            <FormInput
                                type="text"
                                value={user ? user.manguoimua : null}
                                disabled
                            />
                        </ModalChiTietItem>
                        <ModalChiTietItem>
                            <FormSpan>Địa chỉ email liên hệ:</FormSpan>
                            <FormInput
                                type="email"
                                onChange={(e) => {
                                    setEmailLienHeMoi(e.target.value);
                                }}
                                placeholder="Email liên hệ của bạn là"
                            // value={user ? user.emailnguoimua : null}
                            // disabled
                            />
                        </ModalChiTietItem>
                        <ModalChiTietItem>
                            <FormSpan>Họ tên liên hệ:</FormSpan>
                            <FormInput
                                type="text"
                                onChange={(e) => {
                                    setHoTenLienHeMoi(e.target.value);
                                }}
                                // value={user ? user.hotennguoimua : null}
                                placeholder="Họ tên liên hệ của bạn là"
                            />
                        </ModalChiTietItem>
                        <ModalChiTietItem>
                            <FormSpan>Trạng thái thú lạc:</FormSpan>
                            <FormSelect
                                onChange={(e) => {
                                    setMaTrangThaiThuCungMoi(e.target.value);
                                }}
                            >
                                {trangThaiThuCung.map((item, key) => {
                                    return (
                                        <FormOption value={item.trangthaithucung}>
                                            {" "}
                                            {item.tentrangthaithucung}{" "}
                                        </FormOption>
                                    );
                                })}
                            </FormSelect>
                        </ModalChiTietItem>
                        <ModalChiTietItem>
                            <FormSpan>Ngày lạc:</FormSpan>
                            <FormInput
                                type="date"
                                onChange={(e) => setNgayTaoMoi(e.target.value)}
                            // value={ngaySinhNguoiMua}
                            />
                        </ModalChiTietItem>
                        <ModalChiTietItem>
                            <FormSpan>Số điện thoại:</FormSpan>
                            <FormInput
                                type="text"
                                onChange={(e) => setSdtLienHeMoi(e.target.value)}
                                // value={sdtNguoiMua}
                                placeholder="Số điện thoại liên hệ của bạn là"
                            />
                        </ModalChiTietItem>
                        <ModalChiTietItem>
                            <FormSpan>Địa chỉ:</FormSpan>
                            <FormInput
                                type="text"
                                onChange={(e) => setDiaChiLienHeMoi(e.target.value)}
                                // value={diaChiNguoiMua}
                                placeholder="Địa chỉ của bạn là"
                            />
                        </ModalChiTietItem>
                        <ModalChiTietItem>
                            <FormSpan>Thuộc tỉnh:</FormSpan>
                            <FormSelect
                                onChange={(e) => {
                                    setTinhThanhPho(e.target.value);
                                }}
                            >
                                <FormOption value="">-- Chọn thành phố --</FormOption>
                                {mangTinhThanhPho.map((tinhthanhpho, key) => {
                                    return (
                                        <FormOption value={tinhthanhpho.mathanhpho}>
                                            {" "}
                                            {tinhthanhpho.tenthanhpho}{" "}
                                        </FormOption>
                                    );
                                })}
                            </FormSelect>
                        </ModalChiTietItem>
                        <ModalChiTietItem>
                            <FormSpan>Thuộc huyện:</FormSpan>
                            <FormSelect
                                onChange={(e) => {
                                    setQuanHuyen(e.target.value);
                                }}
                            >
                                {mangQuanHuyen.length > 0 ? (
                                    mangQuanHuyen.map((quanhuyen, key) => {
                                        return (
                                            <FormOption value={quanhuyen.maquanhuyen}>
                                                {" "}
                                                {quanhuyen.tenquanhuyen}{" "}
                                            </FormOption>
                                        );
                                    })
                                ) : (
                                    <FormOption value="">
                                        -- Bạn chưa chọn Thành phố --{" "}
                                    </FormOption>
                                )}
                            </FormSelect>
                        </ModalChiTietItem>
                        <ModalChiTietItem>
                            <FormSpan>Thuộc xã:</FormSpan>
                            <FormSelect
                                onChange={(e) => {
                                    setXaPhuongThiTran(e.target.value);
                                }}
                            >
                                {mangXaPhuongThiTran.length > 0 ? (
                                    mangXaPhuongThiTran.map((xaphuong, key) => {
                                        return (
                                            <FormOption value={xaphuong.maxa}>
                                                {" "}
                                                {xaphuong.tenxa}{" "}
                                            </FormOption>
                                        );
                                    })
                                ) : (
                                    <FormOption value="">
                                        -- Bạn chưa chọn Huyện --{" "}
                                    </FormOption>
                                )}
                            </FormSelect>
                        </ModalChiTietItem>
                    </InfomationForm>
                    <Total>
                        <ButtonContainer>
                            <Button
                                onClick={() =>
                                    handleThemThuLac({
                                        tenthulacmoi: tenThuLacMoi,
                                        trangthaithucungmoi: maTrangThaiThuCungMoi,
                                        dacdiemmoi: dacDiemMoi,
                                        manguoimuamoi: user.manguoimua,
                                        maxamoi: xaPhuongThiTran,
                                        hotenlienhemoi: hoTenLienHeMoi,
                                        emaillienhemoi: emailLienHeMoi,
                                        sdtlienhemoi: sdtLienHeMoi,
                                        diachilienhemoi: diaChiLienHeMoi,
                                        ngaytaomoi: ngayTaoMoi,
                                        hinhanhthulacmoi: hinhAnhMoi,
                                    })
                                }
                            >
                                Xác nhận
                            </Button>
                        </ButtonContainer>
                        <Link to="/">
                            <ButtonContainer>
                                <Button>Trở lại</Button>
                            </ButtonContainer>
                        </Link>
                    </Total>
                </Box2>
            </Wrapper>

            {/* === TOAST === */}
            <Toast
                ref={toastRef}
                dataToast={dataToast} // Thông tin cần hiện lên: Đối tượng { message,type }
            />
            <Footer />
        </Container>
    );
};

export default LostPets;
