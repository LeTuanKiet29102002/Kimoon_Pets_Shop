import { Badge } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import Register from "../pages/Register";
import Login from "../pages/SendEmail";
import Home from "../pages/Home";
import MiniCart from "./MiniCart";
import FavoriteProducts from "./FavoriteProducts";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/callsAPI";
import MiniCartImage from "./MiniCartImage";
import axios from "axios";
import LogoShop from "../assets/img/LogoKimoonhh.gif";
import { UserAuth } from "../context/AuthContext";

//center
const SearchContainer = styled.div`
  width: 600px;
  /* perspective: 1000px;  */
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 25px;
  margin-right: 25px;
  padding: 5px;
  border-radius: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: none;
  border-radius: 20px;
  background-color: #f5f5f5;
  font-size: 16px;
  color: #333;
  outline: none;
  transform-style: preserve-3d;
  transition: all 0.3s ease;

  &:focus {
    transform: translateY(-3px) rotateX(5deg) scale(1.05);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  background-color: #f5f5f5;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e5e5e5;
    transform: translateY(-2px) scale(1.1);
  }
`;

const SearchIconInner = styled.i`
  color: #555;
  transition: transform 0.3s ease;

  ${SearchIcon}:hover & {
    transform: scale(1.2);
    color: #f06292;
  }
`;

//test

const Container = styled.div`
  height: 120px;
  ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

// Center
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Lannguage = styled.span`
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
  ${mobile({ display: "none" })}
`;

// const SearchContainer = styled.div`
//   position: relative;
//   border: 0.5px solid lightgray;
//   display: flex;
//   align-items: center;
//   margin-left: 25px;
//   padding: 5px;
//   border-radius: 5px;
// `;

// const Input = styled.input`
//   border: none;
//   ${mobile({ width: "50px" })};
// `;

const SearchProduct = styled.div`
  position: absolute;
  top: calc(100% + 3px);
  left: 0;
  width: calc(100% + 80px);
  background-color: var(--color-white);
  border-radius: 2px;
  box-shadow: 0 1px 5px rgb(189, 189, 189);
  display: block;
  /* overflow: hidden; */
  z-index: 100;
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 10px;
    position: absolute;
    top: -10px;
    left: 0;
  }
`;
const SearchProductHeading = styled.h3`
  margin: 6px 12px;
  font-size: 1.2rem;
  color: #999;
  font-weight: 400;
`;
const SearchProductList = styled.ul`
  padding-left: 0;
  list-style: none;
  max-height: 56vh;
  overflow-y: auto;
`;
const SearchProductItem = styled.li`
  height: auto;
  padding: 0 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &:hover {
    background-color: #fafafa;
    margin-left: 10px;
    transition: all 0.5s ease;
    &::after {
      display: block;
    }
  }
  &::after {
    content: "";
    /* display: none; */
    position: absolute;
    top: 0px;
    left: -10px;
    width: 10px;
    height: 79px;
    background-color: #fe6433;
  }
`;

// Left
const Center = styled.div`
  /* flex: 1;
  text-align: center; */
  /* flex: 1; */
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
  margin:0 20px;
  text-align: center;
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
`;
const LogoIMG = styled.img`
  width: 100px;
  height: 100px;
`;

const LogoGroup = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2em;
`;

// Right
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: "2", justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin: 10px;
  display: flex; // Add display flex
  align-items: center; // Align items vertically
  width: 100px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const MenuItemLG = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin: 10px;
  display: flex; // Add display flex
  align-items: center; // Align items vertically
  min-width: 100px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const MenuItemCN = styled.div`
  font-size: 14px;
  cursor: pointer;
  display: flex; // Add display flex
  align-items: center; // Align items vertically
  min-width: 100px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 33px;
  padding: 8px 4px;
  margin: 10px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const NavbarUserImage = styled.img`
  margin-right: 2px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
const NavbarUserName = styled.span`
  margin-left: 4px;
  font-size: 1.2rem;
  font-weight: 500;
`;
const NavbarUserMenu = styled.ul`
  position: absolute;
  z-index: 100000;
  border-radius: 10px;
  padding-left: 0;
  top: calc(100% + 6px);
  right: 0;
  width: 180px;
  border-radius: 2px;
  background-color: white;
  list-style: none;
  // box-shadow: 0 1px 2px #e0e0e0;
  display: none;
  box-shadow: 0 1px 3rem 0 rgba(0, 0, 0, 0.3);
  animation: fadeIn ease-in 0.2s;
  &::before {
    content: "";
    border-width: 8px 14px;
    border-style: solid;
    border-color: transparent transparent white transparent;
    position: absolute;
    right: 20px;
    top: -16px;
  }
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: -6px;
    right: 0;
    width: 100%;
    height: 8px;
  }
