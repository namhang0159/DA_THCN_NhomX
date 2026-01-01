import React, { useEffect, useMemo, useState } from "react";
import { getSanphamApi, deleteSanPhamAPI, getDanhMucApi } from "../../util/api";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

export const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const itemsPerPage = 5;

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const res = await getSanphamApi();
    setProducts(res.data || []);
  };

  const fetchCategories = async () => {
    const res = await getDanhMucApi();
    setCategories(res.data || []);
  };

  const pageCount = Math.ceil(products.length / itemsPerPage);

  const currentProducts = useMemo(() => {
    const offset = currentPage * itemsPerPage;
    return products.slice(offset, offset + itemsPerPage);
  }, [products, currentPage]);

  const getCategoryName = (id) =>
    categories.find((c) => c.id === id)?.ten_danh_muc || "—";

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    await deleteSanPhamAPI(id);
    fetchProducts();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg border">
        {/* HEADER */}
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold"> Quản lý sản phẩm</h1>
            <p className="text-sm text-gray-500">
              Tổng: {products.length} sản phẩm
            </p>
          </div>

          <button
            onClick={() => navigate("/products/add")}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl font-semibold"
          >
            + Thêm sản phẩm
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="p-4 border">ID</th>
                <th className="p-4 border">Hình ảnh</th>
                <th className="p-4 border">Tên sản phẩm</th>
                <th className="p-4 border">Giá</th>
                <th className="p-4 border">Danh mục</th>
                <th className="p-4 border">Ngày tạo</th>
                <th className="p-4 border text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {currentProducts.length > 0 ? (
                currentProducts.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="p-4 border font-semibold text-center">
                      #{item.id}
                    </td>

                    <td className="p-4 border">
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
                        className="w-16 h-16 object-cover rounded-xl shadow"
                      />
                    </td>

                    <td
                      className="p-4 border font-medium cursor-pointer hover:text-amber-600"
                      onClick={() => navigate(`/products/info/${item.id}`)}
                    >
                      {item.tieu_de}
                    </td>

                    <td className="p-4 border text-red-600 font-bold text-center">
                      {Number(item.gia_ban).toLocaleString("vi-VN")} ₫
                    </td>

                    <td className="p-4 border text-center">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                        {getCategoryName(item.id_danh_muc)}
                      </span>
                    </td>

                    <td className="p-4 border text-center text-sm text-gray-600">
                      {new Date(item.ngay_tao).toLocaleDateString("vi-VN")}
                    </td>

                    <td className="p-4 border text-center space-x-1">
                      <button
                        onClick={() => navigate(`/products/edit/${item.id}`)}
                        className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-6 text-center text-gray-500">
                    Chưa có sản phẩm
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <ReactPaginate
        previousLabel="‹"
        nextLabel="›"
        breakLabel="..."
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        onPageChange={(e) => setCurrentPage(e.selected)}
        containerClassName="flex justify-center items-center gap-2 mt-6"
        pageClassName="px-3 py-1 border rounded text-sm hover:bg-gray-100 cursor-pointer"
        activeClassName="bg-red-500 text-white font-bold"
        previousClassName="px-3 border rounded hover:bg-gray-100"
        nextClassName="px-3 border rounded hover:bg-gray-100"
      />
    </div>
  );
};
