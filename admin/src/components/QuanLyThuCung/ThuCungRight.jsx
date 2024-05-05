import styled from "styled-components";
import { Add, CategoryOutlined } from "@mui/icons-material";
import BackupIcon from '@mui/icons-material/Backup';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import RightTop from "../Dashboard/RightTop";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import Toast from "./Toast";
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse";

const Container = styled.div`
  margin-top: 1.4rem;
`;

// Sales Analytics
const SalesAnalytics = styled.div`
  margin-top: 2rem;
`;

const H2 = styled.h2`
  margin-bottom: 0.8rem;
`;

const Info = styled.div``;

const Icon = styled.div`
  padding: 0.6rem;
  color: var(--color-white);
  border-radius: 50%;
  background: var(--color-primary);
  display: flex;
`;

const Item = styled.div`
  background: var(--color-white);
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.7rem;
  padding: 1.4rem var(--card-padding);
  border-radius: var(--border-radius-3);
  box-shadow: var(--box-shadow);
  transition: all 300ms ease;
  &:hover {
    box-shadow: none;
  }
  &.offline ${Icon} {
    background: var(--color-danger);
  }
  &.customers ${Icon} {
    background: var(--color-success);
  }
  &.add-product {
    background-color: transparent;
    border: 2px dashed var(--color-primary);
    color: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background: var(--color-primary);
      color: white;
      cursor: pointer;
    }
    & div {
      display: flex;
      justify-items: center;
      gap: 0.6rem;
    }
  }
`;

const ItemRight = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin: 0;
  width: 100%;
`;

const StyledMuiButton = styled(Button)`
  && {

    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);

  }
  &:hover {
    box-shadow: 0px 4px 10px #00000000;

  }
