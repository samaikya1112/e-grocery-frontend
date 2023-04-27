import React from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../component/signupandsignin/login.css";
function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipe: true,
  };
  return (
    <div>
      <Nav />
      <br></br>
      <br></br>
      <Slider {...settings}>
        <div style={{ margin: "0 10px" }}>
          <Link to="/login">
            <div className="image-container">
              <img
                src="https://cdn.zeptonow.com/production///tr:w-969,ar-969-501,pr-true,f-webp,q-80/inventory/banner/e1b27790-1143-46f7-85fe-d53b6af309b2-Banner_Carousel_(4).png"
                alt="info 1"
              />
            </div>
          </Link>
        </div>
        <div style={{ margin: "0 10px" }}>
          <Link to="/login">
            <div className="image-container">
              <img
                src="https://cdn.zeptonow.com/production///tr:w-969,ar-969-501,pr-true,f-webp,q-80/inventory/banner/f9d50f4e-325d-4869-af51-7aca4c28c5f7-BLR_(7).png"
                alt="info 2"
              />
            </div>
          </Link>
        </div>
        <div style={{ margin: "0 10px" }}>
          <Link to="/login">
            <div className="image-container">
              <img
                src="https://cdn.zeptonow.com/production///tr:w-420,ar-692-471,pr-true,f-webp,q-80/inventory/category/80f85556-668a-4953-975d-c9b8c7147ddf-Atta,_Rice,_Oil_&_Dals-01.png"
                alt="info 3"
              />
            </div>
          </Link>
        </div>
        <div style={{ margin: "0 10px" }}>
          <Link to="/login">
            <div className="image-container">
              <img
                src="https://cdn.zeptonow.com/production///tr:w-969,ar-969-501,pr-true,f-webp,q-80/inventory/banner/fbd4a688-18e8-4efc-82fd-e2bd0c740767-Banner-Carousel_Healthy-&-Organic-Cooking-Range-2.jpg"
                alt="info 4"
              />
            </div>
          </Link>
        </div>
        <div style={{ margin: "0 10px" }}>
          <Link to="/login">
            <div className="image-container">
              <img
                src="https://cdn.zeptonow.com/production///tr:w-969,ar-969-501,pr-true,f-webp,q-80/inventory/banner/bf7ab721-68f2-4261-a6f3-8286b0955fa6-Banner_Carousel-_align.jpg"
                alt="info 5"
              />
            </div>
          </Link>
        </div>
        <div style={{ margin: "0 10px" }}>
          <Link to="/login">
            <div className="image-container">
              <img
                src="https://cdn.zeptonow.com/production///tr:w-420,ar-664-452,pr-true,f-webp,q-80/inventory/category/fad86a63-828f-4381-b9e8-58b39d48ed41-Frame_11049_(1).png"
                alt="info 6"
              />
            </div>
          </Link>
        </div>
      </Slider>
      <div style={{ margin: "30px 10px" }}>
        <Link to="/login">
          <div>
            <img
              src="https://cdn.zeptonow.com/production///tr:w-1028,ar-1028-268,pr-true,f-webp,q-80/inventory/banner/918f80f2-8f13-4e96-b7e8-f89318ed8d54-SINGLE_THIN_BANNER.png"
              alt="info 2"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
