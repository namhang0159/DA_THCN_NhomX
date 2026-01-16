import React, { useEffect, useState } from "react";
import {
  createBlogApi,
  deleteBlogApi,
  getBlogsApi,
  updateBlogApi,
} from "../util/api";

export const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    tieu_de: "",
    noi_dung: "",
    hinh_anh: "",
    video: "",
    id_sanpham: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchBlogs = async () => {
    const res = await getBlogsApi();
    console.log(res);
    if (res.data.EC === 0) {
      setBlogs(res.data.DT);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editId) {
      await updateBlogApi(editId, form);
    } else {
      await createBlogApi(form);
    }
    setForm({
      tieu_de: "",
      noi_dung: "",
      hinh_anh: "",
      video: "",
      id_sanpham: "",
    });
    setEditId(null);
    fetchBlogs();
  };

  const handleEdit = (blog) => {
    setEditId(blog.id);
    setForm(blog);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xóa blog này?")) {
      await deleteBlogApi(id);
      fetchBlogs();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Quản lý Blog</h2>

      {/* FORM */}
      <div className="border p-4 rounded mb-6">
        <input
          name="tieu_de"
          placeholder="Tiêu đề"
          value={form.tieu_de}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <textarea
          name="noi_dung"
          placeholder="Nội dung"
          value={form.noi_dung}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          name="hinh_anh"
          placeholder="Link hình ảnh"
          value={form.hinh_anh}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          name="video"
          placeholder="ID video YOUTUBE"
          value={form.video}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          hidden
        />
        <input
          name="id_sanpham"
          placeholder="ID sản phẩm"
          value={form.id_sanpham}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editId ? "Cập nhật Blog" : "Thêm Blog"}
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Tiêu đề</th>
            <th className="border p-2">Sản phẩm</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td className="border p-2">{blog.id}</td>
              <td className="border p-2">{blog.tieu_de}</td>
              <td className="border p-2">
                {blog.SanPham?.ten_sanpham || blog.id_sanpham}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="bg-yellow-400 px-2 py-1 mr-2 rounded"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
