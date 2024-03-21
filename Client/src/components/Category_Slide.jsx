import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel";
import { Link } from "react-router-dom";
import CustomButtonWithDot from "./Button";
import axios from "axios";
import "./Category_Slide.css";

const CategoriesSlide = () => {
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

      $(".custom-carousel").owlCarousel({
        autoWidth: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        // Adjust this value as per your needs
      });

      $(".custom-carousel .item").click(function () {
        $(".custom-carousel .item").not($(this)).removeClass("active");
        $(this).toggleClass("active");
      });
    }
  }, [danhmuc]);

  console.log("checkkkk", danhmuc);

  return (
    <section className="game-section">
      <h2 className="line-title">trending Pets</h2>
      <div className="owl-carousel custom-carousel owl-theme">
        {danhmuc.map((item, index) => (
          <div
            key={item.madanhmuc}
            className="item"
            style={{ backgroundImage: `url(${item.hinhanhdanhmuc})` }}
          >
            <div className="item-desc ">
              <div className="item-desc-head">
                <h3>{item.tendanhmuc}</h3>
                <Link to={`/products/${item.madanhmuc}`}>
                  <CustomButtonWithDot />
                </Link>
              </div>
              <p>{item.tieudedanhmuc}</p>
            </div>
          </div>
        ))}
        {/* Additional items go here */}
      </div>
    </section>
  );
};

export default CategoriesSlide;
