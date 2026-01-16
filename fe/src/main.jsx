import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";
// import Register from "./Register.jsx";
// import Login from "./login.jsx";
import { Layout } from "./layout.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
// import PageSP from "./PageSP.jsx";
// import { PageAll } from "./PageAll.jsx";
// import Payment from "./payment.jsx";
// import ShoppingCard from "./pages/shoppingcart.jsx";
// import PageSearch from "./PageSearch.jsx";
// import Result from "./result.jsx";
// import Orders from "./orders.jsx";
// import { Orderinfo } from "./orderinfo.jsx";
import { Review } from "./pages/review.jsx";
import { Allreview } from "./pages/allreview.jsx";
import { Contact } from "./pages/contact.jsx";
import { About } from "./pages/about.jsx";
import { Profile } from "./pages/profile.jsx";
import App from "./pages/App.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/login.jsx";
import PageSP from "./pages/PageSP.jsx";
import { PageAll } from "./pages/PageAll.jsx";
import Payment from "./pages/payment.jsx";
import ShoppingCard from "./pages/shoppingcart.jsx";
import PageSearch from "./pages/PageSearch.jsx";
import Result from "./pages/result.jsx";
import Orders from "./pages/orders.jsx";
import { Orderinfo } from "./pages/orderinfo.jsx";
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
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>
);