`;
// USER
const NavbarUser = styled.div`
  display: flex;
  justify-items: center;
  position: relative;
  /* margin: 0 -100px; */
  width: 200px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 33px;
  padding: 8px 4px;
  margin: none;
  margin: 10px;
  &:hover ${NavbarUserMenu} {
    display: block;
  left: 10px;
    
  }
`;

const NavbarUserItem = styled.li`
  text-decoration: none;
  color: #333;
  font-size: 1.1rem;
  padding: 0px 0px;
  display: block;
`;
const NavbarUserItemLi = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  /* margin: 0 10px 10px 0; */
  padding: 8px;
  color: black;
  background-color: #ffffff;
  /* border-top: 1px solid #333; */
  /* border-bottom: 1px solid #333; */
  font-weight: 500;
  position: relative;
  &:hover {
    color: white;
    background-color: #fafafa;
    color: black;
    text-decoration: none;
    transition: color 0.5s, background-color 0.56s;
    margin-left: 4px;
    width: 97%;
    &::after {
      display: block;
    }
  }
  &::after {
    content: "";
    display: none;
    position: absolute;
    top: 0px;
    left: -4px;
    width: 3%;
    height: 42px;
    background-color: #fe6433;
  }
`;

const ItemInfo = styled.div`
  width: 100%;
  margin-right: 12px;
`;
const ItemHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ItemName = styled.h5`
  font-size: 1.1rem;
  line-height: 1.2rem;
  max-height: 2.4rem;
  overflow: hidden;
  font-weight: 500;
  color: black;
  margin: 0;
  flex: 1;
  padding-right: 16px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-align: left;
`;

const ItemBody = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ItemDescription = styled.span`
  color: #757575;
  font-size: 1.1rem;
  font-weight: 300;
`;

