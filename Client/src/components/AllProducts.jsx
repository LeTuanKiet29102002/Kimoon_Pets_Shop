import { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "../css/main.css";
import { mobile } from "../responsive";

const Container = styled.div`
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ContainerAllProducts = styled.div`
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

//Custom Filter product

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 30px;
`;

const Filter = styled.div`
  margin: 20px;
  display: flex;
  width: 268px;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-right: 8px;
  min-width: 128px;
  ${mobile({ marginRight: "0px" })}
`;

const FilterTextLoc = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-right: 8px;
  min-width: 145px;
  ${mobile({ marginRight: "0px" })}
`;

// const Select = styled.select`
//   padding: 10px;
//   margin-right: 20px;
//   border-radius: 5px;
//   box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
//   ${mobile({ margin: "10px 0px" })}
// `;

const Option = styled.option`
  padding: 8px;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
`;

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [Filteredproducts, setFilteredProducts] = useState([]);
  const [sort, setSort] = useState("");
  const [filters, setFilters] = useState({
    tenthucung: "",
    gioitinhthucung: "",
  });
  useEffect(() => {
    const getProducts = async () => {
      try {
        let url = "http://localhost:3001/api/products";

        const res = await axios.get(url);
        setProducts(res.data);
        console.log("checkinggg", res.data);
      } catch (err) {
        console.log("Loi gi roi");
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(
      products.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          value ? item[key].includes(value) : true
        )
      )
    );
  }, [products, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  useEffect(() => {
    let sortedProducts = [...products];
    if (sort === "moinhat") {
      sortedProducts.sort((a, b) => b.mathucung - a.mathucung);
    } else if (sort === "tangdan") {
      sortedProducts.sort((a, b) => a.giamgia - b.giamgia);
    } else if (sort === "giamdan") {
      sortedProducts.sort((a, b) => b.giamgia - a.giamgia);
    }
    setFilteredProducts(sortedProducts);
  }, [sort, products]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((item) =>
        Object.entries(filters).every(([key, value]) =>
          value ? item[key].includes(value) : true
        )
      )
    );
  }, [products, filters]);

  // PHÂN TRANG

  const [pageNumber, setPageNumber] = useState(0);

  const productPerPage = 20;
  const pageVisited = pageNumber * productPerPage;

  const displayProducts = Filteredproducts.slice(
    pageVisited,
    pageVisited + productPerPage
  ).map((item, index) => {
    return (
      <Link to={`/product/${item.mathucung}`}>
        <Product item={item} key={item.mathucung ? item.mathucung : index} />
      </Link>
    );
  });

  const pageCount = Math.ceil(Filteredproducts.length / productPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <>
      {/* <Container> */}
      <FilterContainer>
        <Filter>
          <FilterTextLoc>Bộ lọc thú cưng:</FilterTextLoc>
          {/* <Select name="tenthucung" onChange={handleFilterChange}>
              <Option disabled>Tên thú cưng</Option>
              <Option value="">Tất cả</Option>
            </Select> */}
          {/* <Select name="gioitinhthucung" onChange={handleFilterChange}>
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
              onChange={handleFilterChange}
              name="gioitinhthucung"
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value="Đực">Đực</MenuItem>
              <MenuItem value="Cái">Cái</MenuItem>
            </Select>
          </FormControl>
        </Filter>
        <Filter>
          <FilterText>Sắp xếp theo:</FilterText>
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
              label="Giá"
              onChange={(e) => setSort(e.target.value)}
            >
              <MenuItem value="moinhat">Mới nhất</MenuItem>
              <MenuItem value="tangdan">Tăng dần</MenuItem>
              <MenuItem value="giamdan">Giảm dần</MenuItem>
            </Select>
          </FormControl>
          {/* </Form> */}
        </Filter>
      </FilterContainer>
      {/* </Container> */}
      <ContainerAllProducts>{displayProducts}</ContainerAllProducts>
      <ReactPaginate
        previousLabel={"PREVIOUS"}
        nextLabel={"NEXT"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        nextClassName={"nextClassName"}
        pageLinkClassName={"pageLinkClassName"}
      />
    </>
  );
};

export default AllProducts;
