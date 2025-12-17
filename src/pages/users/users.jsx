import React, { useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  banUserAPI,
  deleteUserAPI,
  getUsersApi,
  updateUserAPI,
} from "../../util/api";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 5;

  const fetchUser = async () => {
    const res = await getUsersApi();
    setUsers(res.data || []);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ===== PAGINATION =====
  const pageCount = Math.ceil(users.length / itemsPerPage);

  const currentUsers = useMemo(() => {
    const offset = currentPage * itemsPerPage;
    return users.slice(offset, offset + itemsPerPage);
  }, [users, currentPage]);

  // ===== MODAL =====
  const openEditModal = (user) => {
    setCurrentUser(user.id);
    setFormData({ name: user.name, email: user.email });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentUser(null);
  };

  const handleUpdateUser = async () => {
    await updateUserAPI(currentUser, formData);
    closeModal();
    fetchUser();
  };

  // ===== XÓA =====
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa user này?")) {
      await deleteUserAPI(id);
      fetchUser();
    }
  };

  // ===== BAN =====
  const handleBan = async (id, isBan) => {
    const text = isBan === 1 ? "BAN user này?" : "MỞ KHÓA user này?";
    if (window.confirm(text)) {
      await banUserAPI(id, isBan);
      fetchUser();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* CARD */}
      <div className="bg-white rounded-2xl shadow-lg border">
        {/* HEADER */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Quản lý User</h2>
          <span className="text-sm text-gray-500">
            Tổng: {users.length} user
          </span>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="p-4 border">#</th>
                <th className="p-4 border text-left">Tên</th>
                <th className="p-4 border text-left">Email</th>
                <th className="p-4 border text-center">Trạng thái</th>
                <th className="p-4 border text-center">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="p-4 border text-center font-semibold">
                      {currentPage * itemsPerPage + index + 1}
                    </td>

                    <td className="p-4 border font-medium">{user.name}</td>

                    <td className="p-4 border text-gray-600">{user.email}</td>

                    <td className="p-4 border text-center">
                      {user.isBan === 1 ? (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                          ● Bị ban
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          ● Hoạt động
                        </span>
                      )}
                    </td>

                    <td className="p-4 border text-center space-x-1">
                      <button
                        onClick={() => openEditModal(user)}
                        className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                      >
                        Sửa
                      </button>

                      <button
                        onClick={() => handleDelete(user.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                      >
                        Xóa
                      </button>

                      <button
                        onClick={() =>
                          handleBan(user.id, user.isBan === 0 ? 1 : 0)
                        }
                        className={`px-2 py-1 rounded text-xs text-white ${
                          user.isBan === 0
                            ? "bg-gray-700 hover:bg-gray-800"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {user.isBan === 1 ? "UNBAN" : "BAN"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500">
                    Chưa có user
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

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4">Sửa User</h3>

            <div className="mb-4">
              <label className="text-sm font-medium">Tên</label>
              <input
                className="w-full mt-1 px-3 py-2 border rounded focus:ring focus:ring-blue-300"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium">Email</label>
              <input
                className="w-full mt-1 px-3 py-2 border rounded focus:ring focus:ring-blue-300"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleUpdateUser}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
