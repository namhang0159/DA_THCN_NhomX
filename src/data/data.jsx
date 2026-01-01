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
    path: "/orders",
    section: "MENU",
  },
  {
    title: "Danh mục",
    icon: <i className="fa-solid fa-codepen"></i>,
    path: "/category",
    section: "MENU",
  },
  {
    title: "Nhãn",
    icon: <i className="fa-solid fa-tag"></i>,
    path: "/tag",
    section: "MENU",
  },
  {
    title: "Đánh giá",
    icon: <i className="fa-solid fa-comment"></i>,
    path: "/feedback",
    section: "MENU",
  },
  {
    title: "Blog",
    icon: <i className="fa-solid fa-comment"></i>,
    path: "/blog",
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
