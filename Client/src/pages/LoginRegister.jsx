import "../css/main.css";
import { CloseOutlined, Margin } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../redux/callsAPI";

const SignIn = styled.div`
  width: 95%;
  height: 95%;
  box-shadow: 6px 6px 30px #d1d9e6;
  border-radius: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #f8f8f8;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 1;
`;

const MainPage = styled.div`
  width: 100%;
  height: 100%;
  // background: linear-gradient(
  //     rgba(255,255,255,0.5),
  //     rgba(255,255,255,0.5)
  //     ),
  //     url("https://i.pinimg.com/originals/6c/63/82/6c638291a66ddc93b86bf4f43c337701.jpg")
  //     center;
  background-image: url("https://www.humanedecisions.com/wp-content/uploads/2020/03/Cats-and-Dogs-Pixabay.jpg");
  /* background-image: url("https://png.pngtree.com/background/20230616/original/pngtree-the-pet-at-the-beach-picture-image_3632925.jpg"); */
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;

  height: 100%;
  border-radius: 0px;
  /* height: 55%;
    border-radius: 0% 0% 50% 50%/ 0% 0% 30% 30%; */
  box-shadow: 2px 6px 12px #d1d9e6;

  ${SignIn}.active-sign-in & {
    height: 55%;
    border-radius: 0% 0% 50% 50%/0% 0% 20% 20%;
    animation: main 0.3s linear;
  }
  ${SignIn}.active-sign-up & {
    height: 55%;
    border-radius: 0% 0% 50% 50%/0% 0% 20% 20%;
    animation: main 0.3s linear;
  }
  ${SignIn}.active-sign-in-gmail & {
    height: 55%;
    border-radius: 0% 0% 50% 50%/0% 0% 20% 20%;
    animation: main 0.3s linear;
  }
`;

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

const Title = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const H1 = styled.h1`
  font-weight: 600;
  font-size: 3rem;
  color: var(--color-white);
  margin: 0px;
  letter-spacing: 2px;
`;

const P = styled.p`
  color: var(--color-white);
  font-size: 1.2rem;
`;

const FormChucNang = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 50%;
  bottom: 60px;
  transform: translateX(-50%);
  text-align: center;
  ${SignIn}.active-sign-in & {
    display: none;
  }
  ${SignIn}.active-sign-up & {
    display: none;
  }
  ${SignIn}.active-sign-in-gmail & {
    display: none;
  }
`;

const SignInBtn = styled.button`
  width: 230px;
  height: 42px;
  margin: 5px 0px;
  border: none;
  outline: none;
  border-radius: 20px;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
  font-weight: 700;
  box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  color: #171717;
  background-color: #ffffff;

  &:active {
    transform: scale(1.05);
  }
`;

const LoginAdvance = styled.div`
  position: relative;
  margin: 5px 0px;
  border: none;
  outline: none;
  border-radius: 20px;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
  font-weight: 700;
  box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  color: #ffffff;
  background-color: transparent;
  margin-bottom: 20px;
  width: 230px;
  height: 42px;
`;

const SignInGmailBtn = styled.button`
  position: absolute;
  left: -10px;
  width: 42px;
  height: 42px;
  margin: 0px 10px;
  border: none;
  outline: none;
  border-radius: 20px;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
  font-weight: 700;
  box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  color: #ffffff;
  background-color: #ff6699;
  margin-bottom: 20px;
  &:active {
    transform: scale(1.05);
  }
`;

const SignInFaceBookBtn = styled.button`
  position: absolute;
  left: 94px;
  width: 42px;
  height: 42px;
  margin: 0px 0px;
  border: none;
  outline: none;
  border-radius: 20px;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
  font-weight: 700;
  box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  color: #ffffff;
  background-color: #3b5999;
  z-index: 100;
  margin-bottom: 20px;
  &:active {
    transform: scale(1.05);
  }
`;

const SignInGitHubBtn = styled.button`
  position: absolute;

  right: 0px;
  width: 42px;
  height: 42px;
  margin: 0px 0px;
  border: none;
  outline: none;
  border-radius: 20px;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
  font-weight: 700;
  box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  color: #ffffff;
  background-color: #000;
  margin-bottom: 20px;
  &:active {
    transform: scale(1.05);
  }
