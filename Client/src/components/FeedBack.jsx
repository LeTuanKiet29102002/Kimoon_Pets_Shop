import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Left from "../assets/svg/icons8-pets-100.png";
import Right from "../assets/svg/icons8-person-100.png";
import Tren from "../assets/svg/quotation-marktren.png";
import Duoi from "../assets/svg/quotation-markduoi.png";



const Container = styled.div`
  background-color: #f8f9fa;
  padding: 50px;
`;

const ItemFeedBack = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 0 10px !important; /* Đảm bảo rằng khoảng cách được thêm vào hai bên */
  width: 400px !important; /* Giữ nguyên chiều rộng để tránh bị đẩy gần nhau */
  height: 300px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  h4 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: #6c757d;
  }
`;

const Image = styled.img`
  width: 40px;
  height: 40px;
  border-radius:50%;
`

const H3 = styled.h3`
    text-align: center;
    font-weight: 600;
    margin-top: 30px;
`

const P = styled.p`
    font-size: 16px;
    color: #6c757d;
    text-align: center;
    margin-bottom: 40px;
`

const P1 = styled.p`
    font-size: 20px;
    color: #6c757d;
    text-align: center;
    margin-bottom: 0;
`

const P2 = styled.p`
    font-size: 20px;
    color: #6c757d;
    text-align: center;
    margin-bottom: 20px;
`


const HeaderContent = styled.div`
display: flex;
justify-content:center;
align-items:center;
`
const IconLeft = styled.img`
  margin-left:20px;

`
const IconRight = styled.img`
  margin-left:20px;

`
const RunningNumberContainer = styled.div`
  color: var(--color-primary);
  font-weight:bold;
  margin-left: 10px;
  font-size:30px;
`;

const H1 = styled.img`
  width: 10px;
  height: 10px;
  color: var(--color-primary);
  margin: 20px 0;
`
const H5 = styled.h5`
  font-size:20px;
  align-items: center;
  margin-top:8px;
`

const Comment = styled.div`

`
const CommentHead = styled.div`
  display: flex;
  justify-content:space-around;
`




const FeedBack = () => {
  const [feedback, setFeedBack] = useState([]);

  // useEffect(() => {
  //   // Giả lập dữ liệu
  //   const fakeData = [
  //     { name: "Item 1", description: "Description for item 1" },
  //     { name: "Item 2", description: "Description for item 2" },
  //     { name: "Item 3", description: "Description for item 3" },
  //     { name: "Item 4", description: "Description for item 4" },
  //     { name: "Item 5", description: "Description for item 5" },
  //     { name: "Item 6", description: "Description for item 6" },
  //     { name: "Item 7", description: "Description for item 7" },
  //     { name: "Item 8", description: "Description for item 8" },
  //     { name: "Item 9", description: "Description for item 9" },
  //     { name: "Item 10", description: "Description for item 10" },
  //   ];
  //   setDanhMuc(fakeData);
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3001/api/feedback/getFeedBack",
          {}
        );
        setFeedBack(res.data);
      } catch (err) {
        console.log("Error occurred:", err);
      }
    };
    fetchData();
  }, []);

  // console.log("check feedback", feedback);

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  const [numberPets, setNumberPets] = useState(0);
  const [numberPerson, setNumberPerson] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (numberPets < 1000) {
        setNumberPets(prevNumber => prevNumber + 10);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [numberPets]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (numberPerson < 2000) {
        setNumberPerson(prevNumber => prevNumber + 20);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [numberPerson]);





  return (
    <Container>
      <H3>Our Clients' Satisfaction is Our Top Priority</H3>
      <P>We have a reputation for helping clients around the world find success on their most important projects</P>
      <hr></hr>
      <HeaderContent>
        <IconLeft src={Left} /><P1>Số lượng thú cưng đa dạng lên tới</P1><RunningNumberContainer>{numberPets}+</RunningNumberContainer>
        <IconRight src={Right} /><P1>Số lượng khách mua hàng lên tới</P1><RunningNumberContainer>{numberPerson}+</RunningNumberContainer>
      </HeaderContent>
      <P2>Our customers say <strong>Excellent </strong>🌕🌕🌕🌕🌖
        4.8 out of 5 based on 1,691 reviews</P2>
      <Slider className="slick-slider" {...settings}>
        {feedback.map((item, index) => (
          <ItemFeedBack key={index} className="item">
            <CommentHead>
              <Image src={item.hinhdaidien} />
              <H5>Anh/Chị:  <strong>{item.hotennguoimua}</strong></H5>
            </CommentHead>
            <Comment>
              <p><H1 src={Tren} />{item.comments}<H1 src={Duoi} /></p>
            </Comment>
            <h5>
              {item.rating === 5 ? `🌕🌕🌕🌕🌕` : item.rating === 4 ? `🌕🌕🌕🌕🌑` : item.rating === 3 ? `🌕🌕🌕🌑🌑` : item.rating === 2 ? `🌕🌕🌑🌑🌑` : item.rating === 1 ? `🌕🌑🌑🌑🌑` : item.rating === 0 ? `🌑🌑🌑🌑🌑` : `🌑🌑🌑🌑🌑`
              }
            </h5>
          </ItemFeedBack>
        ))}
      </Slider>
    </Container>
  );
};

export default FeedBack;