const Navbar = () => {
  //use context
  const { userEmail, logOut } = UserAuth();

  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const combinedUser = {
    ...userEmail,
    ...user,
  };

  // Gọi hàm đăng xuất - callAPI.js-redux
  const handleDangXuat = async () => {
    logout(dispatch, user);
  };

  const handleDangXuatEmail = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  console.log("check user gmail", userEmail);
  console.log("check user thuong", user);

  // Tìm kiếm
  const [timKiem, setTimKiem] = useState("");
  const [thuCungTimKiem, setThuCungTimKiem] = useState([]);
  const [Language, setLanguage] = useState(true);
  // Tìm kiếm     // Hàm đóng mở Kết quả tìm kiếm
  const timKiemRef = useRef();
  const closeTimKiem = () => {
    setThuCungTimKiem([]);
    timKiemRef.current.value = "";
    setTimKiem("");
  };
  const handleLanguage = () => {
    setLanguage(!Language);
  };

  useEffect(() => {
    const getThuCungTimKiem = async () => {
      try {
        if (timKiem !== "") {
          const thucungtimkiemres = await axios.post(
            "http://localhost:3001/api/products/getThuCungTimKiem",
            { tenthucung: timKiem }
          );
          console.log("Kết quả tìm kiếm: ", thucungtimkiemres, timKiem);
          setThuCungTimKiem(thucungtimkiemres.data);
        }
      } catch (err) {
        console.log("Có lỗi khi tìm kiếm thú cưng");
      }
    };
    getThuCungTimKiem();
    return () => {
      setThuCungTimKiem([]);
    };
  }, [timKiem]);
  console.log("Mảng tìm kiếm thú cưng: ", thuCungTimKiem);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Link style={{ textDecoration: "none", color: "#fe6433" }} to="/">
            <LogoGroup>
              <LogoIMG src={LogoShop} alt="anh logo" />
              <Logo>KIMOON PETS</Logo>
            </LogoGroup>
          </Link>
        </Left>
        <Center>
          {/* <SearchContainer>
            <Input
              ref={timKiemRef}
              placeholder="Tìm kiếm tên thú cưng ..."
              onChange={(e) => {
                setTimKiem(e.target.value);
              }}
            />
            <Search style={{ color: "gray", fontSize: 16 }} />
            {timKiem !== "" ? (
              <SearchProduct
                onMouseLeave={() => {
                  closeTimKiem();
                }}
              >
                <SearchProductHeading>Kết quả tìm kiếm</SearchProductHeading>
                <SearchProductList>
                  {thuCungTimKiem
                    ? thuCungTimKiem.map((thucung, key) => {
                        return (
                          <Link
                            to={`/product/${thucung.mathucung}`}
                            style={{ textDecoration: "none" }}
                          >
                            <SearchProductItem>
                              <MiniCartImage
                                item={thucung.mathucung}
                              ></MiniCartImage>
                              <ItemInfo>
                                <ItemHead>
                                  <ItemName>{thucung.tieude}</ItemName>
                                </ItemHead>
                                <ItemBody>
                                  <ItemDescription>
                                    Phân loại: {thucung.tendanhmuc}
                                  </ItemDescription>
                                </ItemBody>
                              </ItemInfo>
                            </SearchProductItem>
                          </Link>
                        );
                      })
                    : null}
                </SearchProductList>
              </SearchProduct>
            ) : null}
          </SearchContainer> */}
          {/* <Lannguage onClick={handleLanguage}>
            {Language === true ? "VN" : "EN"}
          </Lannguage> */}
        </Center>
        <Center>
          <SearchContainer>
            <SearchIcon>
              <Search />
            </SearchIcon>
            <Input
              ref={timKiemRef}
              placeholder="Tìm kiếm tên thú cưng ..."
              onChange={(e) => {
                setTimKiem(e.target.value);
              }}
            />
            <SearchIcon>
              <SearchIconInner>
                <Search style={{ color: "gray", fontSize: 16 }} />
              </SearchIconInner>
            </SearchIcon>
            {timKiem !== "" ? (
              <SearchProduct
                onMouseLeave={() => {
                  closeTimKiem();
                }}
              >
                <SearchProductHeading>Kết quả tìm kiếm</SearchProductHeading>
                <SearchProductList>
                  {thuCungTimKiem
                    ? thuCungTimKiem.map((thucung, key) => {
                      return (
                        <Link
                          to={`/product/${thucung.mathucung}`}
                          style={{ textDecoration: "none" }}
                        >
                          <SearchProductItem>
                            <MiniCartImage
                              item={thucung.mathucung}
                            ></MiniCartImage>
                            <ItemInfo>
                              <ItemHead>
                                <ItemName>{thucung.tieude}</ItemName>
                              </ItemHead>
                              <ItemBody>
                                <ItemDescription>
                                  Phân loại: {thucung.tendanhmuc}
                                </ItemDescription>
                              </ItemBody>
                            </ItemInfo>
                          </SearchProductItem>
                        </Link>
                      );
                    })
                    : null}
                </SearchProductList>
              </SearchProduct>
            ) : null}
          </SearchContainer>
          <Lannguage onClick={handleLanguage}>
            {Language === true ? (
              <>
                VN
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <rect
                    x="1"
                    y="4"
                    width="30"
                    height="24"
                    rx="4"
                    ry="4"
                    fill="#c93728"
                  ></rect>
                  <path
                    d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
                    opacity=".15"
                  ></path>
                  <path
                    d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
                    fill="#fff"
                    opacity=".2"
                  ></path>
                  <path
                    fill="#ff5"
                    d="M18.008 16.366L21.257 14.006 17.241 14.006 16 10.186 14.759 14.006 10.743 14.006 13.992 16.366 12.751 20.186 16 17.825 19.249 20.186 18.008 16.366z"
                  ></path>
                </svg>
              </>
            ) : (
              <>
                EN
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <rect
                    x="1"
                    y="4"
                    width="30"
                    height="24"
                    rx="4"
                    ry="4"
                    fill="#071b65"
                  ></rect>
                  <path
                    d="M5.101,4h-.101c-1.981,0-3.615,1.444-3.933,3.334L26.899,28h.101c1.981,0,3.615-1.444,3.933-3.334L5.101,4Z"
                    fill="#fff"
                  ></path>
                  <path
                    d="M22.25,19h-2.5l9.934,7.947c.387-.353,.704-.777,.929-1.257l-8.363-6.691Z"
                    fill="#b92932"
                  ></path>
                  <path
                    d="M1.387,6.309l8.363,6.691h2.5L2.316,5.053c-.387,.353-.704,.777-.929,1.257Z"
                    fill="#b92932"
                  ></path>
                  <path
                    d="M5,28h.101L30.933,7.334c-.318-1.891-1.952-3.334-3.933-3.334h-.101L1.067,24.666c.318,1.891,1.952,3.334,3.933,3.334Z"
                    fill="#fff"
                  ></path>
                  <rect x="13" y="4" width="6" height="24" fill="#fff"></rect>
                  <rect x="1" y="13" width="30" height="6" fill="#fff"></rect>
                  <rect
                    x="14"
                    y="4"
                    width="4"
                    height="24"
                    fill="#b92932"
                  ></rect>
                  <rect
                    x="14"
                    y="1"
                    width="4"
                    height="30"
                    transform="translate(32) rotate(90)"
                    fill="#b92932"
                  ></rect>
                  <path
                    d="M28.222,4.21l-9.222,7.376v1.414h.75l9.943-7.94c-.419-.384-.918-.671-1.471-.85Z"
                    fill="#b92932"
                  ></path>
                  <path
                    d="M2.328,26.957c.414,.374,.904,.656,1.447,.832l9.225-7.38v-1.408h-.75L2.328,26.957Z"
                    fill="#b92932"
                  ></path>
                  <path
                    d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
                    opacity=".15"
                  ></path>
                  <path
                    d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
                    fill="#fff"
                    opacity=".2"
                  ></path>
                </svg>
              </>
            )}
          </Lannguage>
        </Center>
        <Right>
          {userEmail || user ? (
            <MenuItemLG>
              <NavbarUser>
                <NavbarUserImage
                  src={
                    combinedUser.hinhdaidien
                      ? combinedUser.hinhdaidien
                      : "https://avatars.githubusercontent.com/u/96277352?s=400&u=cad895ff2f6ae2bd57b90ad02c6077d89bc9d55d&v=4"
                  }
                ></NavbarUserImage>
                <NavbarUserName>
                  &nbsp;&nbsp;&nbsp;&nbsp;{combinedUser.hotennguoimua}
                </NavbarUserName>
                <NavbarUserMenu>
                  <NavbarUserItem>
                    <Link
                      style={{ textDecoration: "none", width: "100%" }}
                      to="/capnhatthongtin"
                    >
                      <NavbarUserItemLi>
                        Cập nhật thông tin
                      </NavbarUserItemLi>
                    </Link>
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to="/donmua"
                    >
                      <NavbarUserItemLi>Đơn mua của bạn</NavbarUserItemLi>
                    </Link>
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to="/SendEmail?doimatkhau"
                    >
                      <NavbarUserItemLi>Đổi mật khẩu</NavbarUserItemLi>
                    </Link>
                    {userEmail ? (
                      <NavbarUserItemLi onClick={() => handleDangXuatEmail()}>
                        Đăng xuất
                      </NavbarUserItemLi>
                    ) : (
                      <NavbarUserItemLi onClick={() => handleDangXuat()}>
                        Đăng xuất
                      </NavbarUserItemLi>
                    )}
                  </NavbarUserItem>
                </NavbarUserMenu>
              </NavbarUser>
            </MenuItemLG>
          ) : (
            <>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/register"
              >
                <MenuItemCN>&nbsp;&nbsp;&nbsp;&nbsp;ĐĂNG KÝ</MenuItemCN>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/login"
              >
                <MenuItemCN>&nbsp;ĐĂNG NHẬP</MenuItemCN>
              </Link>
            </>
          )}

          <MenuItem>
            <MiniCart></MiniCart>
            <FavoriteProducts></FavoriteProducts>
          </MenuItem>
        </Right>
        {/* <Link 
                        style={{ textDecoration: "none", color: "black" }}
                        to='/register'>
                        <MenuItem>ĐĂNG KÝ</MenuItem>
                    </Link>
                    <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to='/login'>
                        <MenuItem>ĐĂNG NHẬP</MenuItem>
                    </Link>
                    // <MenuItem >
                    //     <NavbarUser>
                    //         <NavbarUserImage src="https://avatars.githubusercontent.com/u/96277352?s=400&u=cad895ff2f6ae2bd57b90ad02c6077d89bc9d55d&v=4"></NavbarUserImage>
                    //         <NavbarUserName>Lee Tuaans Kiet</NavbarUserName>
                    //         <NavbarUserMenu>
                    //             <NavbarUserItem>
                    //                 <Link
                    //                     style={{ textDecoration: "none", width: "100%" }}
                    //                     to='/capnhatthongtin'>
                    //                     <NavbarUserItemLi style={{marginTop: "10px"}}>
                    //                         Cập nhật thông tin
                    //                     </NavbarUserItemLi>
                    //                 </Link>
                    //                 <Link
                    //                     style={{ textDecoration: "none", color: "black" }}
                    //                     to='/donmua'>
                    //                     <NavbarUserItemLi>
                    //                         Đơn mua của bạn
                    //                     </NavbarUserItemLi>
                    //                 </Link>
                    //                 <NavbarUserItemLi>Đăng xuất</NavbarUserItemLi>
                    //             </NavbarUserItem>
                    //         </NavbarUserMenu>
                    //     </NavbarUser>
                    // </MenuItem>
                    <MenuItem >
                        <MiniCart>
                        </MiniCart>
                    </MenuItem>
                </Right> */}
      </Wrapper>
    </Container>
  );
};

export default Navbar;
