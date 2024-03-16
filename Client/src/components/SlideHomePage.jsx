import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// import { slide_data } from "../data";

const slide_data = [
  {
    maSlide: "Slide1",
    src: "https://images6.alphacoders.com/134/1341420.png",
    title: "Chó Dachshund",
    copy: "Chó Dachshund còn gọi là chó xúc xích, chó lạp xưởng. Chúng là giống chó thân dài, ngực nở, bụng hóp, hoạt bát, rắn chắc với tứ chi rất ngắn. Chúng tạo cho giống chó này một dáng vẻ độc đáo và đầy chất thông thái. Đầu thuôn dài, mắt hơi lồi, mõm dài với bộ hàm khoẻ mạnh cùng những chiếc răng vô cùng sắc bén.",
  },
  {
    maSlide: "Slide3",

    src: "https://images2.alphacoders.com/110/1108542.jpg",
    title: "Mèo anh Lông ngắn",
    copy: "Mèo lông ngắn Anh là phiên bản nhân giống có chọn lọc của mèo nhà Anh truyền thống với những đặc điểm như thân hình mũm mĩm, lông ngắn và dày cùng với khuôn mặt to. Màu sắc phổ biến nhất là màu xám xanh với mắt màu vàng đồng, nhưng ngoài ra vẫn còn nhiều màu sắc và hoa văn khác nhau.",
  },
  {
    maSlide: "Slide3",

    src: "https://www.hdwallpapers.in/download/colorful_koi_carp_fishes_water_bubbles_dark_background_4k_hd_fish-3840x2160.jpg",
    title: "Cá koi nhật",
    copy: "Cá chép Koi hay cụ thể hơn Cá chép Nishikigoi là một loại cá chép thường đã được thuần hóa, lai tạo để nuôi làm cảnh trong những hồ nhỏ, được nuôi phổ biến tại Nhật Bản.",
  },
  {
    maSlide: "Slide4",
    src: "https://images.pexels.com/photos/2317904/pexels-photo-2317904.jpeg?cs=srgb&dl=pexels-ilo-frey-2317904.jpg&fm=jpg",
    title: "Vẹt ngũ sắc Canada",
    copy: "Vẹt còn được gọi là chim két hay chim kơ tia là các loài chim gồm khoảng 393 loài trong 92 chi của Bộ Vẹt Psittaciformes, được tìm thấy chủ yếu ở các vùng nhiệt đới và cận nhiệt đới.",
  },
];

const Container = styled.div`
  width: 100%;
  height: 100vh;
  // background-color: #2C302E;
  display: flex;
  position: relative;
`;

const Caption = styled.div`
  position: absolute;
  top: 50%;
  left: 8rem;
  z-index: 9;
  transform: translateY(-50%);
  opacity: 0;
  transition: 500ms ease opacity, 500ms ease transform;
  transform: translateY(60px);
  &.current-caption {
    transition-delay: 1000ms;
    opacity: 1;
    transform: translateY(0);
  }
  &.previous-caption {
    transform: translateY(-60px);
  }
`;

const Heading = styled.div`
  color: white;
  transition: 500ms ease-in all;
  h1 {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    text-indent: -0.2rem;
    letter-spacing: 0.2rem;
    font-weight: 300;
  }
`;

const Subhead = styled.div`
  font-size: 1rem;
  font-weight: 300;
  text-transform: uppercase;
  color: white;
  letter-spacing: 4px;
  word-spacing: 0.1rem;
  margin-bottom: 2.5rem;
  display: block;
  max-width: 600px;
`;

const Btn = styled.a`
  color: #333;
  font-size: 0.8rem;
  text-decoration: none;
  background-color: white;
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  position: relative;
  z-index: 9;
  transition: 250ms ease-in background-color, 500ms ease-in color;
  &:hover {
    background-color: black;
    color: white;
  }
`;

const LeftCol = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: calc(100% - 4rem);
  overflow: hidden;
  background-size: cover;
  background-postion: center top;
  overflow: hidden;
  margin: 2rem;
  position: relative;
  border-radius: 10px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.5);
