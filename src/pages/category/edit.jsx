import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDanhMucApi, updateCateAPI } from "../../util/api";

export const EditCate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ten_danh_muc: "",
    hinh_anh: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await getDanhMucApi();
      const cate = res.data.find((c) => String(c.id) === String(id));
      if (cate) {
        setFormData({
          ten_danh_muc: cate.ten_danh_muc,
          hinh_anh: cate.hinh_anh,
        });
      }
    };
    fetchDetail();
  }, [id]);

  const handleSubmit = async () => {
    if (!formData.ten_danh_muc) {
      alert("Tên danh mục không được để trống");
      return;
    }

    try {
      setLoading(true);
      await updateCateAPI(id, formData.ten_danh_muc, formData.hinh_anh);
      alert("Cập nhật thành công");
      navigate("/category");
    } catch (error) {
      alert("Cập nhật thất bại", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg border p-6">
        <h2 className="text-2xl font-bold mb-6"> Sửa danh mục</h2>

        <div className="mb-4">
          <label className="text-sm font-medium">Tên danh mục</label>
          <input
            className="w-full mt-1 px-4 py-2 border rounded"
            value={formData.ten_danh_muc}
            onChange={(e) =>
              setFormData({ ...formData, ten_danh_muc: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium">Hình ảnh</label>
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
            className=" h-32 object-cover rounded-xl shadow mb-4"
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
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
};
