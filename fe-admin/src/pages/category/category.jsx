import React, { useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { deleteCateAPI, getDanhMucApi } from "../../util/api";
import { useNavigate } from "react-router-dom";

export const Category = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  const itemsPerPage = 5;

  const fetchDanhMuc = async () => {
    const res = await getDanhMucApi();
    setCategories(res.data || []);
  };

  useEffect(() => {
    fetchDanhMuc();
  }, []);

  // ===== PAGINATION =====
  const pageCount = Math.ceil(categories.length / itemsPerPage);

  const currentCategories = useMemo(() => {
    const offset = currentPage * itemsPerPage;
    return categories.slice(offset, offset + itemsPerPage);
  }, [categories, currentPage]);

  // ===== XÓA =====
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa danh mục này?")) return;
    await deleteCateAPI(id);
    fetchDanhMuc();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-lg border">
        {/* HEADER */}
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Quản lý danh mục</h2>
            <p className="text-sm text-gray-500">
              Tổng: {categories.length} danh mục
            </p>
          </div>

          <button
            onClick={() => navigate("/categories/add")}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl font-semibold"
          >
            + Thêm danh mục
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="p-4 border">#</th>
                <th className="p-4 border">Hình ảnh</th>
                <th className="p-4 border text-left">Tên danh mục</th>
                <th className="p-4 border text-center">Ngày tạo</th>
                <th className="p-4 border text-center">Ngày sửa</th>
                <th className="p-4 border text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {currentCategories.length > 0 ? (
                currentCategories.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="p-4 border text-center font-semibold">
                      {currentPage * itemsPerPage + index + 1}
                    </td>

                    <td className="p-4 border">
                      <img
                        src={item.hinh_anh}
                        alt={item.ten_danh_muc}
                        className="h-16 object-cover rounded-xl shadow"
                      />
                    </td>

                    <td className="p-4 border font-medium">
                      {item.ten_danh_muc}
                    </td>

                    <td className="p-4 border text-center text-sm text-gray-600">
                      {item.ngay_tao
                        ? new Date(item.ngay_tao).toLocaleDateString("vi-VN")
                        : "—"}
                    </td>

                    <td className="p-4 border text-center text-sm text-gray-600">
                      {item.ngay_sua
                        ? new Date(item.ngay_sua).toLocaleDateString("vi-VN")
                        : "—"}
                    </td>

                    <td className="p-4 border text-center space-x-1">
                      <button
                        onClick={() => navigate(`/categories/edit/${item.id}`)}
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
                  <td colSpan="6" className="p-6 text-center text-gray-500">
                    Chưa có danh mục
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
