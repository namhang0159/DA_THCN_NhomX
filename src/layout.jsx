import React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "./compoment/Header";
import Footer from "./compoment/Footer";

export const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
