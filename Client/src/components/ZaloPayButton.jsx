// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import { logoutCart } from "../redux/cartRedux";
// import styled from "styled-components";
// import Zalopayicon from "../assets/svg/ZaloPay-ngang.png";



// const ButtonContainer = styled.div`
//     justify-content: center;
//     position: relative;
//     float: right;
//     margin: 10px 22px 22px 0;
//     display: flex;
//     border-radius: 5px;

//     &::after {
//         content: "";
//         border: 2px solid black;
//         position: absolute;
//         top: 5px;
//         right: -5px;
//         background-color: transperent;
//         min-width: 300px;
//         height: 100%;
//         z-index: 5;
//         border-radius: 5px;

//     }
// `

// const Button = styled.button`
//     padding: 10px;
//     min-width: 300px;
//     border: 2px solid black;
//     background-color: black;
//     color: white;
//     cursor: pointer;
//     font-weight: 500;
//     z-index: 10;
//     border-radius: 5px;

//     &:hover {
//         background-color: #fe6430;
//     }
//     &:active {
//         background-color: #333;
//         transform: translate(5px, 5px);
//         transition: transform 0.25s;
//     }
// `
// const IMG = styled.img`
//     height: 20px;
//     width: 40px;
//     /* margin-right: px; */

// `;

// const ZaloPayButton = ({ CartItems }) => {
//     const user = useSelector((state) => state.user.currentUser);
//     const [paymentInProgress, setPaymentInProgress] = useState(false);

//     //   const handleCheckout = async () => {
//     //     try {
//     //       setPaymentInProgress(true);
//     //       const response = await axios.post(`http://localhost:3001/api/zalopay/payment`, {
//     //         CartItems,
//     //         user
//     //         // userId: user ? user.manguoimua : '0',
//     //       });

//     //       if (response.data.order_url) {
//     //         window.location.href = response.data.order_url;
//     //       }
//     //     } catch (error) {
//     //       console.log(error.message);
//     //     } finally {
//     //       setPaymentInProgress(false);
//     //     }
//     //   };

//     // const handleCheckout = async () => {
//     //     try {
//     //       setPaymentInProgress(true);
//     //       const response = await axios.post(`http://localhost:3001/api/zalopay/payment`, {
//     //         CartItems,
//     //         userId: user ? user.manguoimua : '0',
//     //       });

//     //       if (response.data.order_url) {
//     //         // Thay đổi URL của trang hiện tại
//     //         window.history.replaceState(null, null, response.data.order_url);
//     //         // Tải lại nội dung của trang
//     //         window.location.reload();
//     //       }
//     //     } catch (error) {
//     //       console.log(error.message);
//     //       setPaymentInProgress(false);
//     //     }
//     //   };

    
//     const handleCheckout = async () => {
//         try {
//             setPaymentInProgress(true);

//             // Thêm các câu lệnh console.log để kiểm tra dữ liệu
//             console.log('CartItems:', CartItems);
//             console.log('User:', user);

//             const response = await axios.post(`http://localhost:3001/api/zalopay/payment`, {
//                 CartItems,
//                 user
//             });

//             console.log('API Response:', response.data);

//             if (response.data.order_url) {
//                 window.location.href = response.data.order_url;
//             }
//         } catch (error) {
//             console.log(error.message);
//         } finally {
//             setPaymentInProgress(false);
//         }
//     };


//     return (
//         <ButtonContainer>
//             <Button onClick={handleCheckout} disabled={paymentInProgress}><IMG src={Zalopayicon} alt='zalopay' />Thanh toán online bằng Zalopay</Button>
//         </ButtonContainer>
//     );
// };


// export default ZaloPayButton;






import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { logoutCart } from "../redux/cartRedux";
import styled from "styled-components";
import Zalopayicon from "../assets/svg/ZaloPay-ngang.png";

const ButtonContainer = styled.div`
  justify-content: center;
  position: relative;
  float: right;
  margin: 10px 22px 22px 0;
  display: flex;
  border-radius: 5px;

  &::after {
    content: "";
    border: 2px solid black;
    position: absolute;
    top: 5px;
    right: -5px;
    background-color: transperent;
    min-width: 300px;
    height: 100%;
    z-index: 5;
    border-radius: 5px;
  }
`;

const Button = styled.button`
  padding: 10px;
  min-width: 300px;
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

const IMG = styled.img`
  height: 20px;
  width: 40px;
`;

const ZaloPayButton = ({ CartItems }) => {
  const user = useSelector((state) => state.user.currentUser);
  const [paymentInProgress, setPaymentInProgress] = useState(false);

  const handleCheckout = async () => {
    try {
      setPaymentInProgress(true);

      // Kiểm tra dữ liệu trước khi gửi
      console.log("CartItems:", CartItems);
      console.log("User:", user);

      if (!CartItems || !user) {
        console.error("CartItems or User is undefined");
        setPaymentInProgress(false);
        return;
      }

      const response = await axios.post(
        "http://localhost:3001/api/zalopay/payment",
        {
          CartItems,
          user
        }
      );

      console.log("API Response:", response.data);

      if (response.data.order_url) {
        window.location.href = response.data.order_url;
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setPaymentInProgress(false);
    }
  };

  return (
    <ButtonContainer>
      <Button onClick={handleCheckout} disabled={paymentInProgress}>
        <IMG src={Zalopayicon} alt="zalopay" />
        Thanh toán online bằng Zalopay
      </Button>
    </ButtonContainer>
  );
};

export default ZaloPayButton;

