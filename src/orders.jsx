import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMeApi,
  getOrdersApi,
  getOrderItemApi,
  getSanPhamIDApi,
} from "./util/api";

const Orders = () => {
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  /* ===================== GET USER ===================== */
  useEffect(() => {
    const fetchMe = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;
      const res = await getMeApi();
      setUserId(res.data.id);
    };
    fetchMe();
  }, []);

  /* ===================== GET ORDERS ===================== */
  useEffect(() => {
    if (!userId) return;
    const fetchOrders = async () => {
      const res = await getOrdersApi(userId);
      setOrders(res.data);
    };
    fetchOrders();
  }, [userId]);

  /* ===================== GET ORDER ITEMS ===================== */
  useEffect(() => {
    if (orders.length === 0) return;

    const fetchOrderItems = async () => {
      const items = [];
      for (const o of orders) {
        const res = await getOrderItemApi(o.id);
        items.push(...res.data);
      }
      setOrderItems(items);
    };

    fetchOrderItems();
  }, [orders]);

  /* ===================== GET PRODUCTS ===================== */
  useEffect(() => {
    if (orderItems.length === 0) return;

    const fetchProducts = async () => {
      const sp = [];
      for (const item of orderItems) {
        if (!sp.find((x) => x.id === item.id_sanpham)) {
          const res = await getSanPhamIDApi(item.id_sanpham);
          sp.push(res.data);
        }
      }
      setProducts(sp);
    };

    fetchProducts();
  }, [orderItems]);

  const renderStatus = (status) => {
    switch (status) {
      case "Pending":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
            <span className="h-2 w-2 rounded-full bg-gray-500"></span>
            Pending
          </span>
        );

      case "Đã thanh toán - Chờ xác nhận":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
            <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
            Đã thanh toán - Chờ xác nhận
          </span>
        );

      case "Chờ nhận tại cửa hàng":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
            <span className="h-2 w-2 rounded-full bg-blue-500"></span>
            Chờ nhận tại cửa hàng
          </span>
        );

      case "Đang giao":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
            <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
            Đang giao
          </span>
        );

      case "Thành Công":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            Thành công
          </span>
        );

      case "Đã hủy":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
            <span className="h-2 w-2 rounded-full bg-red-500"></span>
            Đã hủy
          </span>
        );

      case "Thất bại":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-200 px-3 py-1 text-xs font-medium text-red-800">
            <span className="h-2 w-2 rounded-full bg-red-600"></span>
            Thất bại
          </span>
        );

      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            Không xác định
          </span>
        );
    }
  };

  return (
    <main className="px-4 py-8 md:px-10 lg:px-20 xl:px-40 bg-slate-100 min-h-screen">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* ===================== TITLE ===================== */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Order History
          </h1>
          <p className="mt-2 text-slate-600">
            Track, return, or buy items again.
          </p>
        </div>

        {/* ===================== TABLE ===================== */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Product</th>
                  <th className="px-6 py-4 font-semibold">Order ID</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Total</th>
                  <th className="px-6 py-4 font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {orders.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-10 text-center">
                      Chưa có đơn hàng nào
                    </td>
                  </tr>
                )}

                {orders.map((order) => {
                  const items = orderItems.filter(
                    (i) => i.id_order === order.id
                  );

                  const firstItem = items[0];
                  const product = products.find(
                    (p) => p.id === firstItem?.id_sanpham
                  );

                  return (
                    <tr key={order.id} className="group hover:bg-slate-50">
                      {/* PRODUCT */}
                      <td className="px-6 py-4">
                        {product && (
                          <div className="flex items-center gap-4">
                            <img
                              src={product.hinh_anh}
                              alt={product.tieu_de}
                              className="h-12 w-12 rounded-lg object-cover bg-slate-100"
                            />
                            <div>
                              <div className="font-medium text-slate-900">
                                {product.tieu_de}
                              </div>
                              <div className="text-xs text-slate-500">
                                Số SP: {items.length}
                              </div>
                            </div>
                          </div>
                        )}
                      </td>

                      {/* ORDER ID */}
                      <td className="px-6 py-4 font-medium text-blue-600">
                        #{order.id}
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-4">
                        {renderStatus(order.status)}
                      </td>

                      {/* TOTAL */}
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {order.amount.toLocaleString()} đ
                      </td>

                      {/* ACTION */}
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => navigate(`/orderinfo/${order.id}`)}
                          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Orders;
