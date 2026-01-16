import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { taoDanhGiaApi } from "../util/api";

export const Review = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id_sp = params.get("sanpham");
  const id_order = params.get("order");
  const [so_sao, setSoSao] = useState(5);
  const [noi_dung, setNoiDung] = useState("");
  const [hinh_anh, setHinhAnh] = useState(null);
  const [hoverSao, setHoverSao] = useState(0);

  const handleSubmit = async () => {
    const demTu = noi_dung.trim().split(/\s+/).length;
    if (demTu < 5) {
      alert("Nội dung Đánh giá phải lớn hơn 5");
      return;
    }

    try {
      const res = await taoDanhGiaApi(
        id_sp,
        id_order,
        so_sao,
        noi_dung,
        hinh_anh
      );

      if (res.data) {
        alert("Đánh giá thành công!");
        setTimeout(() => navigate("/"), 1000);
      } else {
        alert("Đánh giá thất bại");
      }
    } catch (e) {
      console.log(e);
      alert("Lỗi hệ thống!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded text-center">
      <h2 className="text-xl font-bold mb-4">Đánh giá sản phẩm</h2>

      {/* chọn sao */}
      <div className="flex justify-center gap-3 mb-5 text-3xl cursor-pointer">
        {[1, 2, 3, 4, 5].map((s) => (
          <span
            key={s}
            onMouseEnter={() => setHoverSao(s)}
            onMouseLeave={() => setHoverSao(0)}
            onClick={() => setSoSao(s)}
            style={{
              color: s <= (hoverSao || so_sao) ? "#facc15" : "#d1d5db",
            }}
          >
            ★
          </span>
        ))}
      </div>

      {/* Nội dung */}
      <textarea
        className="border p-2 w-full mb-4 rounded"
        rows={4}
        placeholder="Bạn thấy sản phẩm thế nào?"
        value={noi_dung}
        onChange={(e) => setNoiDung(e.target.value)}
      />

      {/* Ảnh */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setHinhAnh(e.target.files[0])}
        className="mb-5"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded w-full"
      >
        Gửi đánh giá
      </button>
    </div>
  );
};
