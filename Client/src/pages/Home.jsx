import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/ComponentNoUsing/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import SliderHome from "../components/ComponentNoUsing/SliderHome";
import SliderHomePage from "../components/SlideHomePage";
import CategoriesSlide from "../components/Category_Slide";
import CustomButtonWithDot from "../components/ComponentNoUsing/Button";
import CustomBtn from "../components/ComponentNoUsing/ButtonTwo";
import AllProducts from "../components/AllProducts";
import MultipleSelectCheckmarks from "../components/dropdowns";
// import Table from "../components/stickyTable";
import Toggle from "../components/ComponentNoUsing/Darkmode";
// import FindLostPets from "../components/FindLostPets";
import ContactSocial from "../components/ContactSocial";
import FeedBack from "../components/FeedBack";


const Home = () => {
  return (
    <div>
      <Navbar />
      <Announcement />
      {/* <SliderHome /> */}
      <SliderHomePage />
      <CategoriesSlide />
      {/* <Categories /> */}
      {/* <Products /> */}
      <AllProducts />
      {/* <FindLostPets/> */}
      <Newsletter />
      <FeedBack/>
      <Footer />
      <ContactSocial />
      {/* <CustomButtonWithDot />
      <CustomBtn /> */}
      {/* <MultipleSelectCheckmarks /> */}
      {/* <Table /> */}
      {/* <Toggle /> */}
    </div>
  );
};

export default Home;
