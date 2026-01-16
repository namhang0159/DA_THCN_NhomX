import React, { useState } from "react";
import { DashboardItem } from "./dashboardItem";
import { useNavigate } from "react-router-dom";
import { dashboardMenu } from "../data/data.jsx";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const sections = [...new Set(dashboardMenu.map((item) => item.section))];
  const handleToggle = (title) => {
    setOpenMenu(openMenu === title ? null : title);
  };
  return (
    <div className="flex flex-col gap-2 bg-white p-4 w-64 shadow-sm min-h-screen mt-5">
      {sections.map((section) => (
        <div key={section}>
          <p className="text-gray-600 opacity-75 mt-8 ml-4">{section}</p>

          {dashboardMenu
            .filter((item) => item.section === section)
            .map((item, index) => (
              <div key={index}>
                {/* MENU CHA */}
                <div
                  onClick={() =>
                    item.children
                      ? handleToggle(item.title)
                      : navigate(item.path)
                  }
                >
                  <DashboardItem img={item.icon} title={item.title} />
                </div>

                {/* MENU CON */}
                {item.children && openMenu === item.title && (
                  <div className="ml-10 mt-2 flex flex-col gap-2">
                    {item.children.map((child, idx) => (
                      <div
                        key={idx}
                        onClick={() => navigate(child.path)}
                        className="text-gray-700 hover:text-blue-600 cursor-pointer"
                      >
                        {child.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};
