import {
  LightMode,
  DarkMode,
  ShoppingCart,
  LocalMall,
  Person,
  Add,
} from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import RightTop from "./RightTop";
import axios from "axios";
import format_money from "../../utils";
import Clock from './Clock';
import { CSVLink, CSVDownload } from "react-csv";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import BackupIcon from '@mui/icons-material/Backup';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
// import SupperChart from './SupperChart';



const Container = styled.div`
  margin-top: 1.4rem;
`;

const Info = styled.div``;

const ProfilePhoto = styled.div`
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  overflow: hidden;
`;

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const Small = styled.small``;

// RECENT UPDATES
const RecentUpdates = styled.div`
  margin-top: 1rem;
`;

const H2 = styled.h2`
  margin-bottom: 0.8rem;
`;

const Updates = styled.div`
  background: var(--color-white);
  padding: var(--card-padding);
  border-radius: var(--card-border-radius);
  box-shadow: var(--box-shadow);
  transition: all 300ms ease;
  &:hover {
    box-shadow: none;
  }
`;

const Update = styled.div`
  display: flex;
  grid-template-columns: 2.6rem auto;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Message = styled.div`
    width: 210px;
    height: 42px;
`;

// Sales Analytics
const SalesAnalytics = styled.div`
  margin-top: 2rem;
`;

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
    flex-direction: column;
    /* &:hover {
      background: var(--greyLight-1);
      color: white;
    } */
    & div {
      display: flex;
      justify-items: center;
      gap: 0.6rem;
    }
  }
`;

const Date = styled.div`
  display: inline-block;
  background: var(--color-light);
  border-radius: var(--border-radius-1);
  margin-top: 1rem;
  padding: 0.5rem 1rem;
`;

