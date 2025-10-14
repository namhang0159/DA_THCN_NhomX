import React from "react";
import { createUserApi } from "./util/api";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Form values:", { name, email, password });

    const res = await createUserApi(name, email, password);
    if (res) {
      alert("DONE!");
      navigate("/login");
    } else {
      console.log("API ERROR");
      alert("Đăng ký thất bại! Vui lòng thử lại hoặc kiểm tra thông tin.");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 m-0">
      <form
        onSubmit={onFinish}
        className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Đăng ký</h2>

        <div>
          <label className="block text-sm font-medium">Họ và tên</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="Nguyễn Văn A"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Mật khẩu</label>
          <input
            type="password"
            name="password"
            className="w-full border rounded px-3 py-2 mt-1"
            placeholder="******"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Đăng ký
        </button>

        <p>
          Đã có tài khoản
          <a
            href="#!"
            onClick={() => {
              navigate("/login");
            }}
            className="text-blue-500"
          >
            Đăng Nhập
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