`;

const ThuCungRight = ({ reRenderData, setReRenderData }) => {
  // Lấy admin từ Redux
  const admin = useSelector((state) => state.admin.currentAdmin);


  // Thứ ngày tháng
  let today = new Date();
  let todayday = today.getDay();
  let thu;
  switch (todayday) {
    case 1:
      thu = "hai";
      break;
    case 2:
      thu = "ba";
      break;
    case 3:
      thu = "tư";
      break;
    case 4:
      thu = "năm";
      break;
    case 5:
      thu = "sáu";
      break;
    case 6:
      thu = "bảy";
      break;
    case 7:
      thu = "chủ nhật";
      break;
    default:
      thu = "chủ nhật";
  }
  let ngaythangnam =
    "Thứ " +
    thu +
    ", " +
    today.getDate() +
    "/" +
    (today.getMonth() + 1) +
    "/" +
    today.getFullYear();

  // Số lượng thú cưng
  const [soLuongThuCung, setSoLuongThuCung] = useState();
  useEffect(() => {
    const getSoLuongThuCung = async () => {
      try {
        const soluongthucungres = await axios.get(
          "http://localhost:3001/api/products/getSoLuongThuCung"
        );
        setSoLuongThuCung(soluongthucungres.data[0].soluongthucung);
      } catch (err) {
        console.log("Lỗi: ", err);
      }
    };
    getSoLuongThuCung();
  }, [reRenderData]);
  console.log("Số lượng thú cưng: ", soLuongThuCung);

  // ===== Modal =====
  const [showModal, setShowModal] = useState(false);
  const [typeModal, setTypeModal] = useState("");

  const openModal = (modal) => {
    setShowModal((prev) => !prev);
    setTypeModal(modal.type);
  };

  // ===== TOAST =====
  const [dataToast, setDataToast] = useState({
    message: "alo alo",
    type: "success",
  });
  const toastRef = useRef(null); // useRef có thể gọi các hàm bên trong của Toast
  // bằng các dom event, javascript, ...

  const showToastFromOut = (dataShow) => {
    console.log("showToastFromOut da chay", dataShow);
    setDataToast(dataShow);
    toastRef.current.show();
  };

  // const getThuCungExport = async (event, done) => {
  //   try {
  //     let result = [];

  //     const thucungres = await axios.post("http://localhost:3001/api/products/getThuCung", {});
  //     const listThuCung = thucungres.data;
  //     setDataExport(listThuCung);
  //     console.log("check list thu cung ; ", listThuCung);
  //     result.push('Mã thú cưng', "Tên danh mục", "Tên thú cưng", "Hình ảnh", "Số lượng", "Giá bán", "Giảm giá");
  //     listThuCung.map((item, index) => {
  //       let arr = [];
  //       arr[0] = item.mathucung;
  //       arr[1] = item.tendanhmuc;
  //       arr[2] = item.tenthucung;
  //       arr[3] = item.hinhanh;
  //       arr[4] = item.soluong;
  //       arr[5] = item.giaban;
  //       arr[6] = item.giamgia;
  //       result.push(arr);
  //     })
  //     console.log("check kiet ; ", result);
  //     // setDataExport(result);
  //     console.log("check kiet data ; ", dataExport);
  //     done();
  //   } catch (err) {
  //     console.log("Lỗi lấy thú cưng csv: ", err);
  //   }
  // }

  const [thucungright, setThuCungRight] = useState([]);
  const [dataExport, setDataExport] = useState([]);

  //Export thu cung

  useEffect(() => {
    const getThuCung = async () => {
      try {
        const thucungres = await axios.post("http://localhost:3001/api/products/getThuCung", {});
        const listThuCung = thucungres.data;
        console.log("check list thu cung ; ", listThuCung);

        let result = [['Mã thú cưng', "Tên danh mục", "Tên thú cưng", "Hình ảnh", "Số lượng", "Giá bán", "Giảm giá"]];

        listThuCung.forEach((item) => {
          let arr = [];
          arr.push(item.mathucung);
          arr.push(item.tendanhmuc);
          arr.push(item.tenthucung);
          arr.push(item.hinhanh);
          arr.push(item.soluong);
          arr.push(item.giaban);
          arr.push(item.giamgia);
          result.push(arr);
        });

        setDataExport(result);
      } catch (err) {
        console.log("Lỗi lấy thú cưng: ", err);
      }
    }

    getThuCung();
  }, [reRenderData]);


  //Import csv thu cung
  const handleImportCSV = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type !== "text/csv") {
        alert("File không đúng định dạng");
        return;
      }
      console.log("check file upload:", file);
      // Parse local CSV file
      Papa.parse(file, {
        // header: true,
        complete: function (results) {
          let rawCSV = results.data;
          console.log("checkk rawCSV:", rawCSV);
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 7) {
              if (rawCSV[0][0] !== "mathucung"
                || rawCSV[0][1] !== "tendanhmuc"
                || rawCSV[0][2] !== "tenthucung"
                || rawCSV[0][3] !== "hinhanh"
                || rawCSV[0][4] !== "soluong"
                || rawCSV[0][5] !== "giaban"
                || rawCSV[0][6] !== "giamgia") {
                alert("File không có dữ liệu sai định dạng tiêu đề!");


              } else {
                let result = [];
                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 7) {
                    let obj = {};
                    obj.mathucung = item[0]
                    obj.tendanhmuc = item[1]
                    obj.tenthucung = item[2]
                    obj.hinhanh = item[3]
                    obj.soluong = item[4]
                    obj.giaban = item[5]
                    obj.giamgia = item[6]
                    result.push(obj)

                  }
                })
                setThuCungRight(result)
                console.log("checkk result: ", thucungright);

              }
            } else {
              alert("File không có dữ liệu sai định dạng!");
              return;
            }
          } else {
            alert("File không có dữ liệu!");
            return;
          }
          console.log("Finished:", results.data);
        }
      });

    }

  }
  useEffect(() => {
    console.log("checkk right result: ", thucungright);
  }, [thucungright]);


  const values = [true, 'sm-down', 'md-down', 'lg-down', 'xl-down', 'xxl-down'];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <Container>
      <RightTop />
      <SalesAnalytics>
        <H2>Pets Analytics</H2>
        <Item className="online">
          <Icon>
            <CategoryOutlined />
          </Icon>
          <ItemRight>
            <Info>
              <h3>SỐ LƯỢNG LOẠI THÚ CƯNG</h3>
              <small className="text-muted">{ngaythangnam}</small>
            </Info>
            <h3 className="success" style={{ fontSize: "1.2rem" }}>
              {soLuongThuCung}
            </h3>
          </ItemRight>
        </Item>
        {admin ? (
          // Chỉ admin với nv bán hàng mới được thêm thú cưng
          admin.machucvu === 5 || admin.machucvu === 1 ? (
            <>
              <Item
                className="add-product"
                onClick={() => openModal({ type: "themthucung" })}
              >
                <Add />
                <h3>Thêm thú cưng</h3>
              </Item>
            </>
          ) : null
        ) : null}
        <Stack direction="row" spacing={2} mx={7}>
          {/* <Button variant="contained" color="success"><CloudDownloadIcon />Export</Button>
          <Button variant="contained" color="warning"><BackupIcon />Import</Button> */}
          <CSVLink data={dataExport}
            filename={"DanhSachThuCung.csv"}
          // asyncOnClick={true}
          // onClick={getThuCungExport}
          >
            <StyledMuiButton variant="outlined" color="success" startIcon={<CloudDownloadIcon />}>
              Export
            </StyledMuiButton>
          </CSVLink>
          <input id="import" type="file" hidden onChange={(event) => handleImportCSV(event)} />
          <label>
            <StyledMuiButton variant="outlined" color="warning" endIcon={<BackupIcon />}>
              <label htmlFor="import">
                Import
              </label>
            </StyledMuiButton>

          </label>
        </Stack>
        {/* <Item className="add-product"
                    onClick={() => openModal({ type: "themthucung" })}
                >
                    <Add />
                    <h3>Thêm thú cưng</h3>
                </Item> */}
      </SalesAnalytics>

      {/* ==== MODAL ==== */}
      <Modal
        showModal={showModal} //state Đóng mở modal
        setShowModal={setShowModal} //Hàm Đóng mở modal
        type={typeModal} //Loại modal
        setReRenderData={setReRenderData} //Hàm rerender khi dữ liệu thay đổi
        showToastFromOut={showToastFromOut} //Hàm Hiện toast
      />

      {/* ==== TOAST ==== */}
      <Toast
        ref={toastRef}
        dataToast={dataToast} // Thông tin cần hiện lên: Đối tượng { message,type }
      />
    </Container>
  );
};

export default ThuCungRight;
