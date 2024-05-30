import styled, { keyframes } from "styled-components";
import { CloseOutlined } from "@mui/icons-material";
import { useCallback, useEffect, useRef, useState } from "react";
import "../../css/main.css";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { async } from "@firebase/util";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
const CryptoJS = require("crypto-js"); //Thư viện mã hóa mật khẩu

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  animation: fadeIn linear 0.1s;
`;
const growAnimation = keyframes`
    from {
        transform: scale(0.1);
    }
    to {
        transform: scale(1);
    }
`;
const ModalWrapper = styled.div`
  width: 500px;
  height: auto;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: var(--color-white);
  color: var(--color-dark);
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  z-index: 10;
  border-radius: 10px;
  animation: ${growAnimation} linear 0.5s;
`;

const ThemNhanVienWrapper = styled.div`
  width: 80%;
  height: 90%;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: var(--color-white);
  color: var(--color-dark);
  display: flex;
  /* justify-content: center; */
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  animation: ${growAnimation} linear 0.5s;
`;

const ChiTietWrapper = styled.div`
  width: 80%;
  height: 90%;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: var(--color-white);
  color: var(--color-dark);
  display: flex;
  /* justify-content: center; */
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  z-index: 10;
  border-radius: 10px;
  animation: ${growAnimation} linear 0.5s;
`;

const Label = styled.label``;

const FormLabel = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonImage = styled.div`
  margin-left: 20px;
  padding: 10px;
  border: 2px solid black;
  background-color: black;
  color: white;
  cursor: pointer;
  font-weight: 500;
  border-radius: 5px;
  text-align: center;
  &:hover {
    background-color: #fe6430;
  }
  &:active {
    background-color: #333;
    transform: translate(5px, 5px);
    transition: transform 0.25s;
  }
`;

const ButtonImageContainer = styled.div`
  position: relative;
  float: right;
  margin: 0 22px 22px 0;
  &::after {
    content: "";
    border: 2px solid black;
    position: absolute;
    top: 5px;
    left: 26px;
    right: 20px;
    background-color: transperent;
    width: 86%;
    height: 95%;
    z-index: -1;
    border-radius: 5px;
  }
`;

const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: var(--color-dark);
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;

  p {
    margin-bottom: 1rem;
  }
`;

const CloseModalButton = styled.span`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const Button = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
`;

const H2 = styled.h2`
  margin-top: 30px;
`;

const ModalForm = styled.form`
  width: 100%;
  height: 130%;
  display: flex;
  flex-direction: column;
  border-radius: var(--card-border-radius);
  padding: var(--card-padding);
  box-shadow: var(--box-shadow);
  transition: all 300ms ease;
  &:hover {
    box-shadow: none;
  }
`;

const ModalFormItem = styled.div`
  margin: 2px 30px;
  display: flex;
  flex-direction: column;
`;

const FormSpan = styled.span`
  font-size: 1.2rem;
  height: 600;
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

const ButtonUpdate = styled.div`
  width: 100%;
  margin: 18px 0px;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
`;

const ButtonContainer = styled.div`
  position: relative;
  float: right;
  margin: 0 22px 22px 0;
  &::after {
    content: "";
    border: 2px solid black;
    position: absolute;
    top: 5px;
    left: 5px;
    right: 20px;
    background-color: transperent;
    width: 95%;
    height: 95%;
    z-index: -1;
    border-radius: 5px;
  }
`;

const ButtonClick = styled.button`
  padding: 10px;
  border: 2px solid black;
  background-color: black;
  color: white;
  cursor: pointer;
  font-weight: 500;
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

const FormImg = styled.img`
  margin: auto;
  width: 50%;
  object-fit: cover;
  height: 200px;
`;

const ChiTietHinhAnh = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin: auto;
  border-radius: 5px;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  &img {
    margin: 0px 20px;
  }
`;

const FormSelect = styled.select`
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

const FormOption = styled.option`
  margin: auto;
`;

// const FormLabel = styled.label`
//     display: flex;
//     flex-directory: row;
//     // justify-content: center;
//     align-items: center;
// `

