import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import CSS
import { Carousel } from "react-responsive-carousel";

export const Banner = () => {
  return (
    <div className="w-[100%]">
      <Carousel autoPlay infiniteLoop showThumbs={false} showDots={false}>
        <div>
          <img
            src="./img/ip17.png"
            alt="Ảnh 1"
            className="w-full  object-cover rounded-xl"
          />
        </div>
        <div>
          <img
            src="./img/ss.webp"
            alt="Ảnh 2"
            className="w-full  object-cover rounded-xl"
          />
        </div>
        <div>
          <img
            src="./img/oppo.webp"
            alt="Ảnh 3"
            className="w-full  object-cover rounded-xl"
          />
        </div>
        <div>
          <img
            src="./img/nubia.webp"
            className="w-full  object-cover rounded-xl"
          />
        </div>
      </Carousel>
    </div>
  );
};
