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
      setHinhAnhMoi([]); //Modal thêm vouchers khi tắt sẽ xóa mảng hình
      setMangQuanHuyen([]); //Làm rỗng mảng Quận huyện
      setMangXaPhuongThiTran([]); //Làm rỗng mảng Phường xã
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        // setthuCungModalHinhAnh([]); //Modal chi tiết vouchers khi tắt sẽ xóa mảng hình
        setHinhAnhMoi([]); //Modal thêm vouchers khi tắt sẽ xóa mảng hình
        setMangQuanHuyen([]); //Làm rỗng mảng Quận huyện
        setMangXaPhuongThiTran([]); //Làm rỗng mảng Phường xã
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  // =============== Xử lý cập nhật vouchers ===============
  const handleCapNhatThuLac = async ({
    mathulac,
    tenthulacmoi,
    trangthaithucungmoi,
    dacdiemmoi,
    maxamoi,
    hotenlienhemoi,
    emaillienhemoi,
    sdtlienhemoi,
    diachilienhemoi,
    ngaytaomoi,
    hinhanhthulacmoi,
    hinhanhthulacmoichange,
  }) => {
    console.log("Đầu vào Cập nhật vouchers:", {
      mathulac,
      tenthulacmoi,
      trangthaithucungmoi,
      dacdiemmoi,
      maxamoi,
      hotenlienhemoi,
      emaillienhemoi,
      sdtlienhemoi,
      diachilienhemoi,
      ngaytaomoi,
      hinhanhthulacmoi,
      hinhanhthulacmoichange,
    });

    if (
      mathulac !== "" &&
      tenthulacmoi !== "" &&
      trangthaithucungmoi !== "" &&
      dacdiemmoi !== "" &&
      maxamoi !== "" &&
      hotenlienhemoi !== "" &&
      emaillienhemoi !== "" &&
      sdtlienhemoi !== "" &&
      diachilienhemoi !== "" &&
      ngaytaomoi !== "" &&
      hinhanhthulacmoi !== ""
      // && nhanvienmodalhinhanhdaidiennhanvienchange !== ""
    ) {
      try {
        // setthuCungModalHinhAnhChange([]);
        if (hinhanhthulacmoichange !== "") {
          const updatethulacres = await axios.post(
            "http://localhost:3001/api/lostpets/updateThuCungLac",
            {
              mathulac,
              tenthulacmoi,
              trangthaithucungmoi,
              dacdiemmoi,
              maxamoi,
              hotenlienhemoi,
              emaillienhemoi,
              sdtlienhemoi,
              diachilienhemoi,
              ngaytaomoi,
              hinhanhthulacmoi: hinhanhthulacmoichange,
            }
          );
          console.log("KQ trả về update: ", updatethulacres);
          setReRenderData((prev) => !prev); //Render lại csdl ở Compo cha là - ThuCungMain & ThuCungRight.jsx
          setShowModal((prev) => !prev);
          handleClose();
          const dataShow = {
            message: "Thay đổi vouchers có mã " + mathulac + " thành công!",
            type: "success",
          };
          showToastFromOut(dataShow);
          setthuLacModalHinhAnhThuLacChange([]);
        } else {
          const updatethulacres = await axios.post(
            "http://localhost:3001/api/lostpets/updateThuCungLac",
            {
              mathulac,
              tenthulacmoi,
              trangthaithucungmoi,
              dacdiemmoi,
              maxamoi,
              hotenlienhemoi,
              emaillienhemoi,
              sdtlienhemoi,
              diachilienhemoi,
              ngaytaomoi,
              hinhanhthulacmoi: hinhanhthulacmoi,
            }
          );
          console.log("KQ trả về update: ", updatethulacres);
          setReRenderData((prev) => !prev); //Render lại csdl ở Compo cha là - ThuCungMain & ThuCungRight.jsx
          setShowModal((prev) => !prev);
          handleClose();
          const dataShow = {
            message: "Thay đổi vouchers có mã " + mathulac + " thành công!",
            type: "success",
          };
          showToastFromOut(dataShow);
          // setthuCungModalHinhAnh([]);
        }
      } catch (err) {
        setReRenderData((prev) => !prev); //Render lại csdl ở Compo cha là - ThuCungMain & ThuCungRight.jsx
        setShowModal((prev) => !prev);
        handleClose();
        const dataShow = {
          message:
            "Thất bại! Không thể cập nhật vouchers có mã " + mathulac,
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
  const [thuLacModal, setthuLacModal] = useState();
  const [thuLacModalTenThuLac, setthuLacModalTenThuLac] = useState();
  const [thuLacModalMaThuLac, setthuLacModalMaThuLac] = useState();
  const [thuLacModalTrangThaiThuCung, setthuLacModalTrangThaiThuCung] = useState();
  const [thuLacModalDacDiem, setthuLacModalDacDiem] = useState();
  const [thuLacModalMaNguoiMua, setthuLacModalMaNguoiMua] = useState();
  const [thuLacModalMaXa, setthuLacModalMaXa] = useState();
  const [thuLacModalHoTenLienHe, setthuLacModalHoTenLienHe] = useState();
  const [thuLacModalEmailLienHe, setthuLacModalEmailLienHe] = useState();
  const [thuLacModalSdtLienHe, setthuLacModalSdtLienHe] = useState();
  const [thuLacModalDiaChiLienHe, setthuLacModalDiaChiLienHe] = useState();
  const [thuLacModalNgayTao, setthuLacModalNgayTao] = useState();
  const [thuLacModalHinhAnhThuLac, setthuLacModalHinhAnhThuLac] = useState([]);
  const [thuLacModalHinhAnhThuLacChange, setthuLacModalHinhAnhThuLacChange] = useState("");

  const [thuLacModalTenXa, setthuLacModalTenXa] = useState();
  const [thuLacModalTenQuanHuyen, setthuLacModalTenQuanHuyen] = useState();
  const [thuLacModalTenThanhPho, setthuLacModalTenThanhPho] = useState();
  const [thuLacModalMaQuanHuyen, setthuLacModalMaQuanHuyen] = useState();
  const [thuLacModalMaThanhPho, setthuLacModalMaThanhPho] = useState();

  //Old
  const [thuLacModalOld, setthuLacModalOld] = useState();
  const [thuLacModalMaThuLacOld, setthuLacModalMaThuLacOld] = useState();
  const [thuLacModalDacDiemOld, setthuLacModalDacDiemOld] = useState();
  const [thuLacModalMaNguoiMuaOld, setthuLacModalMaNguoiMuaOld] = useState();
  const [thuLacModalTenThuLacOld, setthuLacModalTenThuLacOld] = useState();
  const [thuLacModalTrangThaiThuCungOld, setthuLacModalTrangThaiThuCungOld] = useState();
  const [thuLacModalEmailLienHeOld, setthuLacModalEmailLienHeOld] = useState();
  const [thuLacModalHoTenLienHeOld, setthuLacModalHoTenLienHeOld] = useState();
  const [thuLacModalSdtLienHeOld, setthuLacModalSdtLienHeOld] = useState();
  const [thuLacModalDiaChiLienHeOld, setthuLacModalDiaChiLienHeOld] = useState();
  const [thuLacModalNgayTaoOld, setthuLacModalNgayTaoOld] = useState();
  const [thuLacModalHinhAnhThuLacOld, setthuLacModalHinhAnhThuLacOld] = useState("");
  const [thuLacModalTenXaOld, setthuLacModalTenXaOld] = useState();
  const [thuLacModalTenQuanHuyenOld, setthuLacModalTenQuanHuyenOld] = useState();
  const [thuLacModalTenThanhPhoOld, setthuLacModalTenThanhPhoOld] = useState();
  const [thuLacModalMaXaOld, setthuLacModalMaXaOld] = useState();
  const [thuLacModalMaQuanHuyenOld, setthuLacModalMaQuanHuyenOld] = useState();
  const [thuLacModalMaThanhPhoOld, setthuLacModalMaThanhPhoOld] = useState();
  useEffect(() => {
    // setthuCungModalHinhAnh([]);
    // setthuCungModalHinhAnhChange([]);
    setHinhAnhMoi([]);
    const getThuLac = async () => {
      try {
        const thulacres = await axios.post(
          "http://localhost:3001/api/lostpets/findThuCungLacById",
          { mathulac: vouchers.mathulac }
        );
        console.log("check lac:", thulacres);
        setthuLacModal(thulacres.data);
        setthuLacModalMaThuLac(thulacres.data[0].mathulac);
        setthuLacModalTenThuLac(thulacres.data[0].tenthulac);
        setthuLacModalTrangThaiThuCung(thulacres.data[0].trangthaithucung);
        setthuLacModalDacDiem(thulacres.data[0].dacdiem);
        setthuLacModalMaNguoiMua(thulacres.data[0].manguoimua);
        setthuLacModalEmailLienHe(thulacres.data[0].emaillienhe);
        setthuLacModalHoTenLienHe(thulacres.data[0].hotenlienhe);
        setthuLacModalNgayTao(thulacres.data[0].ngaytao);
        setthuLacModalSdtLienHe(thulacres.data[0].sdtlienhe);
        setthuLacModalDiaChiLienHe(thulacres.data[0].diachilienhe);
        setthuLacModalHinhAnhThuLac(thulacres.data[0].hinhanhthulac);
        setthuLacModalTenXa(thulacres.data[0].tenxa);
        setthuLacModalTenQuanHuyen(thulacres.data[0].tenquanhuyen);
        setthuLacModalTenThanhPho(thulacres.data[0].tenthanhpho);
        setthuLacModalMaXa(thulacres.data[0].maxa);
        setthuLacModalMaQuanHuyen(thulacres.data[0].maquanhuyen);
        setthuLacModalMaThanhPho(thulacres.data[0].mathanhpho);

        setthuLacModalOld(thulacres.data);
        setthuLacModalMaThuLacOld(thulacres.data[0].mathulac);
        setthuLacModalTenThuLacOld(thulacres.data[0].tenthulac);
        setthuLacModalTrangThaiThuCungOld(thulacres.data[0].trangthaithucung);
        setthuLacModalDacDiemOld(thulacres.data[0].dacdiem);
        setthuLacModalMaNguoiMuaOld(thulacres.data[0].manguoimua);
        setthuLacModalEmailLienHeOld(thulacres.data[0].emaillienhe);
        setthuLacModalHoTenLienHeOld(thulacres.data[0].hotenlienhe);
        setthuLacModalNgayTaoOld(thulacres.data[0].ngaytao);
        setthuLacModalSdtLienHeOld(thulacres.data[0].sdtlienhe);
        setthuLacModalDiaChiLienHeOld(thulacres.data[0].diachilienhe);
        setthuLacModalHinhAnhThuLacOld(thulacres.data[0].hinhanhthulac);
        setthuLacModalTenXaOld(thulacres.data[0].tenxa);
        setthuLacModalTenQuanHuyenOld(thulacres.data[0].tenquanhuyen);
        setthuLacModalTenThanhPhoOld(thulacres.data[0].tenthanhpho);
        setthuLacModalMaXaOld(thulacres.data[0].maxa);
        setthuLacModalMaQuanHuyenOld(thulacres.data[0].maquanhuyen);
        setthuLacModalMaThanhPhoOld(thulacres.data[0].mathanhpho);
        console.log("Nhân viên modal hahaha: ", thuLacModal);

      } catch (err) {
        console.log("Lỗi lấy vouchers: ", err);
      }
    };
    getThuLac();
  }, [vouchers]);
  console.log("Nhân viên modal: ", thuLacModal);

  // Effect Tỉnh - Huyện - Xã cập nhật
  const [mangTinhThanhPhoUpdate, setMangTinhThanhPhoUpdate] = useState([]);
  const [mangQuanHuyenUpdate, setMangQuanHuyenUpdate] = useState([]);
  const [mangXaPhuongThiTranUpdate, setMangXaPhuongThiTranUpdate] = useState(
    []
  );
  useEffect(() => {
    const getTinhThanhPhoUpdate = async () => {
      const thanhphores = await axios.post(
        "http://localhost:3001/api/lostpets/getTinhThanhPho",
        {}
      );
      setMangTinhThanhPhoUpdate(thanhphores.data);
      console.log("Tỉnh TPUpdate [res]: ", thanhphores.data);
    };
    getTinhThanhPhoUpdate();
  }, []);

  useEffect(() => {
    const getQuanHuyenUpdate = async () => {
      const quanhuyenres = await axios.post(
        "http://localhost:3001/api/lostpets/getQuanHuyen",
        { mathanhpho: thuLacModalMaThanhPho }
      );
      setMangQuanHuyenUpdate(quanhuyenres.data);
      console.log("Quận huyện Update [res]: ", quanhuyenres.data);
    };
    getQuanHuyenUpdate();
  }, [thuLacModalMaThanhPho]);

  useEffect(() => {
    const getXaPhuongThiTranUpdate = async () => {
      const xaphuongthitranres = await axios.post(
        "http://localhost:3001/api/lostpets/getXaPhuongThiTran",
        { maquanhuyen: thuLacModalMaQuanHuyen }
      );
      setMangXaPhuongThiTranUpdate(xaphuongthitranres.data);
      console.log("Xã phường Update res: ", xaphuongthitranres.data);
    };
    getXaPhuongThiTranUpdate();
  }, [thuLacModalMaQuanHuyen]);

  // Thay đổi hình ảnh
  const handleChangeImg = (hinhmoi) => {
    setthuLacModalHinhAnhThuLacChange("");
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
            setthuLacModalHinhAnhThuLacChange(downloadURL);
          } catch (err) {
            console.log("Lỗi cập nhật hình ảnh:", err);
          }
        });
      }
    );
  };

  const handleCloseUpdate = () => {
    // Set lại giá trị cũ sau khi đóng Modal
    // setthuCungModalHinhAnh(thuCungModalHinhAnhOld);

    // setthuLacModalMaThuLac(thuLacModalMaThuLacOld);
    setthuLacModalTenThuLac(thuLacModalTenThuLacOld);
    setthuLacModalTrangThaiThuCung(thuLacModalTrangThaiThuCungOld);
    setthuLacModalDacDiemOld(thuLacModalDacDiemOld);
    setthuLacModalMaNguoiMuaOld(thuLacModalMaNguoiMuaOld);
    setthuLacModalMaXa(thuLacModalMaXaOld);
    setthuLacModalEmailLienHe(thuLacModalEmailLienHeOld);
    setthuLacModalHoTenLienHe(thuLacModalHoTenLienHeOld);
    setthuLacModalNgayTao(thuLacModalNgayTaoOld);
    setthuLacModalSdtLienHe(thuLacModalSdtLienHeOld);
    setthuLacModalDiaChiLienHe(thuLacModalDiaChiLienHeOld);
    setthuLacModalHinhAnhThuLac(thuLacModalHinhAnhThuLacOld);

    setShowModal((prev) => !prev);
    // setHinhAnhMoi([]);  //Đóng modal sẽ xóa mảng hình cũ ở Modal Thêm vouchers
    // setthuCungModalHinhAnhChange([]);
  };

  // =============== Xử lý thêm vouchers ===============
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
  const [hinhAnhMoi, setHinhAnhMoi] = useState(); //Mảng chứa hình ảnh

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
    // Chạy vòng lặp thêm từng hình trong mảng lên firebase rồi lưu vô mảng [hinhAnhMoi] ở modal Thêm vouchers
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
    hinhanhthulacmoi,//Hình đại diện vouchers mới
  }) => {
    console.log("vouchers được thêm mới: ", {
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
      hinhanhthulacmoi, //Hình đại diện vouchers mới
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
        setReRenderData((prev) => !prev); //Render lại csdl ở Compo cha là - DanhMucMain & DanhMucRight.jsx
        setShowModal((prev) => !prev);
        const dataShow = {
          message:
            "Thêm vouchers " + tenthulacmoi + " thành công!",
          type: "success",
        };
        showToastFromOut(dataShow);
        setHinhAnhMoi([]); //Làm rỗng mảng hình
        // setMangQuanHuyen([]);   //Làm rỗng mảng Quận huyện
        // setMangXaPhuongThiTran([]); //Làm rỗng mảng Phường xã
      } catch (err) {
        console.log("Lỗi insert: ", err);
        setReRenderData((prev) => !prev); //Render lại csdl ở Compo cha là - DanhMucMain & DanhMucRight.jsx
        setShowModal((prev) => !prev);
        const dataShow = {
          message: "Đã có lỗi khi thêm vouchers " + tenthulacmoi,
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
        console.log("Mảng trạng thái vouchers: ", trangThaiThuCung);
      } catch (err) {
        console.log("Lỗi lấy trạng thái vouchers: ", err);
      }
    };
    getTrangThaiThuCung();
  }, [vouchers]);

  // State chứa mảng ma nguoi mua
  const [maNguoiMua, setMaNguoiMua] = useState([]);
  useEffect(() => {
    const getMaNguoiMua = async () => {
      try {
        const manguoimuares = await axios.post(
          "http://localhost:3001/api/lostpets/getMaNguoiMua",
          {}
        );
        setMaNguoiMua(manguoimuares.data);
        console.log("Mảng trạng thái vouchers: ", maNguoiMua);
      } catch (err) {
        console.log("Lỗi lấy trạng thái vouchers: ", err);
      }
    };
    getMaNguoiMua();
  }, [vouchers]);

  // =============== Xử lý xóa vouchers ===============
  const handleXoaThuLac = async ({ mathulac }) => {
    if (mathulac !== "") {
      try {
        const deletethulacres = await axios.post(
          "http://localhost:3001/api/lostpets/deleteThuCungLac",
          { mathulac }
        );
        console.log("KQ trả về delete: ", deletethulacres);
        setReRenderData((prev) => !prev); //Render lại csdl ở Compo cha là - DanhMucMain & DanhMucRight.jsx
        setShowModal((prev) => !prev);
        handleClose(); //Đóng thanh tìm kiếm
        const dataShow = {
          message: "Đã xóa vouchers mã " + mathulac + " thành công!",
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
    setHinhAnhMoi([]); //Đóng modal sẽ xóa mảng hình cũ ở Modal Thêm vouchers
    setMangQuanHuyen([]); //Làm rỗng mảng Quận huyện
    setMangXaPhuongThiTran([]); //Làm rỗng mảng Phường xã
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
                    <ImageWrapper>
                      <ChiTietHinhAnh src={vouchers.hinhanhthulac} />
                    </ImageWrapper>
                  </ModalFormItem>
                  <div style={{ display: "flex", flex: "1" }}>
                    <ModalFormItem style={{ flex: "1" }}>
                      <FormSpan>Tên vouchers:</FormSpan>
                      <FormInput
                        type="text"
                        value={vouchers.tenthulac}
                        readOnly
                      />
                    </ModalFormItem>
                    <ModalFormItem style={{ flex: "1" }}>
                      <FormSpan>Ngày tạo:</FormSpan>
                      <FormInput
                        type="text"
                        value={vouchers.ngaytao.substring(0, 10)}
                        readOnly
                      />
                    </ModalFormItem>
                    <ModalFormItem style={{ flex: "1" }}>
                      <FormSpan>Mã người mua:</FormSpan>
                      <FormInput
                        type="text"
                        value={vouchers.manguoimua}
                        readOnly
                      />
                    </ModalFormItem>
                  </div>
                </div>
                <Position style={{ display: "flex", flex: "1" }}>
                  <ModalFormItem style={{ flex: "1", marginLeft: "265px" }}>
                    <FormSpan>Địa chỉ liên hệ:</FormSpan>
                    <FormInput
                      type="text"
                      value={
                        vouchers.diachilienhe +
                        ", " +
                        vouchers.tenxa +
                        ", " +
                        vouchers.tenquanhuyen +
                        ", " +
                        vouchers.tenthanhpho
                      }
                      readOnly
                    />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Email liên hệ:</FormSpan>
                    <FormInput
                      type="text"
                      value={vouchers.emaillienhe}
                      readOnly
                    />
                  </ModalFormItem>
                </Position>
                <PositionTwo
                  style={{
                    display: "flex",
                    flex: "1",
                    marginTop: "15px",
                    marginBottom: "10px",
                  }}
                >
                  <ModalFormItem style={{ flex: "1", marginLeft: "265px" }}>
                    <FormSpan>Mã vouchers:</FormSpan>
                    <FormInput type="text" value={vouchers.mathulac} readOnly />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Trạng thái vouchers:</FormSpan>
                    <FormInput type="text" value={vouchers.tentrangthaithucung} readOnly />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Số điện thoại liên hệ:</FormSpan>
                    <FormInput
                      type="text"
                      value={vouchers.sdtlienhe}
                      readOnly
                    />
                  </ModalFormItem>
                </PositionTwo>
                <PositionThree style={{
                  display: "flex",
                  flex: "1",
                  marginTop: "15px",
                  marginBottom: "10px",
                }}>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Đặc điểm:</FormSpan>
                    <FormTextArea
                      rows="4"
                      cols="50"
                      onChange={(e) => setthuLacModalDacDiem(e.target.value)}
                      placeholder="Nhập vào đặc điểm thị vouchers"
                      value={thuLacModalDacDiem}
                      readOnly
                    />
                  </ModalFormItem>
                </PositionThree>
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
                    <FormSpan>Tên vouchers:</FormSpan>
                    <FormInput
                      type="text"
                      onChange={(e) => setTenThuLacMoi(e.target.value)}
                      placeholder="Tên của vouchers"
                    />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Trạng thái vouchers:</FormSpan>
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
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Ngày tạo:</FormSpan>
                    <FormInput
                      type="date"
                      onChange={(e) => setNgayTaoMoi(e.target.value)}
                    />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Mã người mua:</FormSpan>
                    <FormSelect
                      onChange={(e) => {
                        setMaNguoiMuaMoi(e.target.value);
                      }}
                    >
                      {maNguoiMua.map((item, key) => {
                        return (
                          <FormOption value={item.manguoimua}>
                            {" "}
                            {item.manguoimua}{" "}
                          </FormOption>
                        );
                      })}
                    </FormSelect>
                  </ModalFormItem>
                </div>
                <div style={{ display: "flex" }}>
                  <ModalFormItem style={{ flex: "1" }}>
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
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
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
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
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
                  </ModalFormItem>
                </div>
                <div style={{ display: "flex" }}>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Địa chỉ:</FormSpan>
                    <FormInput
                      type="text"
                      onChange={(e) => setDiaChiLienHeMoi(e.target.value)}
                      placeholder="Địa chỉ liên hệ"
                    />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Email:</FormSpan>
                    <FormInput
                      type="email"
                      onChange={(e) => setEmailLienHeMoi(e.target.value)}
                      placeholder="Email liên hệ"
                    />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Số điện thoại:</FormSpan>
                    <FormInput
                      type="text"
                      onChange={(e) => setSdtLienHeMoi(e.target.value)}
                      placeholder="Số điện thoại liên hệ"
                    />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Họ tên chủ:</FormSpan>
                    <FormInput
                      type="text"
                      onChange={(e) => setHoTenLienHeMoi(e.target.value)}
                      placeholder="Họ tên chủ"
                    />
                  </ModalFormItem>
                </div>
                <div style={{ display: "flex" }}>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Đặc điểm:</FormSpan>
                    <FormTextArea
                      rows="4"
                      cols="50"
                      onChange={(e) => setDacDiemMoi(e.target.value)}
                      placeholder="Nhập vào đặc điểm vouchers"
                      // value={thuLacModalDacDiem}
                    />
                  </ModalFormItem>
                </div>
                <ModalFormItem>
                  {/* <FormSpan>Hình ảnh:</FormSpan> */}
                  <ImageWrapper>
                    {hinhAnhMoi != "" ? ( //Khi mảng hình có hình thì hiện các hình trong mảng
                      <ChiTietHinhAnh src={hinhAnhMoi} />
                    ) : (
                      //Khi mảng hình trống thì hiện No Available Image
                      <ChiTietHinhAnh
                        src={
                          "https://firebasestorage.googleapis.com/v0/b/kiet-kimoonpets.appspot.com/o/No-Image-Placeholder.svg.png?alt=media&token=c656488d-0993-4bd5-8f96-c324277e2f5c"
                        }
                      />
                    )}
                  </ImageWrapper>
                  <FormLabel>
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
                      onChange={(e) => handleShowImg(e.target.files[0])}
                      id="imageInput"
                      style={{ display: "none" }}
                    />
                  </FormLabel>
                </ModalFormItem>
              </ModalForm>
              <ButtonUpdate>
                <ButtonContainer>
                  <ButtonClick
                    onClick={() =>
                      handleThemThuLac({
                        tenthulacmoi: tenThuLacMoi,
                        trangthaithucungmoi: maTrangThaiThuCungMoi,
                        dacdiemmoi: dacDiemMoi,
                        manguoimuamoi: maNguoiMuaMoi,
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
                    <FormSpan>Tên vouchers:</FormSpan>
                    <FormInput
                      type="text"
                      onChange={(e) =>
                        setthuLacModalTenThuLac(e.target.value)
                      }
                      value={thuLacModalTenThuLac}
                    />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Họ tên chủ:</FormSpan>
                    <FormInput
                      type="text"
                      onChange={(e) => setHoTenLienHeMoi(e.target.value)}
                      value={thuLacModalHoTenLienHe}
                    />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Trạng thái vouchers:</FormSpan>
                    <FormSelect
                      onChange={(e) => {
                        setthuLacModalTrangThaiThuCung(e.target.value);
                      }}
                    >
                      {trangThaiThuCung.map((item, key) => {
                        if (item.trangthaithucung === thuLacModalTrangThaiThuCung) {
                          return (
                            <FormOption value={item.trangthaithucung} selected>
                              {" "}
                              {item.tentrangthaithucung}{" "}
                            </FormOption>
                          );
                        } else {
                          return (
                            <FormOption value={item.trangthaithucung}>
                              {" "}
                              {item.tentrangthaithucung}{" "}
                            </FormOption>
                          );
                        }
                      })}
                    </FormSelect>
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Ngày tạo:</FormSpan>
                    <FormInput
                      type="date"
                      onChange={(e) => setthuLacModalNgayTao(e.target.value)}
                      value={thuLacModalNgayTao}
                    />
                  </ModalFormItem>
                </div>
                <div style={{ display: "flex" }}>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Thuộc tỉnh:</FormSpan>
                    <FormSelect
                      onChange={(e) => {
                        setthuLacModalMaThanhPho(e.target.value);
                      }}
                    >
                      <FormOption value="">-- Chọn thành phố --</FormOption>
                      {mangTinhThanhPhoUpdate.map((tinhthanhpho, key) => {
                        if (
                          tinhthanhpho.tenthanhpho === thuLacModalTenThanhPho
                        ) {
                          return (
                            <FormOption
                              value={tinhthanhpho.mathanhpho}
                              selected
                            >
                              {" "}
                              {tinhthanhpho.tenthanhpho}{" "}
                            </FormOption>
                          );
                        } else {
                          return (
                            <FormOption value={tinhthanhpho.mathanhpho}>
                              {" "}
                              {tinhthanhpho.tenthanhpho}{" "}
                            </FormOption>
                          );
                        }
                      })}
                    </FormSelect>
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Thuộc huyện:</FormSpan>
                    <FormSelect
                      onChange={(e) => {
                        setthuLacModalMaQuanHuyen(e.target.value);
                      }}
                    >
                      {mangQuanHuyenUpdate.length > 0 ? (
                        mangQuanHuyenUpdate.map((quanhuyen, key) => {
                          if (
                            quanhuyen.tenquanhuyen === thuLacModalTenQuanHuyen
                          ) {
                            return (
                              <FormOption
                                value={quanhuyen.maquanhuyen}
                                selected
                              >
                                {" "}
                                {quanhuyen.tenquanhuyen}{" "}
                              </FormOption>
                            );
                          } else {
                            return (
                              <FormOption value={quanhuyen.maquanhuyen}>
                                {" "}
                                {quanhuyen.tenquanhuyen}{" "}
                              </FormOption>
                            );
                          }
                        })
                      ) : (
                        <FormOption value="">
                          -- Bạn chưa chọn Thành phố --{" "}
                        </FormOption>
                      )}
                    </FormSelect>
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Thuộc xã:</FormSpan>
                    <FormSelect
                      onChange={(e) => {
                        setthuLacModalMaXa(e.target.value);
                      }}
                    >
                      {mangXaPhuongThiTranUpdate.length > 0 ? (
                        mangXaPhuongThiTranUpdate.map((xaphuong, key) => {
                          if (xaphuong.tenxa === thuLacModalTenXa) {
                            return (
                              <FormOption value={xaphuong.maxa} selected>
                                {" "}
                                {xaphuong.tenxa}{" "}
                              </FormOption>
                            );
                          } else {
                            return (
                              <FormOption value={xaphuong.maxa}>
                                {" "}
                                {xaphuong.tenxa}{" "}
                              </FormOption>
                            );
                          }
                        })
                      ) : (
                        <FormOption value="">
                          -- Bạn chưa chọn Huyện{" "}
                        </FormOption>
                      )}
                    </FormSelect>
                  </ModalFormItem>
                </div>
                <div style={{ display: "flex" }}>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Email:</FormSpan>
                    <FormInput
                      type="email"
                      onChange={(e) => setthuLacModalEmailLienHe(e.target.value)}
                      value={thuLacModalEmailLienHe}
                    />
                  </ModalFormItem>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Số điện thoại:</FormSpan>
                    <FormInput
                      type="text"
                      onChange={(e) => setthuLacModalSdtLienHe(e.target.value)}
                      value={thuLacModalSdtLienHe}
                    />
                  </ModalFormItem>
                </div>
                <div style={{ display: "flex" }}>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Địa chỉ:</FormSpan>
                    <FormInput
                      type="text"
                      onChange={(e) =>
                        setthuLacModalDiaChiLienHe(e.target.value)
                      }
                      value={thuLacModalDiaChiLienHe}
                    />
                  </ModalFormItem>
                </div>
                <div style={{ display: "flex" }}>
                  <ModalFormItem style={{ flex: "1" }}>
                    <FormSpan>Đặc điểm:</FormSpan>
                    <FormTextArea
                      rows="4"
                      cols="50"
                      onChange={(e) => setthuLacModalDacDiem(e.target.value)}
                      placeholder="Nhập vào đặc điểm thị vouchers"
                      value={thuLacModalDacDiem}
                    />
                  </ModalFormItem>
                </div>
                <ModalFormItem>
                  {/* <FormSpan>Hình ảnh:</FormSpan> */}
                  <ImageWrapper>
                    {thuLacModalHinhAnhThuLacChange != "" ? ( //Khi mảng hình có hình thì hiện các hình trong mảng
                      <ChiTietHinhAnh src={thuLacModalHinhAnhThuLacChange} />
                    ) : (
                      //Khi mảng hình trống thì hiện No Available Image
                      <ChiTietHinhAnh src={thuLacModalHinhAnhThuLac} />
                    )}
                  </ImageWrapper>
                  <FormLabel>
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
                      onChange={(e) => handleChangeImg(e.target.files[0])}
                      id="imageInput"
                      style={{ display: "none" }}
                    />
                  </FormLabel>
                </ModalFormItem>
              </ModalForm>
              <ButtonUpdate>
                <ButtonContainer>
                  <ButtonClick
                    // onClick={() => handleCapNhatThuCung({
                    //     mathucung: thucung.mathucung,
                    //     madanhmucmoi: thuCungModalMaDanhMuc,
                    //     tenthucungmoi: thuCungModalTenThuCung,
                    //     gioitinhthucungmoi: thuCungModalGioiTinhThuCung,
                    //     tuoithucungmoi: thuCungModalTuoiThuCung,
                    //     datiemchungmoi: thuCungModalDaTiemChung,
                    //     baohanhsuckhoemoi: thuCungModalBaoHanhSucKhoe,
                    //     tieudemoi: thuCungModalTieuDe,
                    //     motamoi: thuCungModalMoTa,
                    //     ghichumoi: thuCungModalGhiChu,
                    //     soluongmoi: thuCungModalSoLuong,
                    //     giabanmoi: thuCungModalGiaBan,
                    //     giamgiamoi: thuCungModalGiamGia,
                    //     thucungmodalhinganhchange: thuCungModalHinhAnhChange,
                    //     thucungmodalhinhanh: thuCungModalHinhAnh,
                    // })}
                    onClick={() => {
                      handleCapNhatThuLac({
                        mathulac: thuLacModalMaThuLac,
                        tenthulacmoi: thuLacModalTenThuLac,
                        trangthaithucungmoi: thuLacModalTrangThaiThuCung,
                        dacdiemmoi: thuLacModalDacDiem,
                        maxamoi: thuLacModalMaXa,
                        hotenlienhemoi: thuLacModalHoTenLienHe,
                        emaillienhemoi: thuLacModalEmailLienHe,
                        sdtlienhemoi: thuLacModalSdtLienHe,
                        diachilienhemoi: thuLacModalDiaChiLienHe,
                        ngaytaomoi: thuLacModalNgayTao,
                        hinhanhthulacmoi: thuLacModalHinhAnhThuLac,
                        hinhanhthulacmoichange: thuLacModalHinhAnhThuLacChange,
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
                    {vouchers.mathulac}
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
                        handleXoaThuLac({ mathulac: vouchers.mathulac });
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