`;

const SignUpBtn = styled.button`
  width: 230px;
  height: 42px;
  margin: 5px 0px;
  border: none;
  outline: none;
  border-radius: 20px;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
  font-weight: 700;
  box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  color: #171717;
  background-color: #ffffff;

  &:active {
    transform: scale(1.05);
  }
`;

const Cancel = styled.div`
  position: absolute;
  left: 50%;
  bottom: -25px;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f8f8f8;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  box-shadow: 2px 6px 20px rgba(0, 0, 0, 0.12);
  display: none;
  ${SignIn}.active-sign-in & {
    display: flex;
  }
  ${SignIn}.active-sign-up & {
    display: flex;
  }
  ${SignIn}.active-sign-in-gmail & {
    display: flex;
  }
`;

const Icon = styled.a`
  color: #111111;
  animation: cancel 0.5s;
`;

const SignInPage = styled.div`
  display: none;
  width: 100%;
  height: 45%;
  ${SignIn}.active-sign-in & {
    display: flex;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Input = styled.input`
  width: 220px;
  height: 40px;
  margin: 5px 0px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  outline: none;
  color: #191919;
  border-radius: 10px;
  padding: 0px 10px;
  box-sizing: border-box;
  &::placeholder {
    letter-spacing: 2px;

    font-size: 15px;
  }
  &:focus {
    box-shadow: 2px 2px 30px rgba(0, 0, 0, 0.1);
  }
`;

const Button = styled.button`
  width: 220px;
  height: 40px;
  margin: 10px 0px;
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

const SignUpPage = styled.div`
  display: none;
  width: 100%;
  height: 45%;
  ${SignIn}.active-sign-up & {
    display: flex;
  }
`;

const SignInPageGmail = styled.div`
  display: none;
  width: 100%;
  height: 45%;
  ${SignIn}.active-sign-in-gmail & {
    display: flex;
  }
`;

const BgCurcule = styled.div`
  width: 500px;
  height: 500px;
  position: absolute;
  top: -40%;
  height: 60%;
  transform: translateX(-60%);
  background-color: #ecf0f3;
  border-radius: 50%;
`;

const Error = styled.span`
  color: red;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const LoginRegister = () => {
  // --Giao diện--
  const [isSignIn, setIsSignIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSignInGmail, setIsSignInGmail] = useState(false);

  const handleClose = () => {
    setIsSignIn(false);
    setIsSignUp(false);
    setIsSignInGmail(false);
  };

  const handleDangNhap = () => {
    setIsSignIn(true);
    setIsSignInGmail(false);
    setIsSignUp(false);
  };

  const handleDangKy = () => {
    setIsSignIn(false);
    setIsSignInGmail(false);
    setIsSignUp(true);
  };
  const handleDangNhapGmail = () => {
    setIsSignIn(false);
    setIsSignInGmail(true);
    setIsSignUp(false);
  };

  // --Xử lý--
  // Đăng nhập
  const [emailnguoimua, setEmailNguoiMua] = useState("");
  const [matkhau, setMatKhau] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  // Gọi hàm đăng nhập - callAPI.js-redux
  const handleClickDangNhap = (e) => {
    e.preventDefault();
    login(dispatch, { emailnguoimua, matkhau });
  };

  // Đăng ký
  const [tennguoimuadangky, setTenNguoiMuaDangKy] = useState();
  const [emailnguoimuadangky, setEmailNguoiMuaDangKy] = useState();
  const [matkhaudangky, setMatKhauDangKy] = useState();
  const [rematkhaudangky, setReMatKhauDangKy] = useState();
  console.log({ tennguoimuadangky, emailnguoimuadangky, matkhaudangky });
  const [trungmatkhau, setTrungMatKhau] = useState(false);
  const [wrong, setWrong] = useState(false);

  // Gọi hàm đăng ký - callAPI.js-redux
  const handleClickDangKy = (e) => {
    if (matkhaudangky === rematkhaudangky) {
      e.preventDefault();
      console.log("Dang ky dang ky");
      try {
        register(dispatch, {
          tennguoimuadangky,
          emailnguoimuadangky,
          matkhaudangky,
          setWrong: setWrong,
        }); //Gửi qua dispatch để thao tác reducers-redux & đối tượng đăng ký
      } catch (err) {
        setWrong(true);
      }
    } else {
      e.preventDefault();
      setTrungMatKhau(true);
    }
  };
  const handleChangeEmail = (e) => {
    setEmailNguoiMuaDangKy(e.target.value);
    setWrong(false);
  };

  const handleChangePassword = (e) => {
    setMatKhauDangKy(e.target.value);
    setTrungMatKhau(false);
  };
  const handleChangeRePassword = (e) => {
    setReMatKhauDangKy(e.target.value);
    setTrungMatKhau(false);
  };

  return (
    <SignIn
      className={
        isSignIn
          ? "active-sign-in"
          : isSignUp
          ? "active-sign-up"
          : isSignInGmail
          ? "active-sign-in-gmail"
          : null
      }
    >
      <MainPage>
        <TopBar />
        {/* Tiêu đề */}
        <Title>
          <H1>Kimoon Pets</H1>
          <P>Chào mừng bạn đến với trang web bán thú cưng hàng đầu Việt Nam</P>
        </Title>
        {/* Các nút chức năng */}
        <FormChucNang>
          <SignInBtn onClick={handleDangNhap}>Đăng nhập</SignInBtn>
          <LoginAdvance>
            <SignInGmailBtn>
              <GoogleIcon onClick={handleDangNhapGmail}></GoogleIcon>
            </SignInGmailBtn>
            <SignInFaceBookBtn>
              <FacebookIcon onClick={handleDangNhapGmail}></FacebookIcon>
            </SignInFaceBookBtn>
            <SignInGitHubBtn>
              <GitHubIcon onClick={handleDangNhapGmail}></GitHubIcon>
            </SignInGitHubBtn>
          </LoginAdvance>
          <SignUpBtn onClick={handleDangKy}>Đăng ký</SignUpBtn>
        </FormChucNang>
        {/* Nút đóng */}
        <Cancel onClick={handleClose}>
          <Icon>
            <CloseOutlined />
          </Icon>
        </Cancel>
      </MainPage>
      {/* Trang đăng nhập */}
      <SignInPage>
        <Form>
          {/* Email */}
          <Input
            type="email"
            placeholder="Email của bạn"
            onChange={(e) => setEmailNguoiMua(e.target.value)}
          />
          {/* Mật khẩu */}
          <Input
            type="password"
            placeholder="Mật khẩu của bạn"
            onChange={(e) => setMatKhau(e.target.value)}
          />
          {/* Nút đăng nhập */}
          <Button onClick={handleClickDangNhap} disabled={isFetching}>
            Đăng nhập
          </Button>
          {error && <Error>Something went wrong...</Error>}
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
        </Form>
      </SignInPage>
      {/* Trang đăng ký */}
      <SignUpPage>
        <Form>
          {/* Tên */}
          <Input
            type="text"
            placeholder="Tên của bạn"
            onChange={(e) => setTenNguoiMuaDangKy(e.currentTarget.value)}
          />
          {/* Email */}
          <Input
            type="email"
            placeholder="Email của bạn"
            onChange={(e) => handleChangeEmail(e)}
          />
          {/* Mật khẩu */}
          <Input
            type="password"
            placeholder="Mật khẩu của bạn"
            onChange={(e) => handleChangePassword(e)}
          />
          {/* Re Mật khẩu */}
          <Input
            type="password"
            placeholder="Re-Mật khẩu của bạn"
            onChange={(e) => handleChangeRePassword(e)}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          {trungmatkhau && <Error>Mật khẩu không khớp...</Error>}
          {wrong && <Error>Email đã tồn tại...</Error>}
          {/* Nút đăng ký */}
          <Button onClick={(e) => handleClickDangKy(e)}>Đăng ký</Button>
        </Form>
      </SignUpPage>

      {/* Background */}
      {/* <BgCurcule></BgCurcule> */}
      {/* Trang đăng nhập bằng Gmail */}
      <SignInPageGmail>
        <Form>
          {/* Email */}
          <Input
            type="email"
            placeholder="Email của bạn"
            onChange={(e) => setEmailNguoiMua(e.target.value)}
          />
          {/* Mật khẩu */}
          <Input
            type="password"
            placeholder="Mật khẩu email của bạnbdbdbbet"
            onChange={(e) => setMatKhau(e.target.value)}
          />
          {/* Nút đăng nhập */}
          <Button onClick={handleClickDangNhap} disabled={isFetching}>
            Đăng nhập
          </Button>
          {error && <Error>Something went wrong...</Error>}
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
        </Form>
      </SignInPageGmail>
    </SignIn>
  );
};

export default LoginRegister;
