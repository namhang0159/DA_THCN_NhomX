import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Register from "./Register.jsx";
import Login from "./login.jsx";
import { Layout } from "./layout.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import PageSP from "./PageSP.jsx";
import { PageAll } from "./PageAll.jsx";
import Payment from "./payment.jsx";
import ShoppingCard from "./shoppingcart.jsx";
import PageSearch from "./PageSearch.jsx";
import Result from "./result.jsx";
import Orders from "./orders.jsx";
import { Orderinfo } from "./orderinfo.jsx";
import { Review } from "./pages/review.jsx";
import { Allreview } from "./pages/allreview.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/pageSP/:id",
        element: <PageSP />,
      },
      {
        path: "/pageall",
        element: <PageAll />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/shoppingcard",
        element: <ShoppingCard />,
      },
      {
        path: "/pagesearch",
        element: <PageSearch></PageSearch>,
      },
      {
        path: "/result",
        element: <Result></Result>,
      },
      {
        path: "/order",
        element: <Orders></Orders>,
      },
      {
        path: "/orderinfo/:id",
        element: <Orderinfo />,
      },
      {
        path: "/review",
        element: <Review />,
      },
      {
        path: "/allreview",
        element: <Allreview />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>
);
