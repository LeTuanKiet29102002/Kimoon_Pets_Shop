import styled from "styled-components";
import { mobile } from "../responsive";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
  margin: 30px 0px 10px 100px;
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

const ResetPassword = () => {
  const [matkhaureset, setMatKhauReSet] = useState();
  const [rematkhaureset, setReMatKhauReset] = useState();
  const [wrong, setWrong] = useState(false);
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  // ===== TOAST =====
  const [dataToast, setDataToast] = useState({ message: "aloeeee alo", type: "success" });
  const toastRef = useRef(null);  // useRef có thể gọi các hàm bên trong của Toast
  // bằng các dom event, javascript, ...
  const showToastFromOut = (dataShow) => {
    console.log("showToastFromOut da chay", dataShow);
    setDataToast(dataShow);
    toastRef.current.show();
  }

  const handleClickResetPassWord = async (e) => {
    e.preventDefault();
    if (matkhaureset === rematkhaureset) {
      try {
        setIsFetching(true); // Đánh dấu đang thực hiện request
        const token = new URLSearchParams(window.location.search).get('token'); // Lấy token từ query parameter
        const res = await axios.post("http://localhost:3001/api/auth/reset-password", { token, newPassword: matkhaureset });
        console.log("Mật khẩu đã được cập nhật.");
        const dataShow = { message: "Mật khẩu đã được cập nhật.", type: "success" };
        showToastFromOut(dataShow);
        setIsFetching(false); // Đánh dấu kết thúc request
        // Sau khi hiển thị toast, đợi 3 giây rồi chuyển đến trang đăng nhập
        setTimeout(() => {
          navigate("/login");
        }, 3000);

      } catch (err) {
        setError(err.response.data.message); // Lưu thông báo lỗi từ server
        const dataShow = { message: "Lỗi chưa cập nhật được mật khẩu.", type: "danger" };
        showToastFromOut(dataShow);
        setIsFetching(false); // Đánh dấu kết thúc request
      }
    } else {
      setTrungMatKhau(true);
    }
  };

  const [isShowPassword, setisShowPassword] = useState(false);
  const [isReShowPassword, setisReShowPassword] = useState(false);
  const [trungmatkhau, setTrungMatKhau] = useState(false);
  const handleShowHidePassword = () => {
    setisShowPassword(!isShowPassword);
  }
  const handleShowHideRePassword = () => {
    setisReShowPassword(!isReShowPassword);

  }
  const handleChangePassword = (e) => {
    setMatKhauReSet(e.target.value);
    setTrungMatKhau(false);
  };
  const handleChangeRePassword = (e) => {
    setReMatKhauReset(e.target.value);
    setTrungMatKhau(false);
  };

  return (
    <Container>
      <TopBar />
      <Wrapper>
        <Title>Cập nhật mật khẩu</Title>
        <Form>
          {/* Mật khẩu */}
          <Pass>
            <Input
              type={isShowPassword ? 'text' : 'password'}
              placeholder="Mật khẩu của bạn"
              onChange={(e) => handleChangePassword(e)}
            />
            <Span onClick={handleShowHidePassword}>
              {isShowPassword ?
                <VisibilityIcon />
                :
                <VisibilityOffIcon />
              }
            </Span>
          </Pass>
          {/* Re Mật khẩu */}
          <Pass>
            <Input
              type={isReShowPassword ? 'text' : 'password'}
              placeholder="Re-Mật khẩu của bạn"
              onChange={(e) => handleChangeRePassword(e)}
            />
            <Span onClick={handleShowHideRePassword}>
              {isReShowPassword ?
                <VisibilityIcon />
                :
                <VisibilityOffIcon />
              }
            </Span>
          </Pass>
          <Button onClick={handleClickResetPassWord} disabled={isFetching}>SUBMIT</Button>
          {trungmatkhau && <Error>Mật khẩu không khớp...</Error>}
          {/* {error && <Error>Something went wrong...</Error>} */}
        </Form>
      </Wrapper>
      {/* === TOAST === */}
      <Toast
        ref={toastRef}
        dataToast={dataToast}   // Thông tin cần hiện lên: Đối tượng { message,type }
      />
    </Container>
  )
}

export default ResetPassword;






















// import { changePassword } from "../redux/callsAPI";  // Giả định bạn đã tạo một hàm này

// const handleClickChangePassword = async (e) => {
//     e.preventDefault();
//     if (matkhaureset === rematkhaureset) {
//         try {
//             await changePassword(dispatch, { matkhaureset });
//             console.log("Mật khẩu đã được cập nhật.");
//         } catch (err) {
//             console.log("Lỗi khi cập nhật mật khẩu:", err);
//             setWrong(true);
//         }
//     } else {
//         setTrungMatKhau(true);
//     }
// };
