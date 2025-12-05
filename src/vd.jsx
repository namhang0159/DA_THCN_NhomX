// ======= Viết hàm gọi API trong file (api.js)
// const getSanphamApi = () => {
//   const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/sanpham`;
//   return axios.get(URL_API);
// };

// ======= Tạo product.jsx
// import React from "react";
// export const Product = () => {
//   return <div>product</div>;
// ======= Qua data.jsx thêm vào thanh dashboaad
// {
//     title: "Sản phẩm",
//     icon: <i className="fa-solid fa-box"></i>,
//     path: "/product",
//     section: "MENU",
//   },
// ======= Chuyển sang main.jsx . Thêm vào
// {
//         path: "/product",
//         element: <Product />,
//       },
// ======= Sao khi thêm chúng ta được
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/statistical",
//         element: <Statistical />,
//       },
//       {
//         path: "/product",
//         element: <Product />,
//       },
//     ],
//   },
//   { path: "/login", element: <Login /> },
// ]);
// ======= Quay lại product.jsx , gọi hàm api từ api.js . Gán res.data vào product
// import React, { useEffect, useState } from "react";
// import { getSanphamApi } from "../util/api";

// export const Product = () => {
//   const [product, setProduct] = useState([]);
//   useEffect(() => {
//     const fecthSanpham = async () => {
//       try {
//         const res = await getSanphamApi();
//         setProduct(res.data);
//       } catch (error) {
//         console.log("LỖi", error);
//       }
//     };
//     fecthSanpham();
//   }, []);
//   return <div>product</div>;
// };
// ======= Làm nốt phần giao diện để hiển thị lên
// import React, { useEffect, useState } from "react";
// import { getSanphamApi } from "../util/api";

// export const Product = () => {
//   const [product, setProduct] = useState([]);
//   useEffect(() => {
//     const fecthSanpham = async () => {
//       try {
//         const res = await getSanphamApi();
//         setProduct(res.data);
//         console.log(res.data);
//       } catch (error) {
//         console.log("LỖi", error);
//       }
//     };
//     fecthSanpham();
//   }, []);
//   return (
//     <div className="p-5">
//       <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="p-3 border">ID</th>
//               <th className="p-3 border">Hình ảnh</th>
//               <th className="p-3 border">Tên sản phẩm</th>
//               <th className="p-3 border">Giá bán</th>
//               <th className="p-3 border">Danh mục</th>
//               <th className="p-3 border">Ngày tạo</th>
//               <th className="p-3 border text-center">Hành động</th>
//             </tr>
//           </thead>

//           <tbody>
//             {product.map((item) => (
//               <tr key={item.id} className="border-b">
//                 <td className="p-3 border">{item.id}</td>

//                 <td className="p-3 border">
//                   <img
//                     src={item.hinh_anh}
//                     alt={item.tieu_de}
//                     className="w-16 h-16 object-cover rounded"
//                   />
//                 </td>

//                 <td className="p-3 border font-medium">{item.tieu_de}</td>

//                 <td className="p-3 border text-red-600 font-semibold">
//                   {Number(item.gia_ban).toLocaleString("vi-VN")}₫
//                 </td>

//                 <td className="p-3 border">{item.id_danh_muc}</td>

//                 <td className="p-3 border">
//                   {new Date(item.ngay_tao).toLocaleDateString("vi-VN")}
//                 </td>

//                 <td className="p-3 border text-center">
//                   <button className="px-3 py-1 bg-blue-500 text-white rounded mr-2">
//                     Sửa
//                   </button>
//                   <button className="px-3 py-1 bg-red-500 text-white rounded">
//                     Xóa
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// ====== Lưu ý : Mọi thắc mắc vui lòng liên hệ AI giải quyết :))
