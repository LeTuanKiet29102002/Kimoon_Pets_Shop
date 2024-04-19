import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ArrowRightAltOutlined, CheckCircleRounded } from "@material-ui/icons";
import "../css/main.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import zalo from "../assets/svg/icons8-zalo-24.svg";
import mess from "../assets/svg/facebook-messenger-new-2020-seeklogo.svg";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

const Container = styled.div`
  position: fixed;
  width: 220px;
  height: 136px;
  bottom: 20px; /* Điều chỉnh vị trí top của div cố định */
  left: 20px; /* Điều chỉnh vị trí left của div cố định */
  /* transform: translateX(-50%); Dịch chuyển div ngang về trái 50% của chiều rộng của nó */
  /* background-color: #d56060;
  border: 1px solid red; */
  padding: 10px;
  z-index: 999; /* Đảm bảo div cố định hiển thị trên các phần tử khác trên trang */
`;

const ContactZalo = styled.div`
  align-items: flex-start;
  background-color: #0c89f7;
  border-color: #0000;
  border-radius: 20px;
  border-style: solid;
  border-width: 0.8px;
  color: #fff;
  font-family: Roboto;
  font-size: 15.52px;
  font-weight: 300;
  letter-spacing: 0.4656px;
  line-height: 37.248px;
  margin: 0px 15.52px 6px 0px;
  /* padding: 0px 18px; */
  text-align: center;
  width: 120px;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.3);
`;
const ContactMess = styled.div`
  align-items: flex-start;
  background-color: #125c9e;
  border-color: #0000;
  border-radius: 20px;
  border-style: solid;
  border-width: 0.8px;
  color: #fff;
  font-family: Roboto;
  font-size: 15.52px;
  font-weight: 300;
  letter-spacing: 0.4656px;
  line-height: 37.248px;
  margin: 0px 15.52px 6px 0px;
  /* padding: 0px 18px; */
  text-align: center;
  width: 164px;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.3);
`;
const ContactHotline = styled.div`
  align-items: flex-start;
  background-color: #f00;
  border-color: #0000;
  border-radius: 20px;
  border-style: solid;
  border-width: 0.8px;
  color: #fff;
  font-family: Roboto;
  font-size: 15.52px;
  font-weight: 300;
  letter-spacing: 0.4656px;
  line-height: 37.248px;
  margin: 0px 15.52px 6px 0px;
  /* padding: 0px 18px; */
  text-align: center;
  width: 194px;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.3);
`;

const Para = styled.p`
  color: #fff;
  display: inline;
  font-family: Roboto;
  font-size: 15px;
  letter-spacing: 0.4656px;
  line-height: 0px;
  text-align: center;
  margin-left: 8px;
`;

const ContactSocial = () => {
    return (
        <Container>
            <ContactZalo>
                <a href="https://zalo.me/0398307589" target="_blank" rel="noreferrer">
                    <img src={zalo} alt="Zalo" style={{ width: "28px", height: "28px" }} />
                    <Para>Chat Zalo</Para>
                </a>
            </ContactZalo>
            <ContactMess>
                <a href="https://www.messenger.com/t/7164306503587594/" target="_blank" rel="noreferrer">
                    <img src={mess} alt="Mess" style={{ width: "24px", height: "24px" }} />
                    <Para>Chat Messenger</Para>
                </a>
            </ContactMess>
            <ContactHotline>
                <LocalPhoneIcon style={{ width: "24px", height: "24px" }} />
                <Para>Hotline: 0398307589</Para>
            </ContactHotline>
        </Container>
    );
};
export default ContactSocial;
