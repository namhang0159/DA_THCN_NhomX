export const dashboardMenu = [
  {
    title: "Trang chủ",
    icon: <i className="fa-solid fa-house"></i>,
    path: "/",
    section: "MENU",
  },
  {
    title: "Khách hàng",
    icon: <i className="fa-solid fa-user"></i>,
    path: "/customers",
    section: "MENU",
  },
  {
    title: "Sản phẩm",
    icon: <i className="fa-solid fa-box"></i>,
    path: "/product",
    section: "MENU",
  },
  {
    title: "Đơn hàng",
    icon: <i className="fa-solid fa-clipboard-list"></i>,
    path: "/order",
    section: "MENU",
  },
  {
    title: "Phương thức thanh toán",
    icon: <i className="fa-solid fa-cart-shopping"></i>,
    path: "/payments",
    section: "MENU",
  },
  {
    title: "Thống kê",
    icon: <i className="fa-solid fa-dashboard"></i>,
    path: "/statistical",
    section: "ORDER",
    children: [
      { title: "Thống kê doanh thu", path: "/statistical" },
      { title: "Thống kê đơn hàng", path: "/statistical/orders" },
      { title: "Sản phẩm bán chạy", path: "/statistical/top-products" },
      { title: "Thống kê đánh giá", path: "/statistical/reviews" },
    ],
  },
];
