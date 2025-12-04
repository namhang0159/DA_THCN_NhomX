import React, { useEffect, useState } from "react";
import { ItemDanhGia } from "./itemDanhGia";
import { getDanhGiaApi, getUserApi } from "../../util/api";
import { useNavigate } from "react-router-dom";

export const GroupDanhGia = ({ id, max = null }) => {
  const navigate = useNavigate();
  const [danhgia, setDanhgia] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchDanhGia = async () => {
      const res = await getDanhGiaApi(id);
      const data = res.data;
      const sorted = [...data].sort((a, b) => b.so_sao - a.so_sao);

      const limited = max ? sorted.slice(0, max) : sorted;

      if (data) {
        setDanhgia(limited);
        console.log(data);
      } else {
        console.log("Lỗi fetch đánh giá");
      }
    };

    const fetchUser = async () => {
      const res = await getUserApi();
      setUser(res.data);
    };
    fetchDanhGia();
    fetchUser();
  }, [id]);
  return (
    <div className="rounded-2xl hover:shadow-2xl border  bg-white p-6 space-y-6">
      <h2 className="text-xl font-bold">Đánh giá sản phẩm từ người mua</h2>

      <div className="space-y-4">
        {danhgia.length > 0 ? (
          danhgia.map((dg) => {
            const userInfo = user.find((u) => u.id == dg.id_user);
            return (
              <ItemDanhGia
                key={dg.id}
                name={userInfo?.name || "Ẩn danh"}
                rating={dg.so_sao}
                content={dg.noi_dung}
                image={
                  dg.hinh_anh
                    ? dg.hinh_anh.startsWith("http")
                      ? dg.hinh_anh
                      : `${import.meta.env.VITE_BACKEND_URL}${dg.hinh_anh}`
                    : ""
                }
                ngay_tao={dg.ngay_tao}
              />
            );
          })
        ) : (
          <p>Không có đánh giá nào </p>
        )}
      </div>
      {max != null && (
        <div className="w-full flex items-center justify-center mt-4">
          <button
            className="bg-gray-100 px-5 py-3 rounded-2xl hover:bg-gray-200 transition"
            onClick={() => navigate(`/allreview?id=${id}`)}
          >
            Xem tất cả
          </button>
        </div>
      )}
    </div>
  );
};
