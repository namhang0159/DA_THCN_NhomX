import React, { useEffect, useState } from "react";

const Product = ({ title, data, type }) => {
  const [sortOrder, setSortOrder] = useState("bth");
  const [originalData, setOriginalData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setOriginalData(data);
  }, [data]);

  const getCategory = () => {
    if (!selectedCategory) return originalData;
    else {
      return [...originalData].filter(
        (item) => item.id_danh_muc === selectedCategory
      );
    }
  };
  const getSortedData = () => {
    const dataS = getCategory();
    if (sortOrder === "asc") {
      return [...dataS].sort((a, b) => Number(a.gia_ban) - Number(b.gia_ban));
    }
    if (sortOrder === "desc") {
      return [...dataS].sort((a, b) => Number(b.gia_ban) - Number(a.gia_ban));
    }
    return dataS;
  };

  const sortedData = getSortedData();

  return (
    <div>
      <h1
        className="text-2xl font-bold mb-6"
        onClick={() => setSelectedCategory(null)}
      >
        {title}
      </h1>
      <div className="flex flex-wrap gap-4 mb-8">
        {type.length > 0 &&
          type.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div onClick={() => setSelectedCategory(item.id)}>
                <div className="w-26 h-6 md:w-36 md:h-8 rounded-2xl overflow-hidden border-2 border-gray-200 group-hover:border-red-500 transition">
                  <img
                    src={item.hinh_anh}
                    alt={item.ten_danh_muc}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setSortOrder("bth")}
          className={`px-4 py-2 rounded-full border ${
            sortOrder === "bth"
              ? "bg-red-600 text-white border-red-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          Phổ biến
        </button>
        <button
          onClick={() => setSortOrder("asc")}
          className={`px-4 py-2 rounded-full border ${
            sortOrder === "asc"
              ? "bg-red-600 text-white border-red-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          Giá Thấp - Cao
        </button>
        <button
          onClick={() => setSortOrder("desc")}
          className={`px-4 py-2 rounded-full border ${
            sortOrder === "desc"
              ? "bg-red-600 text-white border-red-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          Giá Cao - Thấp
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedData.length > 0 ? (
          sortedData.map((item, index) => (
            <div key={index} className="mb-4 break-inside-avoid">
              <div className="flex flex-col items-center bg-white p-4 h-full rounded-2xl shadow-md hover:shadow-xl transition duration-300">
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
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Không có sản phẩm nào
          </p>
        )}
      </div>
    </div>
  );
};

export default Product;
