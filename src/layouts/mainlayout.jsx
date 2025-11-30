import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/header";
import { Dashboard } from "../components/dashboard";

export const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <Header></Header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:block">
          <Dashboard />
        </aside>

        {/* Nội dung chính */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white shadow-sm rounded-xl p-6 h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
