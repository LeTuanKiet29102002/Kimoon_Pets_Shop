import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CardProduct from "./CardProduct";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled.div`
  width: 90%;
  margin: 20px auto;
`;

const StyledSlider = styled(Slider)`
  .slick-slide div {
    outline: none;
    /* Các kiểu khác bạn muốn áp dụng cho các phần tử trong slick slider */
  }

  .slick-prev,
  .slick-next {
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    border: none;
    color: black;
    font-size: 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  .slick-prev {
    left: 0;
    margin-left: 0;
    /* text-indent: -9999px; */
  }

  .slick-next {
    right: -30px;
    margin-right: 10px;
    /* text-indent: -9999px; */
  }

  .slick-prev::before,
  .slick-next::before {
    font-size: 18px; /* Đặt lại font-size cho icon */
  }

  .slick-disabled {
    display: none;
  }
`;

const H3 = styled.h3`
    font-weight: 600;
    margin: 30px 0 10px 30px;
    color: var(--color-primary);
`;
const LineTitle = styled.h2`
  position: relative;
  top:20px;
  width: 100px;
  padding: 5px 20px;
  min-width: 350px;
  margin-bottom: 20px;
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


const SuggestPets = ({ madanhmuc, filters, sort }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        let url = "http://localhost:3001/api/products";
        if (madanhmuc) {
          url += `/madanhmuc=${madanhmuc}`;
        }
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        console.log("Lỗi khi lấy dữ liệu sản phẩm:", err);
      }
    };
    getProducts();
  }, [madanhmuc]);

  // Chọn ngẫu nhiên 10 sản phẩm từ mảng products
  const randomProducts = () => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  };

  const displayProducts = randomProducts().map((item) => (
    <Link to={`/product/${item.mathucung}`} key={item.mathucung}>
      <CardProduct item={item} />
    </Link>
  ));

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Số lượng slide hiển thị cùng một lúc
    slidesToScroll: 1,
    arrows: true, // Hiển thị nút next và previous
    autoplay: true, // Tự động chuyển tiếp
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container>
    <LineTitle>
     Thú cưng có thể bạn sẽ thích
    </LineTitle>
      <StyledSlider {...settings}>
        {displayProducts}
      </StyledSlider>
    </Container>
  );
};

export default SuggestPets;




// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import styled from "styled-components";
// import CardProduct from "./CardProduct";
// import axios from "axios";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const Container = styled.div`
//   width: 90%;
//   margin: 0 auto;
// `;

// const StyledSlider = styled(Slider)`
//   /* Styles cho slider */
// `;

// const LineTitle = styled.h2`
//   position: relative;
//   top: 20px;
//   width: 100px;
//   padding: 5px 20px;
//   min-width: 350px;
//   margin-bottom: 20px;
//   margin: auto;
//   &::before,
//   &::after {
//     content: "";
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     height: 4px;
//     border-radius: 2px;
//   }

//   &::before {
//     width: 100%;
//     background: #f2f2f2;
//   }

//   &::after {
//     width: 100%;
//     background: #e73700;
//   }
// `;

// const SuggestPets = ({ madanhmuc, filters, sort }) => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Gọi cả hai API
//         const productsRes = await axios.get(`http://localhost:3001/api/products`);
//         const thucungRes = await axios.get(`http://localhost:3001/api/products/getThuCung`);

//         // Lọc và kết hợp dữ liệu từ hai API
//         const combinedProducts = combineData(productsRes.data, thucungRes.data);
//         // Loại bỏ các sản phẩm có soluong === 0
//         const filteredProducts = combinedProducts.filter(item => item.soluong > 0);
        
//         setProducts(filteredProducts);
//       } catch (error) {
//         console.log("Lỗi khi lấy dữ liệu:", error);
//       }
//     };

//     fetchData();
//   }, [madanhmuc]);

//   // Hàm kết hợp dữ liệu từ hai API
//   const combineData = (data1, data2) => {
//     // Thực hiện việc kết hợp dữ liệu từ hai API ở đây
//     // Ví dụ:
//     const combinedData = [...data1, ...data2];
//     return combinedData;
//   };

//   // Chọn ngẫu nhiên 10 sản phẩm từ mảng products
//   const randomProducts = () => {
//     const shuffled = products.sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, 10);
//   };

//   const displayProducts = randomProducts().map((item) => (
//     <Link to={`/product/${item.mathucung}`} key={item.mathucung}>
//       <CardProduct item={item} />
//     </Link>
//   ));

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 5, // Số lượng slide hiển thị cùng một lúc
//     slidesToScroll: 1,
//     arrows: true, // Hiển thị nút next và previous
//     autoplay: true, // Tự động chuyển tiếp
//     autoplaySpeed: 3000,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <Container>
//       <LineTitle>
//         Thú cưng có thể bạn sẽ thích
//       </LineTitle>
//       <StyledSlider {...settings}>
//         {displayProducts}
//       </StyledSlider>
//     </Container>
//   );
// };

// export default SuggestPets;
