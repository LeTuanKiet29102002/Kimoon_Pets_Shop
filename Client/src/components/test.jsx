import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel";
import { Link } from "react-router-dom";
import CustomButtonWithDot from "./Button";
import axios from "axios";
import "./test.css";

const Slide = () => {
  const [danhmuc, setDanhMuc] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3001/api/products/getDanhMuc",
          {}
        );
        setDanhMuc(res.data);
      } catch (err) {
        console.log("Error occurred:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && danhmuc.length > 0) {
      const $ = window.$;

      $(".customSlide").owlCarousel({
        autoWidth: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
      });

      $("customSlide .item").click(function () {
        $("customSlide .item").not($(this)).removeClass("active");
        $(this).toggleClass("active");
      });
    }
  }, [danhmuc]);

  console.log("checkkkk", danhmuc);

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

  return (
    <section className="game-section">
      <h2 className="line-title">trending Pets</h2>
      <div className="owl-carousel customSlide owl-theme">
        {slide_data.map((item, index) => (
          <div
            key={item.maSlide}
            className="item"
            style={{ backgroundImage: `url(${item.src})` }}
          >
            <div className="item-desc ">
              <div className="item-desc-head">
                <h3>{item.title}</h3>
                {/* <Link to={`/products/${item.copy}`}>
                  <CustomButtonWithDot />
                </Link> */}
              </div>
              <p>{item.copy}</p>
            </div>
          </div>
        ))}
        {/* Additional items go here */}
      </div>
    </section>
  );
};

export default Slide;
