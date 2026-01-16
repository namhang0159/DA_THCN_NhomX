import React, { useState } from "react";
import { GroupDanhGia } from "../compoment/danhgia/groupDanhGia";
import { useSearchParams, Link } from "react-router-dom";

export const Allreview = () => {
  const [params] = useSearchParams();
  const id = params.get("id");
  const [star, setStar] = useState(null);
  const [onlyImage, setOnlyImage] = useState(false);
  const [sort, setSort] = useState("newest");

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 flex flex-wrap gap-2">
          <Link to="/" className="hover:text-blue-600">
            Trang chủ
          </Link>
          <span className="text-sm text-gray-500 flex flex-wrap gap-2">
            / Sản phẩm /
          </span>
          <span className="font-medium text-gray-800">Tất cả đánh giá</span>
        </div>

        {/* Page header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 border-b pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Đánh giá sản phẩm
            </h1>
            <p className="text-gray-500 mt-2">
              Tổng hợp nhận xét thực tế từ khách hàng đã mua
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          {/* Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-24 h-fit">
            {/* Rating overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">
                Tổng quan đánh giá
              </h3>

              <div className="flex items-end gap-3 mb-4">
                <span className="text-5xl font-bold text-gray-800">4.8</span>
                <div>
                  <div className="flex text-yellow-400">★★★★★</div>
                  <p className="text-sm text-gray-500">1.200 đánh giá</p>
                </div>
              </div>

              {/* Progress bars (demo UI) */}
              {[5, 4, 3, 2, 1].map((star, i) => (
                <div key={star} className="flex items-center gap-3 mb-2">
                  <span className="w-4 text-sm text-gray-600">{star}</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full  overflow-hidden">
                    <div
                      className="h-full bg-gray-800"
                      style={{
                        width: `${[80, 12, 5, 1, 2][i]}%`,
                      }}
                    />
                  </div>
                  <span className="w-8 text-sm text-gray-500 text-right">
                    {[80, 12, 5, 1, 2][i]}%
                  </span>
                </div>
              ))}
            </div>

            {/* Filters (UI) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100  p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Bộ lọc</h3>

              <div className="space-y-3 text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyImage}
                    onChange={(e) => setOnlyImage(e.target.checked)}
                    className="accent-blue-600"
                  />
                  <span>Có hình ảnh</span>
                </label>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Theo số sao
                </p>
                <div className="flex flex-wrap gap-2">
                  {[5, 4, 3, 2, 1].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStar(star === s ? null : s)}
                      className={`px-3 py-1.5 rounded-full border text-sm transition
        ${
          star === s
            ? "border-blue-600 text-blue-600 bg-blue-50"
            : "hover:border-blue-600 hover:text-blue-600"
        }`}
                    >
                      {s} sao
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Reviews list */}
          <div className="space-y-6 ">
            {/* Sort bar */}
            <div className="flex justify-between items-center ">
              <p className="font-semibold text-gray-800">Danh sách đánh giá</p>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-200"
              >
                <option value="newest">Mới nhất</option>
                <option value="high">Đánh giá cao</option>
                <option value="low">Đánh giá thấp</option>
              </select>
            </div>

            {/* Actual reviews */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <GroupDanhGia
                id={id}
                filterStar={star}
                onlyImage={onlyImage}
                sort={sort}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
