import React, { useState } from "react";
import { createCateAPI } from "../../util/api";
import { useNavigate } from "react-router-dom";

export const AddCate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ten_danh_muc: "",
    hinh_anh: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.ten_danh_muc) {
      alert("Vui lòng nhập tên danh mục");
      return;
    }

    try {
      setLoading(true);
      await createCateAPI(formData.ten_danh_muc, formData.hinh_anh);
      alert("Thêm danh mục thành công");
      navigate("/category");
    } catch (err) {
      alert("Thêm danh mục thất bại", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg border p-6">
        <h2 className="text-2xl font-bold mb-6"> Thêm danh mục</h2>

        <div className="mb-4">
          <label className="text-sm font-medium">Tên danh mục</label>
          <input
            className="w-full mt-1 px-4 py-2 border rounded"
            value={formData.ten_danh_muc}
            onChange={(e) =>
              setFormData({ ...formData, ten_danh_muc: e.target.value })
            }
            placeholder="VD: Samsung,..."
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium">Hình ảnh (URL)</label>
          <input
            className="w-full mt-1 px-4 py-2 border rounded"
            value={formData.hinh_anh}
            onChange={(e) =>
              setFormData({ ...formData, hinh_anh: e.target.value })
            }
          />
        </div>

        {formData.hinh_anh && (
          <img
            src={formData.hinh_anh}
            className="w-32 h-32 object-cover rounded-xl shadow mb-4"
          />
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => navigate("/category")}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-amber-500 text-white rounded"
          >
            {loading ? "Đang lưu..." : "Thêm"}
          </button>
        </div>
      </div>
    </div>
  );
};
