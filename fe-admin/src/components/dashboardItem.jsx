import React from "react";

export const DashboardItem = ({ img, title, active }) => {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition 
        ${
          active
            ? "bg-blue-100 text-blue-600 font-semibold"
            : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
        }`}
    >
      <div className="text-xl">{img}</div>
      <span>{title}</span>
    </div>
  );
};
