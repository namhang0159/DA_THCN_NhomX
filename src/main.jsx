import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MainLayout } from "./layouts/mainlayout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import { Statistical } from "./pages/statistical/statistical.jsx";
import { Product } from "./pages/product/product.jsx";
import { OrderStatusChart } from "./pages/statistical/orders.jsx";
import { Topproducts } from "./pages/statistical/top-products.jsx";
import { ReviewStatistic } from "./pages/statistical/review.jsx";
import { ProductAdd } from "./pages/product/modal.jsx";
import { Info } from "./pages/product/info.jsx";
import Orders from "./pages/orders/orders.jsx";
import { InfoOrders } from "./pages/orders/info.jsx";
import { Users } from "./pages/users/users.jsx";
import { Category } from "./pages/category/category.jsx";
import { EditCate } from "./pages/category/edit.jsx";
import { AddCate } from "./pages/category/add.jsx";
import { Tag } from "./pages/tag/tag.jsx";
import { ListInfo } from "./pages/tag/listInfo.jsx";
import { Feedback } from "./pages/feedback/feedback.jsx";

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
      {
        path: `/products/info/:id`,
        element: <Info />,
      },
      {
        path: `/orders`,
        element: <Orders />,
      },
      {
        path: `/orders/info/:id`,
        element: <InfoOrders />,
      },
      {
        path: `/customers`,
        element: <Users />,
      },
      {
        path: `/category`,
        element: <Category />,
      },
      {
        path: `/categories/edit/:id`,
        element: <EditCate />,
      },
      {
        path: `/categories/add`,
        element: <AddCate />,
      },
      {
        path: `/tag`,
        element: <Tag />,
      },
      {
        path: `/tag/info/:id`,
        element: <ListInfo />,
      },
      {
        path: `/feedback`,
        element: <Feedback />,
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
