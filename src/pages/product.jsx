import React, { useEffect, useState } from "react";
import { getSanphamApi, deleteSanPhamAPI, getDanhMucApi } from "../util/api";
import { useNavigate } from "react-router-dom";

export const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch sản phẩm
  const fetchProducts = async () => {
    try {
      const res = await getSanphamApi();
      setProducts(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    }
  };

  // Fetch danh mục
  const fetchCategories = async () => {
    try {
      const res = await getDanhMucApi();
      setCategories(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh mục:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Xử lý xóa
  const handleDelete = async (id) => {
    try {
      await deleteSanPhamAPI(id);
      fetchProducts();
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };

  const handleAdd = () => navigate("/products/add");
  const handleEdit = (id) => navigate(`/products/edit/${id}`);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <button
          onClick={handleAdd}
          className="bg-amber-500 rounded-2xl text-white font-bold px-4 py-2"
        >
          + Thêm sản phẩm
        </button>
      </div>

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
            {products.map((item) => {
              const categoryName = categories.find(
                (c) => c.id === item.id_danh_muc
              )?.ten_danh_muc;

              return (
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
                  <td className="p-3 border">{categoryName}</td>
                  <td className="p-3 border">
                    {new Date(item.ngay_tao).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
