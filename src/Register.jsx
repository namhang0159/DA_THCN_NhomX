import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserApi } from "./util/api";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onFinish = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirm = formData.get("confirm");

    if (password !== confirm) {
      alert("Mật khẩu xác nhận không khớp");
      return;
    }

    const res = await createUserApi(name, email, password);
    if (res) {
      alert("Đăng ký thành công!");
      navigate("/login");
    } else {
      alert("Đăng ký thất bại!");
    }
  };

  return (
    <div className="min-h-screen flex font-display bg-background-light">
      {/* LEFT IMAGE */}
      <div className="hidden lg:flex w-1/2 relative bg-black">
        <img
          src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
          alt="phones"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 mt-auto p-16 text-white max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs mb-6">
            <span className="material-symbols-outlined text-sm">HOT</span>
            Siêu ưu đãi
          </div>

          <h1 className="text-4xl font-bold mb-4">
            Khám phá thế giới công nghệ với nhiều ưu đãi lớn.
          </h1>

          <p className="text-gray-200">
            Với hơn 90.000 lượt bán nhận về phản hồi tích cực.
          </p>

          <div className="flex gap-8 mt-10">
            <div>
              <p className="text-2xl font-bold">50k+</p>
              <p className="text-sm text-gray-300">Khách hàng</p>
            </div>
            <div>
              <p className="text-2xl font-bold">4.9</p>
              <p className="text-sm text-gray-300">Rating</p>
            </div>
            <div>
              <p className="text-2xl font-bold">24h</p>
              <p className="text-sm text-gray-300">Giao hàng</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[420px] bg-white p-8 rounded-xl shadow-lg">
          {/* HEADER */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-black mb-2">Tạo account</h2>
            <p className="text-gray-500">
              Tham gia với chúng tôi để sở hữu điện thoại mới nhất với giá tốt
              nhất .
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={onFinish} className="space-y-5">
            {/* NAME */}
            <div>
              <label className="text-sm font-medium">Họ Tên</label>
              <input
                name="name"
                required
                placeholder="Nguyễn Văn A"
                className="mt-1 w-full h-11 px-4 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="mt-1 w-full h-11 px-4 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Tối thiểu 8 ký tự"
                  className="mt-1 w-full h-11 px-4 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? (
                      <i class="fa fa-eye-slash" aria-hidden="true"></i>
                    ) : (
                      <i class="fa fa-eye" aria-hidden="true"></i>
                    )}
                  </span>
                </button>
              </div>
            </div>

            {/* CONFIRM */}
            <div>
              <label className="text-sm font-medium">Xác nhận Password</label>
              <div className="relative">
                <input
                  name="confirm"
                  type={showConfirm ? "text" : "password"}
                  required
                  placeholder="Nhập lại password"
                  className="mt-1 w-full h-11 px-4 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? (
                      <i class="fa fa-eye-slash" aria-hidden="true"></i>
                    ) : (
                      <i class="fa fa-eye" aria-hidden="true"></i>
                    )}
                  </span>
                </button>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full h-11 bg-primary bg-blue-600 hover:bg-blue-200 text-white font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
            >
              Đăng ký
            </button>
          </form>

          {/* FOOTER */}
          <p className="mt-6 text-sm text-center text-gray-500">
            Đã có tài khoản?
            <span
              onClick={() => navigate("/login")}
              className="ml-1 font-bold text-primary cursor-pointer hover:underline"
            >
              Đăng nhập
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
