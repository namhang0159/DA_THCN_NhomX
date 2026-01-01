import React from "react";
import { useNavigate } from "react-router-dom";

export const Content = ({ title, data }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6 w-full">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">
            Sản phẩm được khách hàng yêu thích
          </p>
        </div>

        <button
          onClick={() => navigate("/pageall")}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Xem tất cả →
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
              <div className="bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-lg transition p-4 h-full">
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
      </div>
    </div>
  );
};
