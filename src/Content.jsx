import React from "react";
import { useNavigate } from "react-router-dom";

export const Content = ({ title, data }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-2 mb-4">
        <h1 className="text-black uppercase text-lg md:text-xl font-bold p-2">
          {title}
        </h1>
        <button
          onClick={() => navigate("/pageall")}
          className="text-sm md:text-base text-black rounded-2xl px-4 py-2 hover:bg-gray-200 transition"
        >
          Xem tất cả
        </button>
      </div>

      {/* Grid responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.length > 0 &&
          data.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => navigate(`/pageSP/${item.id}`)}
            >
              <div className="flex flex-col items-center bg-white p-4 h-full rounded-2xl shadow-md hover:shadow-xl transition duration-300">
                <img
                  src={item.hinh_anh}
                  alt={item.tieu_de}
                  className="w-full h-[180px] sm:h-[220px] object-contain mb-3"
                />

                <p className="text-base sm:text-lg font-semibold text-gray-800 text-center mb-1 line-clamp-2">
                  {item.tieu_de}
                </p>

                <p className="text-red-600 text-lg sm:text-xl font-bold mb-2">
                  {Number(item.gia_ban).toLocaleString("vi-VN")} đ
                </p>

                <div className="bg-gray-100 w-full text-xs sm:text-sm text-gray-600 p-2 rounded-xl text-center line-clamp-2">
                  {item.noi_dung}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
