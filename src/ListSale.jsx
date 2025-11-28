import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";

export const ListSale = ({ title, data }) => {
  const navigate = useNavigate();
  const [percentage, setPercentage] = useState(33.33);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setPercentage(100);
      } else if (window.innerWidth < 1024) {
        setPercentage(50);
      } else {
        setPercentage(33.33);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h1 className="text-black uppercase text-xl font-bold p-4">{title}</h1>
        <button
          className="text-black rounded-2xl p-4 hover:bg-gray-200 transition"
          onClick={() => {
            navigate("/pageall");
          }}
        >
          Xem tất cả
        </button>
      </div>

      <Carousel
        centerMode
        centerSlidePercentage={percentage}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        autoPlay
        infiniteLoop
      >
        {data.length > 0 &&
          data.map((item, index) => (
            <div key={index} className="h-[400px] m-2">
              <div
                className="flex flex-col items-center bg-white p-4 h-full rounded-2xl shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
                onClick={() => navigate(`/pageSP/${item.id}`)}
              >
                <img
                  src={item.hinh_anh}
                  alt={item.tieu_de}
                  className="w-full h-[220px] object-contain mb-3"
                />
                <p className="text-lg font-semibold text-gray-800 text-center mb-1">
                  {item.tieu_de}
                </p>
                <p className="text-red-600 text-xl font-bold mb-2">
                  {Number(item.gia_ban).toLocaleString("vi-VN")} đ
                </p>
                <div className="bg-gray-100 w-full text-sm text-gray-600 p-2 rounded-xl text-center">
                  {item.noi_dung}
                </div>
              </div>
            </div>
          ))}
      </Carousel>
      
    </div>
  );
};
