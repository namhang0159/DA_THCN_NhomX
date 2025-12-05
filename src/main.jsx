import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MainLayout } from "./layouts/mainlayout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import { Statistical } from "./pages/statistical.jsx";
import { Product } from "./pages/product.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/statistical",
        element: <Statistical />,
      },
      {
        path: "/product",
        element: <Product />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
