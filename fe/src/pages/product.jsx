import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Product = ({ title, data, type }) => {
  const navigate = useNavigate();

  const [originalData, setOriginalData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState("bth");
  const [priceRange, setPriceRange] = useState(null);

  useEffect(() => {
    setOriginalData(data || []);
  }, [data]);

  // ===== FILTER =====
  const filterByCategory = () => {
    if (!selectedCategory) return originalData;
    return originalData.filter((i) => i.id_danh_muc === selectedCategory);
  };

  const filterByPrice = (list) => {
    if (!priceRange) return list;

    return list.filter((i) => {
      const price = Number(i.gia_ban);
      if (priceRange === "under5") return price < 5_000_000;
      if (priceRange === "5to10")
        return price >= 5_000_000 && price <= 10_000_000;
      if (priceRange === "10to20")
        return price > 10_000_000 && price <= 20_000_000;
      if (priceRange === "over20") return price > 20_000_000;
      return true;
    });
  };

  const getSortedData = () => {
    let list = filterByCategory();
    list = filterByPrice(list);

    if (sortOrder === "asc")
      return [...list].sort((a, b) => a.gia_ban - b.gia_ban);
    if (sortOrder === "desc")
      return [...list].sort((a, b) => b.gia_ban - a.gia_ban);

    return list;
  };

  const sortedData = getSortedData();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">
          Hiển thị tất cả sản phẩm chính hãng
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR */}
        <aside className="w-full lg:w-64 bg-white rounded-xl shadow p-5 h-fit">
          <h2 className="font-bold text-lg mb-5 border-b pb-3">Bộ lọc</h2>

          {/* CATEGORY */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase">
              Danh mục
            </h3>
            <div className="flex flex-wrap gap-2">
              {type.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedCategory(item.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                    selectedCategory === item.id
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {item.ten_danh_muc}
                </button>
              ))}
            </div>
          </div>

          {/* PRICE */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase">
              Mức giá
            </h3>
            <div className="space-y-3 text-sm">
              {[
                { k: "under5", t: "Dưới 5 triệu" },
                { k: "5to10", t: "5 - 10 triệu" },
                { k: "10to20", t: "10 - 20 triệu" },
                { k: "over20", t: "Trên 20 triệu" },
              ].map((p) => (
                <label
                  key={p.k}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange === p.k}
                    onChange={() => setPriceRange(p.k)}
                    className="text-red-600 focus:ring-red-500"
                  />
                  <span>{p.t}</span>
                </label>
              ))}

              {priceRange && (
                <button
                  onClick={() => setPriceRange(null)}
                  className="text-xs text-red-600 hover:underline mt-2"
                >
                  Xóa lọc giá
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* CONTENT */}
        <div className="flex-1">
          {/* SORT */}
          <div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-wrap gap-3">
            {[
              { k: "bth", t: "Phổ biến" },
              { k: "asc", t: "Giá thấp - cao" },
              { k: "desc", t: "Giá cao - thấp" },
            ].map((s) => (
              <button
                key={s.k}
                onClick={() => setSortOrder(s.k)}
                className={`px-5 py-2 rounded-lg font-semibold text-sm border transition ${
                  sortOrder === s.k
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                {s.t}
              </button>
            ))}
          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {sortedData.length > 0 ? (
              sortedData.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/pageSP/${item.id}`)}
                  className="bg-white rounded-xl shadow hover:shadow-xl transition-all p-4 cursor-pointer flex flex-col group"
                >
                  <div className="aspect-[4/5] bg-gray-50 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                    <img
                      src={
                        item.hinh_anh?.startsWith("http")
                          ? item.hinh_anh
                          : item.hinh_anh
                          ? `${import.meta.env.VITE_BACKEND_URL}${
                              item.hinh_anh
                            }`
                          : ""
                      }
                      alt={item.tieu_de}
                      className="h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <h3 className="font-semibold text-center line-clamp-2 min-h-[48px]">
                    {item.tieu_de}
                  </h3>

                  <p className="text-red-600 font-bold text-lg text-center my-2">
                    {Number(item.gia_ban).toLocaleString("vi-VN")} ₫
                  </p>

                  <div className="mt-auto bg-gray-100 text-xs text-gray-600 rounded-lg p-2 text-center line-clamp-2">
                    {item.noi_dung}
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                Không có sản phẩm phù hợp
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
