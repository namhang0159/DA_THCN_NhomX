import React from "react";
import { DashboardItem } from "./dashboardItem";
import { useNavigate } from "react-router-dom";
import { dashboardMenu } from "../data/data.jsx";

export const Dashboard = () => {
  const navigate = useNavigate();

  const sections = [...new Set(dashboardMenu.map((item) => item.section))];

  return (
    <div className="flex flex-col gap-2 bg-white p-4 w-64 shadow-sm min-h-screen">
      {sections.map((section) => (
        <div key={section}>
          <p className="text-gray-600 opacity-75 mt-8 ml-4">{section}</p>
          {dashboardMenu
            .filter((item) => item.section === section)
            .map((item, index) => (
              <div key={index} onClick={() => item.path && navigate(item.path)}>
                <DashboardItem img={item.icon} title={item.title} />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};
