import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Banners.css";

const Banners = () => {
  const [bannersData, setBannersData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/banners")
      .then((res) => res.json())
      .then((data) => {
        setBannersData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="carousel-shadow banner-container">
      <Carousel
        ariaLabel="Offers"
        showStatus={false}
        showThumbs={false}
        autoPlay={true}
        emulateTouch={true}
        infiniteLoop={true}
        swipeable={true}
      >
        {bannersData.map((item) => (
          <div className="img-container" key={item.id}>
            <img src={item.bannerImageUrl} alt={item.bannerImageAlt} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banners;
