import React from "react";
import { GroupDanhGia } from "../compoment/danhgia/groupDanhGia";
import { useSearchParams } from "react-router-dom";

export const Allreview = () => {
  const [params] = useSearchParams();
  const id = params.get("id");

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Tất cả đánh giá sản phẩm
          </h1>
          <p className="text-gray-500 mt-2">
            Tổng hợp đánh giá thực tế từ người dùng
          </p>
        </div>

        <div className="bg-white shadow-xl p-6 rounded-2xl border">
          <GroupDanhGia id={id} />
        </div>
      </div>
    </div>
  );
};
