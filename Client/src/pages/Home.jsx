import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import SliderHome from "../components/SliderHome";
import SliderHomePage from "../components/SlideHomePage";
import CategoriesSlide from "../components/Category_Slide";
import CustomButtonWithDot from "../components/Button";
import CustomBtn from "../components/ButtonTwo";
// import { Scrollbars } from "react-custom-scrollbars";

const Home = () => {
  return (
    <div>
      {/* <Scrollbars style={{ width: "100%", height: "100vh" }}> */}
        <Navbar />
        <Announcement />
        {/* <SliderHome /> */}
        <SliderHomePage />
        <CategoriesSlide />
        {/* <Categories /> */}
        <Products />
        <Newsletter />
        <Footer />
        <CustomButtonWithDot />
        <CustomBtn />
      {/* </Scrollbars> */}
    </div>
  );
};

export default Home;
