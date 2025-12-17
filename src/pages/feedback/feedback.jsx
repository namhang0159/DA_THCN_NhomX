import React, { useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { getDanhGiaApi, banDanhGiaApi } from "../../util/api";

export const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 5;

  const fetchFeedback = async () => {
    try {
      const res = await getDanhGiaApi();
      setFeedbacks(res.data || []);
    } catch (err) {
      console.error("Lỗi load đánh giá:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  // ===== PAGINATION =====
  const pageCount = Math.ceil(feedbacks.length / itemsPerPage);

  const currentFeedbacks = useMemo(() => {
    const offset = currentPage * itemsPerPage;
    return feedbacks.slice(offset, offset + itemsPerPage);
  }, [feedbacks, currentPage]);

  // ===== BAN / UNBAN =====
  const handleBan = async (id, is_ban) => {
    const text = is_ban === 1 ? "BAN đánh giá này?" : "MỞ KHÓA đánh giá này?";
    if (!window.confirm(text)) return;

    await banDanhGiaApi(id, is_ban);
    fetchFeedback();
  };

  const renderStars = (count) => "⭐".repeat(count);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg border">
        {/* HEADER */}
        <div className="p-4 border-b">
          <h2 className="text-2xl font-bold"> Quản lý Đánh giá</h2>
          <p className="text-sm text-gray-500">
            Tổng: {feedbacks.length} đánh giá
          </p>
        </div>

        {/* TABLE */}
        {loading ? (
          <div className="text-center py-10 text-gray-500">Đang tải...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="p-4 border text-center">#</th>
                  <th className="p-4 border text-left">User</th>
                  <th className="p-4 border text-left">Sản phẩm</th>
                  <th className="p-4 border text-center">Sao</th>
                  <th className="p-4 border text-left">Nội dung</th>
                  <th className="p-4 border text-center">Trạng thái</th>
                  <th className="p-4 border text-center">Hành động</th>
                </tr>
              </thead>

              <tbody>
                {currentFeedbacks.length > 0 ? (
                  currentFeedbacks.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="p-4 border text-center font-semibold">
                        {currentPage * itemsPerPage + index + 1}
                      </td>

                      <td className="p-4 border">
                        <div className="font-medium">
                          {item.user?.name || "Ẩn"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.user?.email}
                        </div>
                      </td>

                      <td className="p-4 border">
                        #{item.sanpham?.id} - {item.sanpham?.tieu_de}
                      </td>

                      <td className="p-4 border text-center text-yellow-500">
                        {renderStars(item.so_sao)}
                      </td>

                      <td className="p-4 border max-w-sm">
                        <p className="line-clamp-2 text-sm">
                          {item.noi_dung || "—"}
                        </p>
                      </td>

                      <td className="p-4 border text-center">
                        {item.is_ban === 1 ? (
                          <span className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded">
                            BỊ BAN
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded">
                            HIỂN THỊ
                          </span>
                        )}
                      </td>

                      <td className="p-4 border text-center">
                        <button
                          onClick={() =>
                            handleBan(item.id, item.is_ban === 0 ? 1 : 0)
                          }
                          className={`px-3 py-1 text-xs rounded text-white ${
                            item.is_ban === 0
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-gray-700 hover:bg-gray-800"
                          }`}
                        >
                          {item.is_ban === 1 ? "UNBAN" : "BAN"}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-6 text-center text-gray-500">
                      Chưa có đánh giá
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
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
