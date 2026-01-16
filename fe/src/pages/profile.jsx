import React, { useEffect, useState } from "react";
import { getMeApi } from "../util/api";

export const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const res = await getMeApi();
        setUser(res.data);
      } catch (error) {
        localStorage.removeItem("access_token");
        console.log(error);
      }
    };
    fetchMe();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Đang tải thông tin...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6">
        {/* Avatar */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Name & Email */}
        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Info */}
        <div className="mt-6 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">User ID</span>
            <span className="font-medium">{user.id}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Token hết hạn</span>
            <span className="font-medium">
              {new Date(user.exp * 1000).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 space-y-3">
          <button
            onClick={() => {
              localStorage.removeItem("access_token");
              window.location.href = "/login";
            }}
            className="w-full py-2 rounded-xl border border-red-500 text-red-500 font-medium hover:bg-red-50 transition"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};
