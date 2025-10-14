// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <div>
      <Header />
      <main className="p-5">
        <Outlet />
      </main>
    </div>
  );
};
