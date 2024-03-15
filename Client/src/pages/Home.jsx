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

const Home = () => {
  return (
    <div>
      <Navbar />
      <Announcement />
      {/* <SliderHome /> */}
      <SliderHomePage />
      <CategoriesSlide />
      {/* <Categories /> */}
      <Products />
      <Newsletter />
      <Footer />
      <CustomButtonWithDot></CustomButtonWithDot>
    </div>
  );
};

export default Home;
