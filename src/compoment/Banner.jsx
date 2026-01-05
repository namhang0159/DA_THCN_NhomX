import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import CSS
import { Carousel } from "react-responsive-carousel";

export const Banner = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
            <img src="./img/ip17.png" className="h-[420px] object-cover" />
            <img src="./img/ss.webp" className="h-[420px] object-cover" />
            <img src="./img/oppo.webp" className="h-[420px] object-cover" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};
