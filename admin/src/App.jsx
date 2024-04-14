import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuanLyDanhMuc from "./pages/QuanLyDanhMuc";
import QuanLyThuCung from "./pages/QuanLyThuCung";
import QuanLyDonHang from "./pages/QuanLyDonHang";
import QuanLyKhachHang from "./pages/QuanLyKhachHang";
import QuanLyNhanVien from "./pages/QuanLyNhanVien";
import QuanLyThuCungLac from "./pages/QuanLyThuCungLac";
import { useState } from "react";
import LoginAdmin from "./pages/LoginAdmin";
import { useSelector } from "react-redux";
import NotFound from "./pages/NotFound";
import { DarkModeProvider } from './components/Dashboard/DarkModeContext';

const App = () => {
  // Lấy admin từ Redux
  const admin = useSelector((state) => state.admin.currentAdmin);
  const [isLogin, setIsLogin] = useState(false);
  return (
    <DarkModeProvider>
      <Router>
        <Routes>
          <Route path="/" element={admin ? <Home /> : <LoginAdmin />} />
          <Route path="*" element={<NotFound />} />

          {admin ? (
            admin.machucvu === 5 ? (
              <>
                <Route path="/quanlydanhmuc" element={<QuanLyDanhMuc />} />
                <Route path="/quanlythucung" element={<QuanLyThuCung />} />
                <Route path="/quanlykhachhang" element={<QuanLyKhachHang />} />
                <Route path="/quanlynhanvien" element={<QuanLyNhanVien />} />
                <Route path="/quanlydonhang" element={<QuanLyDonHang />} />
                <Route path="/quanlythucunglac" element={<QuanLyThuCungLac />} />
              </>
            ) : admin.machucvu === 4 ? (
              <>
                <Route path="/quanlydonhang" element={<QuanLyDonHang />} />
              </>
            ) : admin.machucvu === 3 ? (
              <>
                <Route path="/quanlythucung" element={<QuanLyThuCung />} />
                <Route path="/quanlydonhang" element={<QuanLyDonHang />} />
              </>
            ) : admin.machucvu === 2 ? (
              <>
                <Route path="/quanlykhachhang" element={<QuanLyKhachHang />} />
                <Route path="/quanlydonhang" element={<QuanLyDonHang />} />
              </>
            ) : admin.machucvu === 1 ? (
              <>
                <Route path="/quanlythucung" element={<QuanLyThuCung />} />
                <Route path="/quanlydonhang" element={<QuanLyDonHang />} />
              </>
            ) : null
          ) : null}
          {/* <Route path='/quanlydanhmuc' element={<QuanLyDanhMuc />} />
                <Route path='/quanlythucung' element={<QuanLyThuCung />} />
                <Route path='/quanlykhachhang' element={<QuanLyKhachHang />} />
                <Route path='/quanlynhanvien' element={<QuanLyNhanVien />} />
                <Route path='/quanlydonhang' element={<QuanLyDonHang />} /> */}
        </Routes>
      </Router>
    </DarkModeProvider>
  );
};

export default App;
