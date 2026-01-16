import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUserApi } from "../util/api";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onFinish = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await loginUserApi(email, password);
      console.log(res);
      if (res && res.data.user.EC === 0) {
        localStorage.setItem("access_token", res.data.user.access_token);
        alert(res.data.message);
        navigate("/");
        window.location.reload();
      } else if (res.data.EC == 2) {
        alert("Tài khoản của bạn đã bị khóa");
        return;
      } else {
        alert(res.data.EM || "Đăng nhập thất bại");
      }
    } catch (error) {
      alert("Đăng nhập thất bại!", error);
    }
  };

  return (
    <div className="bg-background-light min-h-screen flex flex-col font-display">
      {/* ===== MAIN ===== */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-[1200px] bg-surface-light rounded-2xl shadow-xl overflow-hidden border border-[#e5e7eb] flex flex-col md:flex-row min-h-[600px]">
          {/* ===== LEFT FORM ===== */}
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex items-center">
            <div className="max-w-[400px] mx-auto w-full flex flex-col gap-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Welcome back
                </h1>
                <p className="text-gray-500 mt-2">
                  Đăng nhập và trải nghiệm dịch vụ của chúng tôi.
                </p>
              </div>

              <form onSubmit={onFinish} className="flex flex-col gap-5">
                <div>
                  <label className="text-sm font-medium">Email address</label>
                  <div className="relative mt-1">
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="name@example.com"
                      className="w-full h-12 rounded-lg border border-[#dbe0e6] pl-2 pr-4 text-base placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary transition"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium">Password</label>
                  </div>
                  <div className="relative mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      placeholder="Enter your password"
                      className="w-full h-12 rounded-lg border border-[#dbe0e6] pl-2 pr-11 text-base placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <span className="material-symbols-outlined text-[20px]">
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
                  className="w-full h-12 bg-primary bg-blue-600 hover:bg-blue-300 text-white font-bold rounded-lg shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
                >
                  <span>Sign in</span>
                </button>
              </form>

              <p className="text-center text-sm text-gray-600">
                Không có tài khoản
                <span
                  onClick={() => navigate("/Register")}
                  className="font-bold text-primary cursor-pointer hover:underline"
                >
                  Đăng ký ngay
                </span>
              </p>
            </div>
          </div>

          {/* ===== RIGHT IMAGE ===== */}
          <div className="hidden md:block w-1/2 relative">
            <img
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
              alt="phone"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-12 flex flex-col justify-end text-white">
              <h2 className="text-4xl font-bold mb-3">
                Nâng cấp trải nghiệm công nghệ.
              </h2>
              <p className="text-white/80 max-w-md">
                Nơi bán điện thoại uy tín hàng đầu Việt Nam.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
