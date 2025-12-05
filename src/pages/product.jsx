import React, { useEffect, useState } from "react";
import { getSanphamApi } from "../util/api";

export const Product = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fecthSanpham = async () => {
      try {
        const res = await getSanphamApi();
        setProduct(res.data);
        console.log(res.data);
      } catch (error) {
        console.log("LỖi", error);
      }
    };
    fecthSanpham();
  }, []);
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Hình ảnh</th>
              <th className="p-3 border">Tên sản phẩm</th>
              <th className="p-3 border">Giá bán</th>
              <th className="p-3 border">Danh mục</th>
              <th className="p-3 border">Ngày tạo</th>
              <th className="p-3 border text-center">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {product.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-3 border">{item.id}</td>

                <td className="p-3 border">
                  <img
                    src={item.hinh_anh}
                    alt={item.tieu_de}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>

                <td className="p-3 border font-medium">{item.tieu_de}</td>

                <td className="p-3 border text-red-600 font-semibold">
                  {Number(item.gia_ban).toLocaleString("vi-VN")}₫
                </td>

                <td className="p-3 border">{item.id_danh_muc}</td>

                <td className="p-3 border">
                  {new Date(item.ngay_tao).toLocaleDateString("vi-VN")}
                </td>

                <td className="p-3 border text-center">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded mr-2">
                    Sửa
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded">
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
