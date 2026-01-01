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
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>

        <button
          onClick={() => navigate("/pageall")}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Xem tất cả →
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
                  src={
                    item.hinh_anh?.startsWith("http")
                      ? item.hinh_anh
                      : item.hinh_anh
                      ? `${import.meta.env.VITE_BACKEND_URL}${item.hinh_anh}`
                      : ""
                  }
                  className="h-[200px] w-full object-contain mb-4"
                />

                <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                  {item.tieu_de}
                </h3>

                <p className="text-red-600 font-bold text-lg mb-2">
                  {Number(item.gia_ban).toLocaleString("vi-VN")} đ
                </p>

                <div className="text-xs text-gray-500 bg-gray-100 rounded-lg p-2 line-clamp-2">
                  {item.noi_dung}
                </div>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  );
};
