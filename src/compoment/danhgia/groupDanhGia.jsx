import React, { useEffect, useMemo, useState } from "react";
import { ItemDanhGia } from "./itemDanhGia";
import { getDanhGiaApi, getUserApi } from "../../util/api";
import { useNavigate } from "react-router-dom";

export const GroupDanhGia = ({
  id,
  max = null,
  filterStar = null,
  onlyImage = false,
  sort = "newest",
}) => {
  const navigate = useNavigate();
  const [danhgia, setDanhgia] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchDanhGia = async () => {
      const res = await getDanhGiaApi(id);
      if (res?.data) setDanhgia(res.data);
    };

    const fetchUser = async () => {
      const res = await getUserApi();
      setUser(res.data);
    };

    fetchDanhGia();
    fetchUser();
  }, [id]);

  // 🔥 LỌC + SORT
  const filteredDanhGia = useMemo(() => {
    let list = [...danhgia];

    // Lọc theo sao
    if (filterStar) {
      list = list.filter((dg) => dg.so_sao === filterStar);
    }

    // Lọc có hình ảnh
    if (onlyImage) {
      list = list.filter((dg) => dg.hinh_anh);
    }

    // Sắp xếp
    if (sort === "high") {
      list.sort((a, b) => b.so_sao - a.so_sao);
    } else if (sort === "low") {
      list.sort((a, b) => a.so_sao - b.so_sao);
    } else {
      list.sort((a, b) => new Date(b.ngay_tao) - new Date(a.ngay_tao));
    }

    return max ? list.slice(0, max) : list;
  }, [danhgia, filterStar, onlyImage, sort, max]);

  return (
    <div className="space-y-6">
      {filteredDanhGia.length > 0 ? (
        filteredDanhGia.map((dg) => {
          const userInfo = user.find((u) => u.id === dg.id_user);

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
        <p className="text-center text-gray-500">Không có đánh giá phù hợp</p>
      )}

      {max !== null && (
        <div className="flex justify-center">
          <button
            onClick={() => navigate(`/allreview?id=${id}`)}
            className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
          >
            Xem tất cả
          </button>
        </div>
      )}
    </div>
  );
};
