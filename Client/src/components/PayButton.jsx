import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { logoutCart } from "../redux/cartRedux";


const PayButton = ({ CartItems }) => {
  const user = useSelector((state) => state.user.currentUser);



  const handleCheckout = () => {

    axios.post(`http://localhost:3001/api/stripe/create-checkout-session`, {
      // madonhang:madonhang,
      CartItems,
      userId: user.manguoimua,
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
    <>
      <button onClick={handleCheckout} >Check out</button>
    </>
  );
};


export default PayButton;
