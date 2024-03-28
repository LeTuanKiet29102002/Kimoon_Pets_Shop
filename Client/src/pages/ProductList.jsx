import styled from "styled-components";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  display: flex;
  width: 268px;
  align-items: center;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  min-width: 162px;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const FilterTextLoc = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-right: 8px;
  min-width: 128px;
  ${mobile({ marginRight: "0px" })}
`;

// const Select = styled.select`
//   padding: 10px;
//   margin-right: 20px;
//   ${mobile({ margin: "10px 0px" })}
// `;

const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const madanhmuc = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("moinhat");
  const [mangTen, setMangTen] = useState([]);
  const [tenDanhMuc, setTenDanhMuc] = useState("");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };
  console.log(filters, sort);

  useEffect(() => {
    const getTenThuCung = async () => {
      const tenthucungres = await axios.post(
        "http://localhost:3001/api/products/getTenThuCung",
        { madanhmuc: madanhmuc }
      );
      console.log("tenthucungres: ", tenthucungres);
      setMangTen(tenthucungres.data);
      setTenDanhMuc(tenthucungres.data[0].tieudedanhmuc);
    };
    getTenThuCung();
  }, [madanhmuc]);
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>
        Danh mục thú cưng:{" "}
        <span style={{ color: "var(--color-primary)" }}>{tenDanhMuc}</span>
      </Title>
      <FilterContainer >
        <Filter>
          <FilterText>Bộ lọc thú cưng:</FilterText>
          {/* <Select name="tenthucung" onChange={handleFilters}>
            <Option disabled>Tên thú cưng</Option>
            <Option value="">Tất cả</Option>
            {mangTen
              ? mangTen.map((tenthucung, key) => {
                  return (
                    <Option value={tenthucung.tenthucung}>
                      {tenthucung.tenthucung}
                    </Option>
                  );
                })
              : null}
          </Select> */}
          <FormControl fullWidth sx={{ minWidth: 180, mr:2 }}>
            <InputLabel id="demo-simple-select-label">Tên thú cưng</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Tên thú cưng"
              onChange={handleFilters}
              name="tenthucung"
            >
              <MenuItem value="">Tất cả</MenuItem>
              {mangTen
                ? mangTen.map((item, index) => {
                    return (
                      <MenuItem
                        value={item.tenthucung}
                        key={item.mathucung ? item.mathucung : index}
                      >
                        {item.tenthucung}
                      </MenuItem>
                    );
                  })
                : null}
            </Select>
          </FormControl>
          {/* <Select name="gioitinhthucung" onChange={handleFilters}>
            <Option disabled>Giới tính thú cưng</Option>
            <Option value="">Tất cả</Option>
            <Option value="Đực">Đực</Option>
            <Option value="Cái">Cái</Option>
          </Select> */}
          <FormControl fullWidth sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Giới tính"
              onChange={handleFilters}
              name="gioitinhthucung"
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value="Đực">Đực</MenuItem>
              <MenuItem value="Cái">Cái</MenuItem>
            </Select>
          </FormControl>
        </Filter>
        <Filter>
          <FilterTextLoc>Sắp xếp theo:</FilterTextLoc>
          {/* <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="moinhat">Mới nhất</Option>
            <Option value="tangdan">Giá tăng dần</Option>
            <Option value="giamdan">Giá giảm dần</Option>
          </Select> */}
          <FormControl fullWidth sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Giá</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //   value={age}
              label="Giá<"
              onChange={(e) => setSort(e.target.value)}
            >
              <MenuItem value="moinhat">Mới nhất</MenuItem>
              <MenuItem value="tangdan">Tăng dần</MenuItem>
              <MenuItem value="giamdan">Giảm dần</MenuItem>
            </Select>
          </FormControl>
        </Filter>
      </FilterContainer>
      <Products madanhmuc={madanhmuc} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
