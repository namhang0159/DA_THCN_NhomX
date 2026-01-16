import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getTagProApi,
  getSanphamApi,
  createTagProAPI,
  deleteTagProAPI,
} from "../../util/api";

export const ListInfo = () => {
  const { id } = useParams(); // id_tag
  const navigate = useNavigate();

  const [productsByTag, setProductsByTag] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState("");

  // ===== FETCH =====
  const fetchData = async () => {
    try {
      const [tagRes, productRes] = await Promise.all([
        getTagProApi(id),
        getSanphamApi(),
      ]);

      setProductsByTag(tagRes.data || []);
      setAllProducts(productRes.data || []);
    } catch (err) {
      console.error("Lỗi load dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // ===== FILTER SP CHƯA CÓ TAG =====
  const productNotInTag = allProducts.filter(
    (p) => !productsByTag.some((t) => t.id === p.id)
  );

  // ===== ADD =====
  const handleAddProduct = async () => {
    if (!selectedProduct) return alert("Chọn sản phẩm");

    await createTagProAPI(Number(selectedProduct), Number(id));
    setSelectedProduct("");
    fetchData();
  };

  // ===== REMOVE =====
  const handleRemove = async (id_sanpham) => {
    if (window.confirm("Xóa sản phẩm khỏi tag này?")) {
      await deleteTagProAPI(id_sanpham, id);
      fetchData();
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          🏷️ Quản lý sản phẩm theo Tag #{id}
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          ← Quay lại
        </button>
      </div>

      {/* ADD PRODUCT */}
      <div className="bg-white shadow rounded-lg p-4 mb-6 flex gap-3">
        <select
          className="border rounded px-3 py-2 flex-1"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
        >
          <option value="">-- Chọn sản phẩm --</option>
          {productNotInTag.map((p) => (
            <option key={p.id} value={p.id}>
              #{p.id} - {p.tieu_de}
            </option>
          ))}
        </select>

        <button
          onClick={handleAddProduct}
          className="px-5 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
        >
          + Thêm vào tag
        </button>
      </div>

      {/* TABLE */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">Đang tải...</div>
      ) : productsByTag.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          Không có sản phẩm nào thuộc tag này
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 border w-16 text-center">#</th>
                <th className="p-4 border">Hình ảnh</th>
                <th className="p-4 border text-left">Tên sản phẩm</th>
                <th className="p-4 border text-center">Giá bán</th>
                <th className="p-4 border text-center">Ngày tạo</th>
                <th className="p-4 border text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {productsByTag.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 border text-center">{index + 1}</td>

                  <td className="p-4 border">
                    <img
                      src={item.hinh_anh}
                      alt={item.tieu_de}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>

                  <td className="p-4 border font-medium">{item.tieu_de}</td>

                  <td className="p-4 border text-center text-red-600 font-semibold">
                    {Number(item.gia_ban).toLocaleString("vi-VN")} ₫
                  </td>

                  <td className="p-4 border text-center text-sm text-gray-600">
                    {new Date(item.ngay_tao).toLocaleDateString("vi-VN")}
                  </td>

                  <td className="p-4 border text-center ">
                    <button
                      onClick={() => navigate(`/products/info/${item.id}`)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                    >
                      Xem chi tiết
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="px-3 py-1 ml-2 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                    >
                      Xóa khỏi tag
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
