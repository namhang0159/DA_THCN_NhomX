import React, { useEffect, useState } from "react";
import {
  getTagApi,
  createTagAPI,
  updateTagAPI,
  deleteTagAPI,
} from "../../util/api";
import { useNavigate } from "react-router-dom";

export const Tag = () => {
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [tenTag, setTenTag] = useState("");

  // ===== FETCH =====
  const fetchTag = async () => {
    const res = await getTagApi();
    if (res.data) setTags(res.data);
  };

  useEffect(() => {
    fetchTag();
  }, []);

  // ===== MODAL =====
  const openAddModal = () => {
    setIsEdit(false);
    setTenTag("");
    setShowModal(true);
  };

  const openEditModal = (tag) => {
    setIsEdit(true);
    setCurrentId(tag.id);
    setTenTag(tag.ten_tag);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTenTag("");
    setCurrentId(null);
  };

  // ===== SAVE =====
  const handleSave = async () => {
    if (!tenTag.trim()) {
      alert("Tên tag không được để trống");
      return;
    }

    if (isEdit) {
      await updateTagAPI(currentId, tenTag);
    } else {
      await createTagAPI(tenTag);
    }

    closeModal();
    fetchTag();
  };

  // ===== DELETE =====
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa tag này?")) {
      await deleteTagAPI(id);
      fetchTag();
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border">
      <div className="flex justify-between items-center mb-6 ">
        <h2 className="text-2xl font-semibold">Quản lý Tag</h2>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
        >
          + Thêm Tag
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 border text-center w-16">#</th>
              <th className="px-4 py-3 border text-left">Tên tag</th>
              <th className="px-4 py-3 border text-center w-48">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag, index) => (
              <tr key={tag.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 border text-center">{index + 1}</td>
                <td
                  className="px-4 py-3 border font-medium"
                  onClick={() => navigate(`/tag/info/${tag.id}`)}
                >
                  #{tag.ten_tag}
                </td>
                <td className="px-4 py-3 border text-center space-x-2">
                  <button
                    onClick={() => openEditModal(tag)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(tag.id)}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}

            {tags.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500">
                  Chưa có tag nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              {isEdit ? "✏️ Sửa Tag" : "➕ Thêm Tag"}
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Tên tag</label>
              <input
                className="w-full px-3 py-2 border rounded focus:ring focus:ring-amber-300"
                value={tenTag}
                onChange={(e) => setTenTag(e.target.value)}
                placeholder="VD: SALE, HOT, NEW"
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
                onClick={handleSave}
                className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
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
