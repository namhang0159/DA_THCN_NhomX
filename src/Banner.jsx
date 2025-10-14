import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import CSS
import { Carousel } from "react-responsive-carousel";

export const Banner = () => {
  return (
    <div className="w-[100%]">
      <Carousel autoPlay infiniteLoop showThumbs={false} showDots={false}>
        <div>
          <img
            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/iphone-16-pro-max-home-08-2025.png"
            alt="Ảnh 1"
          />
        </div>
        <div>
          <img
            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/copoassushome.png"
            alt="Ảnh 2"
          />
        </div>
        <div>
          <img
            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/galaxy-z-7-home-0825.png"
            alt="Ảnh 3"
          />
        </div>
        <div>
          <img
            src="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/iPhone-17-Pro-PRE-home-0925.png"
            alt="Ảnh 4"
          />
        </div>
      </Carousel>
    </div>
  );
};