`;

const Slide = styled.div`
  // filter: grayscale(100%);
  position: absolute;
  width: 100%;
  height: 100%;
  background-position: left top !important;
  background-size: cover !important;
  background-repeat: no-repeat;
  opacity: 0;
  transition: 1000ms cubic-bezier(1, 0.04, 0.355, 1) transform,
    1000ms cubic-bezier(0.68, -0.55, 0.265, 1.55) clip-path;
  transform: translateY(-100%);
  scale: 1;
  z-index: -1;
  &.previous {
    z-index: 1;
    opacity: 1;
    transform: translateY(0);
    animation-delay: 1s;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
    transition: 3s ease transform;
    will-change: transform;
  }
  &.previous.change {
    transform: translateY(50%);
  }
  &.next {
    transform: translateY(-100%);
    z-index: 3;
    opacity: 1;
    clip-path: polygon(0 0, 100% 0, 100% 90%, 0% 100%);
  }
  &.current {
    opacity: 1;
    transform: translateY(0) scale(1.25);
    z-index: 2;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  }
`;

const RightCol = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Nav = styled.ul`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 6;
  overflow: hidden;
`;

const NavItem = styled.li`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50%;
  text-align: center;
  a {
    color: rgba(250, 250, 250, 1);
    font-size: 3rem;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.3s ease;
    z-index: 1000;
    &:hover {
      transform: scale(1.1);
    }
  }
  &.slide-up {
    left: 0;
    transform: translateX(-40%);
  }
  &.slide-down {
    right: 0;
    transform: translateX(40%);
  }
`;

const slideUpAnimation = keyframes`
    from {
        opacity: 0;
        transform: translateX(-100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

const slideDownAnimation = keyframes`
    from {
        opacity: 0;
        transform: translateX(100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

const SlideUp = styled.div`
  display: block;
  position: absolute;
  text-align: center;
  padding: 1rem;
  opacity: 0;
  transition: 0.25s ease opacity, 0.25s ease transform;
  z-index: 99;
  animation: ${slideUpAnimation} 0.5s forwards;
`;

const SlideDown = styled.div`
  display: block;
  position: absolute;
  text-align: center;
  padding: 1rem;
  opacity: 0;
  transition: 0.25s ease opacity, 0.25s ease transform;
  z-index: 99;
  animation: ${slideDownAnimation} 0.5s forwards;
`;
// const SlideUp = styled.div`
//     display: block;
//     position: absolute;
//     text-align: center;
//     padding: 1rem;
//     opacity: 0;
//     transition: .25s ease opacity, .25s ease transform;
//     z-index: 99;
//     animation: ${slideUpAnimation} 0.5s forwards;
// `;

// const SlideDown = styled.div`
//     display: block;
//     position: absolute;
//     text-align: center;
//     padding: 1rem;
//     opacity: 0;
//     transition: .25s ease opacity, .25s ease transform;
//     z-index: 99;
//     animation: ${slideDownAnimation} 0.5s forwards;
// `;

const SlideHomePage = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const autoplay = setInterval(() => {
      nextSlide();
    }, 1000000);

    return () => clearInterval(autoplay);
  }, []);

  const nextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slide_data.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex(
      (prevIndex) => (prevIndex - 1 + slide_data.length) % slide_data.length
    );
  };

  return (
    <Container id="container">
      {slide_data.map((slide, index) => (
        <Caption
          key={index}
          className={
            index === currentSlideIndex
              ? "current-caption"
              : index ===
                (currentSlideIndex - 1 + slide_data.length) % slide_data.length
              ? "previous-caption"
              : ""
          }
        >
          <Heading>
            <h1>{slide.title}</h1>
          </Heading>
          <Subhead>
            <p>{slide.copy}</p>
          </Subhead>
        </Caption>
      ))}
      <LeftCol id="left-col">
        {slide_data.map((slide, index) => (
          <Slide
            key={index}
            className={
              index === currentSlideIndex
                ? "current"
                : index ===
                  (currentSlideIndex - 1 + slide_data.length) %
                    slide_data.length
                ? "previous"
                : index === (currentSlideIndex + 1) % slide_data.length
                ? "next"
                : ""
            }
            style={{ backgroundImage: `url(${slide.src})` }}
          ></Slide>
        ))}
      </LeftCol>
      <Nav>
        <NavItem className="slide-up">
          <ArrowBackIosNewIcon
            style={{
              backgroundColor: "white",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
            }}
            id="up_button"
            onClick={prevSlide}
          >
            &lt;
          </ArrowBackIosNewIcon>
        </NavItem>
        <NavItem className="slide-down">
          <ArrowForwardIosIcon
            style={{
              backgroundColor: "white",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
            }}
            id="down_button"
            onClick={nextSlide}
          >
            &gt;
          </ArrowForwardIosIcon>
        </NavItem>
      </Nav>
    </Container>
  );
};

export default SlideHomePage;