const FormCheckbox = styled.input`
  appearance: auto;
  margin-right: 10px;
`;

const FormTextArea = styled.textarea`
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

const Position = styled.div`
  position: absolute;
  position: absolute;
  top: 200px;
  left: 160px;
  width: 85%;
`;

const PositionTwo = styled.div`
  position: absolute;
  position: absolute;
  top: 280px;
  left: 160px;
  width: 85%;
`;

const PositionThree = styled.div`
  position: absolute;
  position: absolute;
  top: 370px;
  left: 390px;
  width: 66%;
`;



const Modal = ({
  showModal,
  setShowModal,
  type,
  vouchers,
  setReRenderData,
  handleClose,
  showToastFromOut,
}) => {
  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
      // setthuCungModalHinhAnh([]); //Modal chi tiết vouchers khi tắt sẽ xóa mảng hình
      // setHinhAnhMoi([]); //Modal thêm vouchers khi tắt sẽ xóa mảng hình
      // setMangQuanHuyen([]); //Làm rỗng mảng Quận huyện
      // setMangXaPhuongThiTran([]); //Làm rỗng mảng Phường xã
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        // setthuCungModalHinhAnh([]); //Modal chi tiết vouchers khi tắt sẽ xóa mảng hình
        // setHinhAnhMoi([]); //Modal thêm vouchers khi tắt sẽ xóa mảng hình
        // setMangQuanHuyen([]); //Làm rỗng mảng Quận huyện
        // setMangXaPhuongThiTran([]); //Làm rỗng mảng Phường xã
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  // =============== Xử lý cập nhật vouchers ===============
  const handleCapNhatVouchers = async ({
    mavoucher,
    codevouchermoi,
    tenvouchermoi,
    dieukienvouchermoi,
    soluongvouchermoi,
    tinhtrangvouchermoi,
    giavouchermoi,
    motavouchermoi,
    ngaytaovouchermoi,
    ngayhethanvouchermoi,
  }) => {
    console.log("Đầu vào Cập nhật vouchers:", {
      mavoucher,
      codevouchermoi,
      tenvouchermoi,
      dieukienvouchermoi,
      soluongvouchermoi,
      tinhtrangvouchermoi,
      giavouchermoi,
      motavouchermoi,
      ngaytaovouchermoi,
      ngayhethanvouchermoi
    });

    if (
      mavoucher !== "" &&
      codevouchermoi !== "" &&
      tenvouchermoi !== "" &&
      dieukienvouchermoi !== "" &&
      soluongvouchermoi !== "" &&
      tinhtrangvouchermoi !== "" &&
      giavouchermoi !== "" &&
      motavouchermoi !== "" &&
      ngaytaovouchermoi !== "" &&
      ngayhethanvouchermoi !== ""
    ) {
      try {
        const updatevouchersres = await axios.post(
          "http://localhost:3001/api/vouchers/updateVouchers",
          {
            mavoucher,
            codevouchermoi,
            tenvouchermoi,
            dieukienvouchermoi,
            soluongvouchermoi,
            tinhtrangvouchermoi,
            giavouchermoi,
            motavouchermoi,
            ngaytaovouchermoi,
            ngayhethanvouchermoi
          }
        );
        console.log("KQ trả về update: ", updatevouchersres);
        setReRenderData((prev) => !prev); //Render lại csdl ở Compo cha là - ThuCungMain & ThuCungRight.jsx
        setShowModal((prev) => !prev);
        handleClose();
        const dataShow = {
          message: "Thay đổi vouchers có mã " + mavoucher + " thành công!",
          type: "success",
        };
        showToastFromOut(dataShow);

      } catch (err) {
        setReRenderData((prev) => !prev); //Render lại csdl ở Compo cha là - ThuCungMain & ThuCungRight.jsx
        setShowModal((prev) => !prev);
        handleClose();
        const dataShow = {
          message:
            "Thất bại! Không thể cập nhật vouchers có mã " + mavoucher,
          type: "danger",
        };
        showToastFromOut(dataShow);
      }
    } else {
      const dataShow = {
        message: "Bạn chưa nhập đủ thông tin cho vouchers",
        type: "danger",
      };
      showToastFromOut(dataShow); //Hiện toast thông báo
    }
  };


  //  test
  const [VouchersModal, setVouchersModal] = useState();
  const [VouchersModalMaVouchers, setVouchersModalMaVouchers] = useState();
  const [VouchersModalCodeVouchers, setVouchersModalCodeVouchers] = useState();
  const [VouchersModalTenVouchers, setVouchersModalTenVouchers] = useState();
  const [VouchersModalDieuKienVouchers, setVouchersModalDieuKienVouchers] = useState();
  const [VouchersModalSoLuongVouchers, setVouchersModalSoLuongVouchers] = useState();
  const [VouchersModalTinhTrangVouchers, setVouchersModalTinhTrangVouchers] = useState();
  const [VouchersModalGiaVouchers, setVouchersModalGiaVouchers] = useState();
  const [VouchersModalMoTaVouchers, setVouchersModalMoTaVouchers] = useState();
  const [VouchersModalNgayTaoVouchers, setVouchersModalNgayTaoVouchers] = useState();
  const [VouchersModalNgayHetHanVouchers, setVouchersModalNgayHetHanVouchers] = useState();


  //Old
  const [VouchersModalOld, setVouchersModalOld] = useState();
  const [VouchersModalMaVouchersOld, setVouchersModalMaVouchersOld] = useState();
  const [VouchersModalCodeVouchersOld, setVouchersModalCodeVouchersOld] = useState();
  const [VouchersModalSoLuongVouchersOld, setVouchersModalSoLuongVouchersOld] = useState();
  const [VouchersModalTinhTrangVouchersOld, setVouchersModalTinhTrangVouchersOld] = useState();
  const [VouchersModalTenVouchersOld, setVouchersModalTenVouchersOld] = useState();
  const [VouchersModalDieuKienVouchersOld, setVouchersModalDieuKienVouchersOld] = useState();
  const [VouchersModalGiaVouchersOld, setVouchersModalGiaVouchersOld] = useState();
  const [VouchersModalMoTaVouchersOld, setVouchersModalMoTaVouchersOld] = useState();
  const [VouchersModalNgayTaoVouchersOld, setVouchersModalNgayTaoVouchersOld] = useState();
  const [VouchersModalNgayHetHanVouchersOld, setVouchersModalNgayHetHanVouchersOld] = useState();

  useEffect(() => {
    // setthuCungModalHinhAnh([]);
    // setthuCungModalHinhAnhChange([]);
    const getVouchers = async () => {
      try {
        const vouchersres = await axios.post(
          "http://localhost:3001/api/vouchers/findVouchersById",
          { mavoucher: vouchers.mavoucher }
        );
        console.log("check vouchers:", vouchersres);
        setVouchersModal(vouchersres.data);
        setVouchersModalMaVouchers(vouchersres.data[0].mavoucher);
        setVouchersModalCodeVouchers(vouchersres.data[0].codevoucher);
        setVouchersModalTenVouchers(vouchersres.data[0].tenvoucher);
        setVouchersModalDieuKienVouchers(vouchersres.data[0].dieukienvoucher);
        setVouchersModalSoLuongVouchers(vouchersres.data[0].soluongvoucher);
        setVouchersModalTinhTrangVouchers(vouchersres.data[0].tinhtrangvoucher);
        setVouchersModalGiaVouchers(vouchersres.data[0].giavoucher);
        setVouchersModalMoTaVouchers(vouchersres.data[0].motavoucher);
        setVouchersModalNgayTaoVouchers(vouchersres.data[0].ngaytaovoucher);
        setVouchersModalNgayHetHanVouchers(vouchersres.data[0].ngayhethanvoucher);

        setVouchersModalOld(vouchersres.data);
        setVouchersModalMaVouchersOld(vouchersres.data[0].mavoucher);
        setVouchersModalCodeVouchersOld(vouchersres.data[0].codevoucher);
        setVouchersModalTenVouchersOld(vouchersres.data[0].tenvoucher);
        setVouchersModalDieuKienVouchersOld(vouchersres.data[0].dieukienvoucher);
        setVouchersModalSoLuongVouchersOld(vouchersres.data[0].soluongvoucher);
        setVouchersModalTinhTrangVouchersOld(vouchersres.data[0].tinhtrangvoucher);
        setVouchersModalGiaVouchersOld(vouchersres.data[0].giavoucher);
        setVouchersModalMoTaVouchersOld(vouchersres.data[0].motavoucher);
        setVouchersModalNgayTaoVouchersOld(vouchersres.data[0].ngaytaovoucher);
        setVouchersModalNgayHetHanVouchersOld(vouchersres.data[0].ngayhethanvoucher);

        console.log("Nhân viên modal hahaha: ", VouchersModal);

      } catch (err) {
        console.log("Lỗi lấy vouchers: ", err);
      }
    };
    getVouchers();
  }, [vouchers]);
  console.log("Nhân viên modal: ", VouchersModal);


  const handleCloseUpdate = () => {
    // Set lại giá trị cũ sau khi đóng Modal
    // setthuCungModalHinhAnh(thuCungModalHinhAnhOld);

    // setVouchersModalMaVouchers(VouchersModalMaVouchersOld);
    setVouchersModalTenVouchers(VouchersModalTenVouchersOld);
    setVouchersModalCodeVouchers(VouchersModalCodeVouchersOld);
    setVouchersModalDieuKienVouchers(VouchersModalDieuKienVouchersOld);
    setVouchersModalSoLuongVouchersOld(VouchersModalSoLuongVouchersOld);
    setVouchersModalTinhTrangVouchersOld(VouchersModalTinhTrangVouchersOld);
    setVouchersModalGiaVouchers(VouchersModalGiaVouchersOld);
    setVouchersModalMoTaVouchers(VouchersModalMoTaVouchersOld);
    setVouchersModalNgayTaoVouchers(VouchersModalNgayTaoVouchersOld);
    setVouchersModalNgayHetHanVouchers(VouchersModalNgayHetHanVouchersOld);

    setShowModal((prev) => !prev);
    // setHinhAnhMoi([]);  //Đóng modal sẽ xóa mảng hình cũ ở Modal Thêm vouchers
    // setthuCungModalHinhAnhChange([]);
  };

  // =============== Xử lý thêm vouchers ===============
  const [tenVouchersMoi, setTenVouchersMoi] = useState("");
  const [codeVouchersMoi, setCodeVouchersMoi] = useState("");
  const [dieuKienVouchersMoi, setDieuKienVouchersMoi] = useState("");
  const [soLuongVouchersMoi, setSoLuongVouchersMoi] = useState("");
  const [tinhTrangVouchersMoi, settinhTrangVouchersMoi] = useState(1);
  const [giaVouchersMoi, setGiaVouchersMoi] = useState("");
  const [moTaVouchersMoi, setMoTaVouchersMoi] = useState("");
  const [ngayTaoVouchersMoi, setNgayTaoVouchersMoi] = useState("");
  const [ngayHetHanVochersMoi, setNgayHetHanVouchersMoi] = useState("");


  const handleThemVouchers = async ({
    codevouchermoi,
    tenvouchermoi,
    dieukienvouchermoi,
    soluongvouchermoi,
    tinhtrangvouchermoi,
    giavouchermoi,
    motavouchermoi,
    ngaytaovouchermoi,
    ngayhethanvouchermoi,
  }) => {
    console.log("vouchers được thêm mới: ", {
      codevouchermoi,
      tenvouchermoi,
      dieukienvouchermoi,
      soluongvouchermoi,
      tinhtrangvouchermoi,
      giavouchermoi,
      motavouchermoi,
      ngaytaovouchermoi,
      ngayhethanvouchermoi, //Hình đại diện vouchers mới
    });
    if (
      codevouchermoi !== "" &&
      tenvouchermoi !== "" &&
      dieukienvouchermoi !== "" &&
      soluongvouchermoi !== "" &&
      tinhtrangvouchermoi !== "" &&
      giavouchermoi !== "" &&
      motavouchermoi !== "" &&
      ngaytaovouchermoi !== "" &&
      ngayhethanvouchermoi !== ""
    ) {
      try {
        const insertvouchersres = axios.post(
          "http://localhost:3001/api/vouchers/insertVouchers",
          {
            codevoucher: codevouchermoi,
            tenvoucher: tenvouchermoi,
            dieukienvoucher: dieukienvouchermoi,
            soluongvoucher: soluongvouchermoi,
            tinhtrangvoucher: tinhtrangvouchermoi,
            giavoucher: giavouchermoi,
            motavoucher: motavouchermoi,
            ngaytaovoucher: ngaytaovouchermoi,
            ngayhethanvoucher: ngayhethanvouchermoi,
          }
        );
        console.log("KQ trả về update: ", insertvouchersres);
        setReRenderData((prev) => !prev); //Render lại csdl ở Compo cha là - DanhMucMain & DanhMucRight.jsx
        setShowModal((prev) => !prev);
        const dataShow = {
          message:
            "Thêm vouchers " + codevouchermoi + " thành công!",
          type: "success",
        };
        showToastFromOut(dataShow);
      } catch (err) {
        console.log("Lỗi insert: ", err);
        setReRenderData((prev) => !prev); //Render lại csdl ở Compo cha là - DanhMucMain & DanhMucRight.jsx
        setShowModal((prev) => !prev);
        const dataShow = {
          message: "Đã có lỗi khi thêm vouchers " + codevouchermoi,
          type: "danger",
        };
        showToastFromOut(dataShow); //Hiện toast thông báo
      }

    } else {
      const dataShow = {
        message: "Bạn chưa nhập thông tin cho vouchers",
        type: "danger",
      };
      showToastFromOut(dataShow); //Hiện toast thông báo
    }
  };


  // =============== Xử lý xóa vouchers ===============
  const handleXoaVouchers = async ({ mavoucher }) => {
    if (mavoucher !== "") {
      try {
        const deletevouchersres = await axios.post(
          "http://localhost:3001/api/vouchers/deleteVouchers",
          { mavoucher }
        );
        console.log("KQ trả về delete: ", deletevouchersres);
        setReRenderData((prev) => !prev); //Render lại csdl ở Compo cha là - DanhMucMain & DanhMucRight.jsx
        setShowModal((prev) => !prev);
        handleClose(); //Đóng thanh tìm kiếm
        const dataShow = {
          message: "Đã xóa vouchers mã " + mavoucher + " thành công!",
          type: "success",
        };
        showToastFromOut(dataShow);
      } catch (err) {
        console.log("Lỗi Delete vouchers err: ", err);
      }
    }
  };

  // =============== Xử lý Xem chi tiết vouchers ===============
  const handleCloseChiTiet = () => {
    setShowModal((prev) => !prev);
  };
  // ================================================================
  //  =============== Xem chi tiết vouchers ===============
  if (type === "chitietvouchers") {
    return (
      <>
        {showModal ? (
          <Background ref={modalRef} onClick={closeModal}>
            <ChiTietWrapper
              showModal={showModal}
              style={{ flexDirection: `column` }}
            >
              <H2>Chi tiết vouchers</H2>
              <ModalForm>
                <div style={{ display: "flex", marginTop: "15px" }}>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Mã vouchers:</FormSpan>
                    <FormInput type="text" value={vouchers.mavoucher} readOnly />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Code vouchers:</FormSpan>
                    <FormInput type="text" value={vouchers.codevoucher} readOnly />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Trạng thái vouchers:</FormSpan>
                    <FormSpan
                      style={{
                        color: vouchers.tinhtrangvoucher === 1 ? 'green' : 'red',
                        fontWeight: 'bold',
                        marginTop: '12px',
                        marginLeft: '40px',
                        fontSize: "22px"
                      }}
                    >
                      {vouchers.tinhtrangvoucher === 1 ? 'active' : 'inactive'}
                    </FormSpan>
                  </ModalFormItem>
                </div>
                <div style={{ display: "flex", marginTop: "15px" }}>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Tên voucher:</FormSpan>
                    <FormInput type="text" value={vouchers.tenvoucher} readOnly />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Ngày tạo vouchers:</FormSpan>
                    <FormInput type="text" value={vouchers.ngaytaovoucher.substring(0, 10)} readOnly />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Ngày hết hạn vouchers:</FormSpan>
                    <FormInput type="text" value={vouchers.ngayhethanvoucher.substring(0, 10)} readOnly />
                  </ModalFormItem>
                </div>
                <div style={{ display: "flex", marginTop: "15px" }}>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Số lượng vouchers:</FormSpan>
                    <FormInput type="text" value={vouchers.soluongvoucher} readOnly />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Giá voucher giảm được:</FormSpan>
                    <FormInput type="text" value={vouchers.giavoucher} readOnly />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Dùng được cho đơn hàng từ:</FormSpan>
                    <FormInput type="text" value={vouchers.dieukienvoucher} readOnly />
                  </ModalFormItem>
                </div>
                <div style={{ display: "flex", marginTop: "15px" }}>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Mô tả voucher:</FormSpan>
                    <FormTextArea
                      rows="4"
                      cols="50"
                      placeholder="Nhập vào đặc điểm của vouchers"
                      value={vouchers.motavoucher}
                      readOnly
                    />
                  </ModalFormItem>
                </div>
              </ModalForm>
              <ButtonUpdate>
                <ButtonContainer>
                  <ButtonClick onClick={handleCloseChiTiet}>Đóng</ButtonClick>
                </ButtonContainer>
              </ButtonUpdate>
              <CloseModalButton
                aria-label="Close modal"
                onClick={handleCloseChiTiet}
              >
                <CloseOutlined />
              </CloseModalButton>
            </ChiTietWrapper>
          </Background>
        ) : null}
      </>
    );
  }
  //  =============== Thêm vouchers ===============
  if (type === "themvouchers") {
    return (
      <>
        {showModal ? (
          <Background ref={modalRef} onClick={closeModal}>
            <ThemNhanVienWrapper
              showModal={showModal}
              style={{ flexDirection: `column` }}
            >
              <H2>Thêm vouchers mới</H2>
              <ModalForm>
                <div style={{ display: "flex", marginTop: "15px" }}>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Code voucher:</FormSpan>
                    <FormInput
                      type="text"
                      onChange={(e) => setCodeVouchersMoi(e.target.value)}
                      placeholder="Code của vouchers"
                    />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Tên voucher:</FormSpan>
                    <FormInput
                      type="text"
                      onChange={(e) => setTenVouchersMoi(e.target.value)}
                      placeholder="Tên của vouchers"
                    />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Tình trạng voucher:</FormSpan>
                    <FormInput
                      type="text"
                      onChange={(e) => settinhTrangVouchersMoi(e.target.value)}
                      placeholder="Tình trạng của vouchers"
                    />
                  </ModalFormItem>
                </div>
                <div style={{ display: "flex" }}>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Dùng được cho đơn hàng từ:</FormSpan>
                    <FormInput
                      type="text"
                      onChange={(e) => setDieuKienVouchersMoi(e.target.value)}
                    />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Ngày tạo voucher:</FormSpan>
                    <FormInput
                      type="date"
                      onChange={(e) => setNgayTaoVouchersMoi(e.target.value)}
                    />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Ngày hết hạn voucher:</FormSpan>
                    <FormInput
                      type="date"
                      onChange={(e) => setNgayHetHanVouchersMoi(e.target.value)}
                    />
                  </ModalFormItem>
                </div>
                <div style={{ display: "flex" }}>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Giá voucher giảm được:</FormSpan>
                    <FormInput
                      type="text"
                      onChange={(e) => setGiaVouchersMoi(e.target.value)}
                    />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Số lượng voucher:</FormSpan>
                    <FormInput
                      type="number"
                      min="1"
                      onChange={(e) => setSoLuongVouchersMoi(e.target.value)}
                    />
                  </ModalFormItem>
                </div>
                <div style={{ display: "flex" }}>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Mô tả voucher:</FormSpan>
                    <FormTextArea
                      rows="4"
                      cols="50"
                      onChange={(e) => setMoTaVouchersMoi(e.target.value)}
                      placeholder="Nhập vào mô tả vouchers"
                    // value={VouchersModalSoLuongVouchers}
                    />
                  </ModalFormItem>
                </div>
              </ModalForm>
              <ButtonUpdate>
                <ButtonContainer>
                  <ButtonClick
                    onClick={() =>
                      handleThemVouchers({
                        tenvouchermoi: tenVouchersMoi,
                        codevouchermoi: codeVouchersMoi,
                        dieukienvouchermoi: dieuKienVouchersMoi,
                        soluongvouchermoi: soLuongVouchersMoi,
                        tinhtrangvouchermoi: tinhTrangVouchersMoi,
                        giavouchermoi: giaVouchersMoi,
                        motavouchermoi: moTaVouchersMoi,
                        ngaytaovouchermoi: ngayTaoVouchersMoi,
                        ngayhethanvouchermoi: ngayHetHanVochersMoi,
                      })
                    }
                  >
                    Thêm vào
                  </ButtonClick>
                </ButtonContainer>
                <ButtonContainer>
                  <ButtonClick onClick={() => handleCloseUpdate()}>
                    Hủy bỏ
                  </ButtonClick>
                </ButtonContainer>
              </ButtonUpdate>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => handleCloseUpdate()}
              >
                <CloseOutlined />
              </CloseModalButton>
            </ThemNhanVienWrapper>
          </Background>
        ) : null}
      </>
    );
  }
  // =============== Chỉnh sửa vouchers ===============
  if (type === "chinhsuavouchers") {
    return (
      <>
        {showModal ? (
          <Background ref={modalRef} onClick={closeModal}>
            <ThemNhanVienWrapper
              showModal={showModal}
              style={{ flexDirection: `column` }}
            >
              <H2>Cập nhật thông tin vouchers</H2>
              <ModalForm>
                <div style={{ display: "flex", marginTop: "15px" }}>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Code voucher:</FormSpan>
                    <FormInput
                      type="text"
                      onChange={(e) =>
                        setVouchersModalCodeVouchers(e.target.value)
                      }
                      value={VouchersModalCodeVouchers}
                    />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Tên voucher:</FormSpan>
                    <FormInput
                      type="text"
                      onChange={(e) =>
                        setVouchersModalTenVouchers(e.target.value)
                      }
                      value={VouchersModalTenVouchers}
                    />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Tình trạng voucher:</FormSpan>
                    <FormInput
                      type="text"
                      onChange={(e) =>
                        setVouchersModalTinhTrangVouchers(e.target.value)
                      }
                      value={VouchersModalTinhTrangVouchers}
                    />
                  </ModalFormItem>
                </div>
                <div style={{ display: "flex" }}>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Dùng được cho đơn hàng từ:</FormSpan>
                    <FormInput
                      type="text"
                      onChange={(e) => setVouchersModalDieuKienVouchers(e.target.value)}
                      value={VouchersModalDieuKienVouchers}
                    />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Ngày tạo voucher:</FormSpan>
                    <FormInput
                      type="date"
                      onChange={(e) => setVouchersModalNgayTaoVouchers(e.target.value)}
                      value={VouchersModalNgayTaoVouchers}
                    />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Ngày hết hạn voucher:</FormSpan>
                    <FormInput
                      type="date"
                      onChange={(e) => setVouchersModalNgayHetHanVouchers(e.target.value)}
                      value={VouchersModalNgayHetHanVouchers}
                    />
                  </ModalFormItem>
                </div>
                <div style={{ display: "flex" }}>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Giá voucher giảm được:</FormSpan>
                    <FormInput
                      type="text"
                      onChange={(e) =>
                        setVouchersModalGiaVouchers(e.target.value)
                      }
                      value={VouchersModalGiaVouchers}
                    />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Số lượng voucher:</FormSpan>
                    <FormInput
                      type="number"
                      min="1"
                      onChange={(e) =>
                        setVouchersModalSoLuongVouchers(e.target.value)
                      }
                      value={VouchersModalSoLuongVouchers}
                    />
                  </ModalFormItem>
                </div>
                <div style={{ display: "flex" }}>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Mô tả voucher:</FormSpan>
                    <FormTextArea
                      rows="4"
                      cols="50"
                      onChange={(e) => setVouchersModalMoTaVouchers(e.target.value)}
                      placeholder="Nhập vào mô tả của vouchers"
                      value={VouchersModalMoTaVouchers}
                    />
                  </ModalFormItem>
                </div>
              </ModalForm>
              <ButtonUpdate>
                <ButtonContainer>
                  <ButtonClick
                    onClick={() => {
                      handleCapNhatVouchers({
                        mavoucher: VouchersModalMaVouchers,
                        codevouchermoi: VouchersModalCodeVouchers,
                        tenvouchermoi: VouchersModalTenVouchers,
                        dieukienvouchermoi: VouchersModalDieuKienVouchers,
                        soluongvouchermoi: VouchersModalSoLuongVouchers,
                        tinhtrangvouchermoi: VouchersModalTinhTrangVouchers,
                        motavouchermoi: VouchersModalMoTaVouchers,
                        giavouchermoi: VouchersModalGiaVouchers,
                        ngaytaovouchermoi: VouchersModalNgayTaoVouchers,
                        ngayhethanvouchermoi: VouchersModalNgayHetHanVouchers,
                      });
                    }}
                  >
                    Cập nhật
                  </ButtonClick>
                </ButtonContainer>
                <ButtonContainer>
                  <ButtonClick onClick={() => handleCloseUpdate()}>
                    Hủy bỏ
                  </ButtonClick>
                </ButtonContainer>
              </ButtonUpdate>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => handleCloseUpdate()}
              >
                <CloseOutlined />
              </CloseModalButton>
            </ThemNhanVienWrapper>
          </Background>
        ) : null}
      </>
    );
  }
  // // =============== Xóa vouchers ===============
  if (type === "xoavouchers") {
    return (
      <>
        {showModal ? (
          <Background ref={modalRef} onClick={closeModal}>
            <ModalWrapper
              showModal={showModal}
              style={{
                backgroundImage: `url("https://img.freepik.com/free-vector/alert-safety-background_97886-3460.jpg?w=1060")`,
                backgroundPosition: `center center`,
                backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`,
                width: `600px`,
                height: `400px`,
              }}
            >
              <ModalContent>
                <h2>
                  Bạn muốn xóa vouchers có mã{" "}
                  <span style={{ color: `var(--color-primary)` }}>
                    {vouchers.mavoucher}
                  </span>{" "}
                  này?
                </h2>
                <p>
                  Thông tin vouchers không thể khôi phục. Bạn có chắc chắn?
                </p>
                <Button>
                  <ButtonContainer>
                    <ButtonClick
                      onClick={() => {
                        handleXoaVouchers({ mavoucher: vouchers.mavoucher });
                      }}
                    >
                      Đồng ý
                    </ButtonClick>
                  </ButtonContainer>
                  <ButtonContainer>
                    <ButtonClick onClick={() => setShowModal((prev) => !prev)}>
                      Hủy bỏ
                    </ButtonClick>
                  </ButtonContainer>
                </Button>
              </ModalContent>
              <CloseModalButton
                aria-label="Close modal"
                onClick={() => setShowModal((prev) => !prev)}
              >
                <CloseOutlined />
              </CloseModalButton>
            </ModalWrapper>
          </Background>
        ) : null}
      </>
    );
  }
};

export default Modal;
