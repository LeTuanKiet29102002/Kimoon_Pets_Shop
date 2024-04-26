import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ArrowRightAltOutlined, CheckCircleRounded } from "@material-ui/icons";
import CancelIcon from '@mui/icons-material/Cancel';
import "../css/main.css";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Container = styled.div`
`
const Wrapper = styled.div`
max-width: 1200px;
margin: 20px auto;
overflow: hidden;
background-color: #f8f9fa;
box-shadow: 0 2px 3px #e0e0e0;
display: flex;
justify-content: center;
text-align: center;
flex-direction: column;
`
const H2 = styled.h2`
margin-top: 20px;
`
const Small = styled.small`
font-size: 1.3rem;
`
const ButtonContainer = styled.div`
    justify-content: center;
    position: relative;
    margin: 22px 0;
    display: flex;
    &::after {
        content: "";
        border: 2px solid black;
        position: absolute;
        top: 5px;
        left: 455px;
        background-color: transperent;
        width: 300px;
        height: 100%;
        z-index: 5;
        border-radius: 5px;

    }
`

const Button = styled.button`
    padding: 10px;
    width: 300px;
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

const Success = () => {
    const [countDown, setCountDown] = useState(10);
    const navigate = useNavigate();
    useEffect(() => {
        const intervalCount = setInterval(() => {
            setCountDown(prev => prev - 1);
        }, 1000)
        return () => clearInterval(intervalCount);
    }, [])
    if (countDown === 0) {
        navigate("/");
    }
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <CancelIcon style={{ fontSize: "6rem", color: "var(--color-danger)", margin: "auto" }} />
                <span style={{ color: "var(--color-danger)", fontSize: "1.8rem", fontWeight: "700", letterSpacing: "2px" }}>ĐẶT MUA BỊ LỖI!!!</span>
                <H2>Quý khách vui lòng liên hệ với&nbsp;<span style={{ color: "var(--color-primary)" }}>Kimoon Pets</span>&nbsp;để tìm hiểu thêm</H2>
                <Small className="text-muted">Xin quý khách thông cảm cho Shop!</Small>
                <Link to="/" style={{textDecoration:  "none"}}>
                    <ButtonContainer>
                        <Button><ArrowRightAltOutlined />   Quay về trang chủ sau {countDown} giây ...</Button>
                    </ButtonContainer>
                </Link>
            </Wrapper>
             <Footer />
         </Container>
    )
}
export default Success;