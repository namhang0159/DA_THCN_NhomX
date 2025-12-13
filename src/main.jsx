import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MainLayout } from "./layouts/mainlayout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import { Statistical } from "./pages/statistical/statistical.jsx";
import { Product } from "./pages/product.jsx";
import { OrderStatusChart } from "./pages/statistical/orders.jsx";
import { Topproducts } from "./pages/statistical/top-products.jsx";
import { ReviewStatistic } from "./pages/statistical/review.jsx";
import { ProductAdd } from "./pages/modal.jsx";

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
      {
        path: "/statistical/orders",
        element: <OrderStatusChart />,
      },
      {
        path: "/statistical/top-products",
        element: <Topproducts />,
      },
      {
        path: "/statistical/reviews",
        element: <ReviewStatistic />,
      },
      {
        path: "/products/add",
        element: <ProductAdd />,
      },
      {
        path: `/products/edit/:id`,
        element: <ProductAdd />,
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