const InputDate = styled.input`
  background: transparent;
  color: var(--color-dark);
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

const Right = () => {
  // Các state cần thiết
  const [adminLog, setAdminLog] = useState();
  const [soDonHang, setSoDonHang] = useState("");
  const [doanhThuHomNay, setDoanhThuHomNay] = useState("");
  const [donCanDuyetHomNay, setDonCanDuyetHomNay] = useState("");
  const [ngayBatDau, setNgayBatDau] = useState("");
  const [ngayKetThuc, setNgayKetThuc] = useState("");

  const [dataDoanhThuExport, setDataDoanhThuExport] = useState([]);
  const [dataDoanhThuDayExport, setDataDoanhThuDayExport] = useState([]);

  // Export thú cưng
  useEffect(() => {
    const getDoanhThuThuCung = async () => {
      try {
        const doanhthuthucungres = await axios.post("http://localhost:3001/api/products/doanhthu-thucung-phantram", {});
        const listDoanhThuThuCung = doanhthuthucungres.data.doanhthu_thucung;
        console.log("check list thu cung:", listDoanhThuThuCung);

        let result = [['Mã thú cưng', 'Tên thú cưng', 'Số lượng thú cưng còn lại', 'Số lượng thú cưng đã bán', 'Tổng doanh thu', 'Phần trăm doanh thu']];

        listDoanhThuThuCung.forEach((item) => {
          let arr = [];
          arr.push(item.mathucung);
          arr.push(item.tenthucung);
          arr.push(item.soluongthucungconlai || 0); // Đảm bảo hiển thị 0 nếu không có dữ liệu
          arr.push(item.soluongthucungdaban || 0); // Đảm bảo hiển thị 0 nếu không có dữ liệu
          arr.push(item.tongdoanhthu || 0); // Đảm bảo hiển thị 0 nếu không có dữ liệu
          arr.push(`${item.phantramdoanhthu.toFixed(2)}%`); // Chuyển đổi giá trị phần trăm và thêm ký hiệu %
          result.push(arr);
        });

        setDataDoanhThuExport(result);
      } catch (err) {
        console.log("Lỗi lấy thú cưng:", err);
      }
    };

    getDoanhThuThuCung();
  }, []);

  // Export thú cưng theo ngày cụ thể 
  useEffect(() => {
    const getDoanhThuThuCung = async () => {
      if (!ngayBatDau || !ngayKetThuc) return;

      try {
        const doanhthudaythucungres = await axios.post(`http://localhost:3001/api/products/doanhthu-thucung-theo-ngay/${ngayBatDau}/${ngayKetThuc}`);
        const listDoanhThuThuCungDay = doanhthudaythucungres.data.doanhthu_thucung;
        console.log("check list thu cung:", listDoanhThuThuCungDay);

        let result = [['Mã thú cưng', 'Tên thú cưng', 'Số lượng thú cưng còn lại', 'Số lượng thú cưng đã bán', 'Tổng doanh thu', 'Phần trăm doanh thu']];

        listDoanhThuThuCungDay.forEach((item) => {
          let arr = [];
          arr.push(item.mathucung);
          arr.push(item.tenthucung);
          arr.push(item.soluongthucungconlai || 0);
          arr.push(item.soluongthucungdaban || 0);
          arr.push(item.tongdoanhthu || 0);
          arr.push(`${item.phantramdoanhthu.toFixed(2)}%`);
          result.push(arr);
        });

        setDataDoanhThuDayExport(result);
      } catch (err) {
        console.log("Lỗi lấy thú cưng:", err);
      }
    };

    getDoanhThuThuCung();
  }, [ngayBatDau, ngayKetThuc]);

  useEffect(() => {
    const getlog = async () => {
      try {
        const logres = await axios.post(
          "http://localhost:3001/api/user/getAdminLog",
          {}
        );
        console.log("logres: ", logres);
        setAdminLog(logres.data);
      } catch (err) {
        console.log("Lỗi khi lấy adminlog");
      }
    };
    // SỐ ĐƠN HÀNG HÔM NAY
    const getSoDonHangHomNay = async () => {
      try {
        const sodonhanghomnayres = await axios.post(
          "http://localhost:3001/api/products/getSoDonHangHomNay",
          {}
        );
        console.log("sodonhanghomnayres: ", sodonhanghomnayres);
        setSoDonHang(sodonhanghomnayres.data[0].soluongdathang);
      } catch (err) {
        console.log("Lỗi khi lấy sodonhanghomnayres");
      }
    };
    // SỐ ĐƠN HÀNG HÔM NAY
    const getDoanhThuHomNay = async () => {
      try {
        const doanhthuhomnayres = await axios.post(
          "http://localhost:3001/api/products/getDoanhThuHomNay",
          {}
        );
        console.log("doanhthuhomnayres: ", doanhthuhomnayres);
        setDoanhThuHomNay(
          format_money(doanhthuhomnayres.data[0].tongtien.toString())
        );
      } catch (err) {
        console.log("Lỗi khi lấy doanhthuhomnayres");
      }
    };
    // SỐ ĐƠN HÀNG HÔM NAY
    const getDonCanDuyetuHomNay = async () => {
      try {
        const doncanduyetres = await axios.post(
          "http://localhost:3001/api/products/getDonCanDuyetuHomNay",
          {}
        );
        console.log("doncanduyetres: ", doncanduyetres);
        setDonCanDuyetHomNay(doncanduyetres.data[0].sodonchoduyet);
      } catch (err) {
        console.log("Lỗi khi lấy doncanduyetres");
      }
    };
    getlog();
    getSoDonHangHomNay();
    getDoanhThuHomNay();
    getDonCanDuyetuHomNay();
    return () => {
      setSoDonHang("");
    };
  }, []);
  return (
    <Container>
      <RightTop />
      {/* END OF TOP */}

      <RecentUpdates>
        <H2>Recent Updates</H2>
        <Updates>
          {adminLog
            ? adminLog.map((log, key) => {
              return (
                <Update>
                  <ProfilePhoto>
                    <Img src={log.hinhdaidien} />
                  </ProfilePhoto>
                  <Message>
                    {/* <p><b>Monkey D Luffy</b> received his order of Tuan Kiet tech GPS drone</p> */}
                    <p>{log.noidunglog}</p>
                    <Small className="text-muted">2 Minutes Ago</Small>
                  </Message>
                </Update>
              );
            })
            : null}
        </Updates>
      </RecentUpdates>
      {/* END OF RECENT UPDATES */}

      <SalesAnalytics>
        <H2>Sales Analytics</H2>
        <Item className="online">
          <Icon>
            <ShoppingCart />
          </Icon>
          <ItemRight>
            <Info>
              <h3>ĐƠN ĐÃ ĐẶT</h3>
              <small className="text-muted">Last 24 Hours</small>
            </Info>
            <h5 className="success">+39%</h5>
            <h3>{soDonHang === "" ? "Chưa có" : soDonHang}</h3>
          </ItemRight>
        </Item>
        <Item className="offline">
          <Icon>
            <LocalMall />
          </Icon>
          <ItemRight>
            <Info>
              <h3>TỔNG DOANH THU</h3>
              <small className="text-muted">Last 24 Hours</small>
            </Info>
            <h5 className="danger">-17%</h5>
            <h3>
              {doanhThuHomNay === "" ? "0" : doanhThuHomNay}{" "}
              <span style={{ textDecoration: "underline" }}>
                <b>đ</b>
              </span>
            </h3>
          </ItemRight>
        </Item>
        <Item className="customers">
          <Icon>
            <Person />
          </Icon>
          <ItemRight>
            <Info>
              <h3>ĐƠN CẦN DUYỆT</h3>
              <small className="text-muted">Last 24 Hours</small>
            </Info>
            <h5 className="success">+25%</h5>
            <h3>{donCanDuyetHomNay === "" ? "Chưa có" : donCanDuyetHomNay}</h3>
          </ItemRight>
        </Item>
        <Item className="add-product">
          <h3>Xuất ra doanh thu chi tiết thú cưng <strong style={{ color: "green" }}>theo ngày</strong></h3>
          <div>
            <label>
              Ngày bắt đầu:
              <Date>
                <InputDate
                  type="date"
                  value={ngayBatDau}
                  onChange={(e) => setNgayBatDau(e.target.value)}
                />
              </Date>
            </label>
            <label>
              Ngày kết thúc:
              <Date>
                <InputDate
                  type="date"
                  value={ngayKetThuc}
                  onChange={(e) => setNgayKetThuc(e.target.value)}
                />
              </Date>
            </label>
          </div>
          <Stack direction="row" spacing={2} mx={7}>
            <CSVLink
              data={dataDoanhThuDayExport}
              filename={"ChiTietDoanhThuThuCungTheoNgay.csv"}
            >
              <StyledMuiButton
                variant="outlined"
                color="success"
                startIcon={<CloudDownloadIcon />}
              >
                Export
              </StyledMuiButton>
            </CSVLink>
          </Stack>
          <h3>Xuất ra <strong style={{ color: "green" }}>tổng</strong> doanh thu chi tiết tất cả thú cưng</h3>
          <Stack direction="row" spacing={2} mx={7}>
            {/* <Button variant="contained" color="success"><CloudDownloadIcon />Export</Button>
          <Button variant="contained" color="warning"><BackupIcon />Import</Button> */}
            <CSVLink data={dataDoanhThuExport}
              filename={"ChiTietTongDoanhThuThuCung.csv"}
            // asyncOnClick={true}
            // onClick={getThuCungExport}
            >
              <StyledMuiButton variant="outlined" color="success" startIcon={<CloudDownloadIcon />}>
                Export
              </StyledMuiButton>
            </CSVLink>
          </Stack>
          {/* <SupperChart/> */}
        </Item>
      </SalesAnalytics>
    </Container>
  );
};

export default Right;
