import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { logoutCart } from "../redux/cartRedux";
import styled from "styled-components";
import StripeGif from "../assets/svg/icons8-stripe-56.png";



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
`

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
`
const IMG = styled.img`
    height: 20px;
    width: 20px;
    margin-right: 20px;

`;

const PayButton = ({ CartItems }) => {
  const user = useSelector((state) => state.user.currentUser);



  const handleCheckout = () => {

    axios.post(`http://localhost:3001/api/stripe/create-checkout-session`, {
      // madonhang:madonhang,
      CartItems,
      userId: user?user.manguoimua:'0',
    })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;

        }
      })
      .catch((err) => console.log(err.message));
    console.log('check cartItems:', CartItems);
    // Xử lý thanh toán ở đây
  };


  return (
    <ButtonContainer>
      <Button onClick={handleCheckout} ><IMG src={StripeGif} alt='stripe'/>Thanh toán online bằng stripe</Button>
    </ButtonContainer>
  );
};


export default PayButton;
