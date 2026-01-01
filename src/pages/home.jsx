import React, { useEffect, useState } from "react";
import { fetchMeApi } from "../util/api";

export const Home = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetchMeApi();
        if (res?.data) {
          setAdmin(res.data);
        }
      } catch (error) {
        console.log("Lỗi", error);
      }
    };
    fetchMe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Dashboard Admin
        </h2>

        {admin ? (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500">ID</span>
              <span className="font-medium text-gray-800">{admin.id}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Tên</span>
              <span className="font-medium text-gray-800">{admin.name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              <span className="font-medium text-gray-800">{admin.email}</span>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Đang tải thông tin admin...</p>
        )}
      </div>
    </div>
  );
};
