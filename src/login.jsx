import React from "react";
import { useNavigate } from "react-router-dom";
import { loginUserApi } from "./util/api";
const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Form values:", { email, password });

    try {
      const res = await loginUserApi(email, password);
      if (res && res.data.user.EC === 0) {
        localStorage.setItem("access_token", res.data.user.access_token);
        alert(res.data.message);
        navigate("/");
        window.location.reload();
      } else {
        console.log("API ERROR");
        alert(res.data.EM || "error");
      }
    } catch (error) {
      console.log("API ERROR:", error.response?.data || error.message);
      alert("Đăng nhập thất bại! Vui lòng thử lại hoặc kiểm tra thông tin.");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 m-0">
      <form
        onSubmit={onFinish}
        className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Đăng Nhập</h2>
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
          Đăng nhập
        </button>

        <p>
          Chưa có tài khoản
          <a
            href="#!"
            onClick={() => {
              navigate("/Register");
            }}
            className="text-blue-500"
          >
            Đăng Ký
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
