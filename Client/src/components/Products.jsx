import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { popularProducts } from "../data";
import CardProduct from "./CardProduct";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "../css/main.css";
import { mobile } from "../responsive";

const Container = styled.div`
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

//Custom Filter product

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;

const Option = styled.option``;

const Products = ({ madanhmuc, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [Filteredproducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        let url = "http://localhost:3001/api/products";
        if (madanhmuc) {
          url += `/madanhmuc=${madanhmuc}`;
        }
        const res = await axios.get(url);
        setProducts(res.data);
        console.log("checkinggg", res.data);
      } catch (err) {
        console.log("Loi gi roi");
      }
    };
    getProducts();
  }, [madanhmuc]);

  useEffect(() => {
    madanhmuc &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, madanhmuc, filters]);

  useEffect(() => {
    if (sort === "moinhat") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.mathucung - a.mathucung)
      );
    } else if (sort === "tangdan") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.giamgia - b.giamgia)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.giamgia - a.giamgia)
      );
    }
  }, [sort]);

  console.log(madanhmuc, filters, sort);

  // PHÂN TRANG

  const [pageNumber, setPageNumber] = useState(0);

  const productPerPage = 10;
  const pageVisited = pageNumber * productPerPage;

  const displayProducts = Filteredproducts.slice(
    pageVisited,
    pageVisited + productPerPage
  ).map((item) => {
    return (
      <Link to={`/product/${item.mathucung}`}>
        <CardProduct item={item} key={item.mathucung} />
      </Link>
    );
  });

  const pageCount = Math.ceil(Filteredproducts.length / productPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    // <Container>
    //     {
    //         tendanhmuc
    //         ? Filteredproducts.map(item => (
    //             <Link
    //                 to={`/product/${item.mathucung}`}>
    //                 <Product item={item} key={item.mathucung} />
    //             </Link>
    //         ))
    //         : products.slice(0,10).map(item => (
    //             <Link
    //                 to={`/product/${item.mathucung}`}>
    //                 <Product item={item} key={item.mathucung} />
    //             </Link>
    //         ))
    //     }
    // </Container>
    <>
      <Container>
        {/* <FilterContainer>
          <Filter>
            <FilterText>Bộ lọc thú cưng:</FilterText>
            <Select name="tenthucung" onChange={handleFilters}>
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
            </Select>
            <Select name="gioitinhthucung" onChange={handleFilters}>
              <Option disabled>Giới tính thú cưng</Option>
              <Option value="">Tất cả</Option>
              <Option value="Đực">Đực</Option>
              <Option value="Cái">Cái</Option>
            </Select>
          </Filter>
          <Filter>
            <FilterText>Sắp xếp theo:</FilterText>
            <Select onChange={(e) => setSort(e.target.value)}>
              <Option value="moinhat">Mới nhất</Option>
              <Option value="tangdan">Giá tăng dần</Option>
              <Option value="giamdan">Giá giảm dần</Option>
            </Select>
          </Filter>
        </FilterContainer> */}
        {madanhmuc ? displayProducts : <></>}
      </Container>
      {madanhmuc ? (
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
      ) : (
        <></>
      )}
    </>
  );
};

export default Products;

// import { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import styled from "styled-components";
// import Product from "./Product";
// import axios from "axios";
// import ReactPaginate from "react-paginate";
// import { mobile } from "../responsive";

// const Container = styled.div`
//   padding: 30px;
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
// `;

// const FilterContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// const Filter = styled.div`
//   margin: 20px;
//   ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
// `;

// const FilterText = styled.span`
//   font-size: 20px;
//   font-weight: 600;
//   margin-right: 20px;
//   ${mobile({ marginRight: "0px" })}
// `;

// const Select = styled.select`
//   padding: 10px;
//   margin-right: 20px;
//   ${mobile({ margin: "10px 0px" })}
// `;

// const Option = styled.option``;

// const Products = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [sort, setSort] = useState("");
//   const [pageNumber, setPageNumber] = useState(0);
//   const [filters, setFilters] = useState({
//     tenthucung: "",
//     gioitinhthucung: "",
//   });

//   const location = useLocation();

//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:3001/api/products" + location.search
//         );
//         setProducts(res.data);
//       } catch (err) {
//         console.log("Loi gi roi");
//       }
//     };
//     getProducts();
//   }, [location.search]);

//   useEffect(() => {
//     let sortedProducts = [...products];
//     if (sort === "moinhat") {
//       sortedProducts.sort((a, b) => b.mathucung - a.mathucung);
//     } else if (sort === "tangdan") {
//       sortedProducts.sort((a, b) => a.giamgia - b.giamgia);
//     } else if (sort === "giamdan") {
//       sortedProducts.sort((a, b) => b.giamgia - a.giamgia);
//     }
//     setFilteredProducts(sortedProducts);
//   }, [sort, products]);

//   useEffect(() => {
//     setFilteredProducts(
//       products.filter((item) =>
//         Object.entries(filters).every(([key, value]) =>
//           value ? item[key].includes(value) : true
//         )
//       )
//     );
//   }, [products, filters]);

//   const handleFilters = (e) => {
//     const { name, value } = e.target;
//     setFilters({ ...filters, [name]: value });
//   };

//   const handlePageChange = ({ selected }) => {
//     setPageNumber(selected);
//   };

//   const productsPerPage = 10;
//   const pageVisited = pageNumber * productsPerPage;

//   const displayProducts = filteredProducts
//     .slice(pageVisited, pageVisited + productsPerPage)
//     .map((item) => (
//       <Link to={`/product/${item.mathucung}`} key={item.mathucung}>
//         <Product item={item} />
//       </Link>
//     ));

//   const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

//   return (
//     <>
//       <Container>
//         <FilterContainer>
//           <Filter>
//             <FilterText>Bộ lọc thú cưng:</FilterText>
//             <Select name="tenthucung" onChange={handleFilters}>
//               <Option disabled selected value="">
//                 Tên thú cưng
//               </Option>
//               <Option value="">Tất cả</Option>
//               {/* Thêm options từ dữ liệu hoặc cơ sở dữ liệu của bạn */}
//             </Select>
//             <Select name="gioitinhthucung" onChange={handleFilters}>
//               <Option disabled selected value="">
//                 Giới tính thú cưng
//               </Option>
//               <Option value="">Tất cả</Option>
//               <Option value="Đực">Đực</Option>
//               <Option value="Cái">Cái</Option>
//             </Select>
//           </Filter>
//           <Filter>
//             <FilterText>Sắp xếp theo:</FilterText>
//             <Select onChange={(e) => setSort(e.target.value)}>
//               <Option value="">Chọn...</Option>
//               <Option value="moinhat">Mới nhất</Option>
//               <Option value="tangdan">Giá tăng dần</Option>
//               <Option value="giamdan">Giá giảm dần</Option>
//             </Select>
//           </Filter>
//         </FilterContainer>
//         {displayProducts}
//       </Container>
//       <ReactPaginate
//         previousLabel={"PREVIOUS"}
//         nextLabel={"NEXT"}
//         pageCount={pageCount}
//         onPageChange={handlePageChange}
//         containerClassName={"paginationBttns"}
//         previousLinkClassName={"previousBttn"}
//         nextLinkClassName={"nextBttn"}
//         disabledClassName={"paginationDisabled"}
//         activeClassName={"paginationActive"}
//         nextClassName={"nextClassName"}
//         pageLinkClassName={"pageLinkClassName"}
//       />
//     </>
//   );
// };

// export default Products;
