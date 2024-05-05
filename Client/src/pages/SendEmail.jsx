import styled from "styled-components";
import { mobile } from "../responsive";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/callsAPI";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate , useLocation} from "react-router-dom";
import Toast from "../components/Toast";

const Container = styled.div`
  width:96vw;
  height: 94vh;
  background: linear-gradient(
    rgba(255,255,255,0.5), 
    rgba(255,255,255,0.5)
    ), 
    url("https://www.humanedecisions.com/wp-content/uploads/2020/03/Cats-and-Dogs-Pixabay.jpg") 
    center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  margin:10px 30px;
`
const TopBar = styled.div`
  width: 220px;
  height: 20px;
  background-color: #ffffff;
  position: absolute;
  left: 50%;
  top: 0px;
  transform: translateX(-50%);
  border-radius: 0px 0px 20px 20px;
`;

const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
    border-radius:10px;
    box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.5);
    ${mobile({ width: "75%" })}
`

const Title = styled.h3`
    font-size: 24px;
    font-weight: bold;
    color: var(--color-primary);
    text-align: center;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    width: 320px;
  height: 40px;
  margin: 5px 0px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  outline: none;
  color: #191919;
  border-radius: 10px;
  padding: 0px 10px;
  box-sizing: border-box;
  box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.5);
  &::placeholder {
    letter-spacing: 2px;

    font-size: 15px;
  }
  &:focus {
    box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
  }


`

const Button = styled.button`
  width: 120px;
  height: 40px;
  border: none;
  outline: none;
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 12px 12px 30px rgba(0, 0, 0, 0.1);
  &:active {
    transform: scale(1.05);
  }
  &:hover {
    background-color: #fe6433;
    color: #ffffff;
    transition: all ease 0.3s;
  }
`;
const Pass = styled.div`
  position: relative;
`

const Span = styled.span`
  position: absolute;
  top: 10px ;
  right: 10px;
`


const Link = styled.a`
    margin: 5px 0px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`

const Error = styled.span`
    color: red;
`
const GroupButton = styled.div`
  display:flex;
  margin-top:30px;
  justify-content: space-around;

`

const SendEmail = () => {
  const [emailnguoimuareset, setEmailNguoiMuaReset] = useState(false);
  const [wrong, setWrong] = useState(false);
  const { isFetching, error } = useSelector((state) => state.user);
  const navigate = useNavigate()
  const location = useLocation();

  // ===== TOAST =====
  const [dataToast, setDataToast] = useState({ message: "aloeeee alo", type: "success" });
  const toastRef = useRef(null);  // useRef có thể gọi các hàm bên trong của Toast
  // bằng các dom event, javascript, ...
  const showToastFromOut = (dataShow) => {
    console.log("showToastFromOut da chay", dataShow);
    setDataToast(dataShow);
    toastRef.current.show();
  }



  const handleChangeEmail = (e) => {
    setEmailNguoiMuaReset(e.target.value);
    setWrong(false);
  };

  const handleClickSendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/auth/request-reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailnguoimuareset }),
      });
      const data = await response.json();
      if (response.ok) {
        // Gửi email thành công
        console.log(data.message);
        const dataShow = { message: "Yêu cầu đã gửi đến email của bạn.", type: "success" };
        showToastFromOut(dataShow);
      } else {
        // Gửi email thất bại
        console.error(data.error);
        const dataShow = { message: "Lỗi khi gửi yêu cầu đặt lại mật khẩu.", type: "danger" };
        showToastFromOut(dataShow);
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu đặt lại mật khẩu:', error);
      const dataShow = { message: "Lỗi khi gửi yêu cầu đặt lại mật khẩu.", type: "danger" };
      showToastFromOut(dataShow);
    }
  };

  const handleHome = () => {
    navigate("/login");
  }

    // Kiểm tra xem địa chỉ URL có chứa "?doimatkhau" hay không
    const isDoiMatKhauLink = location.search.includes("?doimatkhau");
    
    console.log("check isDoiMatKhauLink:", isDoiMatKhauLink)

  return (
    <Container>
      <TopBar />
      {/* === TOAST === */}
      <Toast
        ref={toastRef}
        dataToast={dataToast}   // Thông tin cần hiện lên: Đối tượng { message,type }
      />
      <Wrapper>
      <Title>{isDoiMatKhauLink ? "ĐỔI MẬT KHẨU" : "QUÊN MẬT KHẨU"}</Title>
        <Form>
          {/* Nhập Email */}
          <Input
            type="email"
            placeholder="Email của bạn"
            onChange={(e) => handleChangeEmail(e)}
          />
          <GroupButton>
            <Button onClick={handleHome} disabled={isFetching}>Quay lại</Button>
            <Button onClick={handleClickSendEmail} disabled={isFetching}>Gửi mail</Button>
          </GroupButton>
          {/* {error && <Error>Something went wrong...</Error>} */}
        </Form>
      </Wrapper>
    </Container>
  )
}

export default SendEmail;