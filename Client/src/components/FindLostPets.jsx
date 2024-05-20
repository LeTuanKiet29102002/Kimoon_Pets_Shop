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

const ItemFindLostPets = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 0 10px !important; /* Đảm bảo rằng khoảng cách được thêm vào hai bên */
  width: 400px !important; /* Giữ nguyên chiều rộng để tránh bị đẩy gần nhau */
  height: 600px;

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
  border-radius: 50%;
`;

const H3 = styled.h3`
  text-align: center;
  font-weight: 600;
  margin-top: 30px;
`;

const P = styled.p`
  font-size: 16px;
  color: #6c757d;
  text-align: center;
  margin-bottom: 40px;
`;

const P1 = styled.p`
  font-size: 20px;
  color: #6c757d;
  text-align: center;
  margin-bottom: 0;
`;

const P2 = styled.p`
  font-size: 20px;
  color: #6c757d;
  text-align: center;
  margin-bottom: 20px;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const IconLeft = styled.img`
  margin-left: 20px;
`;
const IconRight = styled.img`
  margin-left: 20px;
`;
const RunningNumberContainer = styled.div`
  color: var(--color-primary);
  font-weight: bold;
  margin-left: 10px;
  font-size: 30px;
`;

const H1 = styled.img`
  width: 10px;
  height: 10px;
  color: var(--color-primary);
  margin: 20px 0;
`;
const H5 = styled.h5`
  font-size: 20px;
  align-items: center;
  margin-top: 8px;
`;

const H4 = styled.h4`
  font-size: 20px;
  align-items: center;
  text-align: center;
  color:var(--color-primary);
`;

const Comment = styled.div`

`;

const Contact = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;

`;
const SDT = styled.div`

`;

const DiaChi = styled.div`

`;

const Email = styled.div`

`;

const CommentHead = styled.div`
  display: flex;
  justify-content: space-around;
`;
const ImagePet = styled.img`
  display: flex;
  margin:auto;
  width: 200px;
  height: 250px;
  border-radius: 5px;
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.5);
`;

const Description = styled.div`
  height: 80px;
  overflow: auto; /* Thêm thanh cuộn khi nội dung vượt quá */
`;

const Pp = styled.div`
  overflow: auto;
  /* height: 80; */
`;

const FindLostPets = () => {
  const [FindLostPets, setFindLostPets] = useState([]);

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
          "http://localhost:3001/api/lostpets/getThuCungLac",
          {}
        );
        setFindLostPets(res.data);
      } catch (err) {
        console.log("Error occurred:", err);
      }
    };
    fetchData();
  }, []);

  // console.log("check FindLostPets", FindLostPets);

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

  return (
    <Container>
      <H3>
        Hãy tìm thú cưng lạc của bạn và những người xung quanh của bạn tại đây
      </H3>
      <Slider className="slick-slider" {...settings}>
        {FindLostPets.map((item, index) => (
          <ItemFindLostPets key={index} className="item">
            <CommentHead>
              <Image src={item.hinhdaidien} />
              <H5>
                {item.gioitinhnguoimua === '' ? 'Chị' : 'Anh'}: <strong>{item.hotennguoimua}</strong>
              </H5>
            </CommentHead>
            <Comment>
              <H4>
                Đã bị lạc:<strong>{item.tenthulac}</strong>
              </H4>
              <p>
              <strong>
                Đặc điểm nhận dạng
              </strong>
              </p>
              <Description>
                <Pp>
                  <H1 src={Tren} />
                  {item.dacdiem}
                  <H1 src={Duoi} />
                </Pp>
              </Description>
            </Comment>
            <ImagePet src={item.hinhanhthulac} />
            <Contact>
              Thông tin liên hệ nhanh:
              <SDT>{item.sdtlienhe}</SDT>
              <Email>{item.emaillienhe}</Email>
              <DiaChi>{item.diachilienhe}</DiaChi>
            </Contact>
          </ItemFindLostPets>
        ))}
      </Slider>
    </Container>
  );
};

export default FindLostPets;
