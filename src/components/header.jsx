import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMeApi } from "../util/api";
export const Header = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetchMeApi();
        const data = res.data;
        console.log(res);
        if (data) {
          console.log(data);
          setUsername(data.username);
        }
      } catch (error) {
        console.log("Lỗi", error);
        if (error.response && error.response.status === 401) {
          alert("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
          localStorage.removeItem("access_token");
          navigate("/login");
        }
      }
    };
    fetchMe();
  }, []);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="flex items-center justify-between bg-white px-6 py-3 shadow-sm sticky top-0 z-50">
      <div className="text-2xl font-extrabold">RIU DASHBOARD</div>

      <div className="flex gap-6 items-center">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 ">
          <i className="fa fa-user text-gray-500"></i>
          <p className="font-bold">{username}</p>
        </div>
        <button
          className="bg-red-400 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
          onClick={handleLogOut}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
