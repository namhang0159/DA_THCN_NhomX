import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderItemAPI } from "../../util/api";

export const InfoOrders = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await getOrderItemAPI(id);
        setOrder(res.data);
      } catch (err) {
        console.error("Lỗi lấy chi tiết đơn hàng:", err);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order)
    return <div className="text-center mt-5">Đang tải dữ liệu...</div>;

  return (
    <div className="container my-4">
      {/* ===== HEADER ===== */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="font-bold text-2xl mb-4">
          Chi tiết đơn hàng #{order.id}
        </h4>
        <span
          className={`badge fs-6  ${
            order.status === "Thành Công"
              ? "bg-green-600 rounded-2xl p-3"
              : order.status === "Pending p-3"
              ? "bg-yellow-300 rounded-2xl p-3"
              : "bg-yellow-600 rounded-2xl p-3"
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* ===== THÔNG TIN ĐƠN HÀNG ===== */}
      <div className="card mb-3 shadow-sm">
        <div className="card-header fw-bold">Thông tin đơn hàng</div>
        <div className="card-body row">
          <div className="col-md-6">
            <p>
              <strong>Thanh toán:</strong> {order.cach_thanhtoan}
            </p>
            <p>
              <strong>Cách nhận:</strong> {order.cach_nhan}
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <strong>Tổng tiền:</strong>{" "}
              <span className="text-danger fw-bold">
                {Number(order.amount).toLocaleString()} ₫
              </span>
            </p>
            <p>
              <strong>Ngày đặt:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* ===== THÔNG TIN GIAO HÀNG ===== */}
      <div className="card mb-3 shadow-sm">
        <div className="card-header fw-bold">Thông tin giao hàng</div>
        <div className="card-body row">
          <div className="col-md-6">
            <p>
              <strong>Người nhận:</strong> {order.name_ship}
            </p>
            <p>
              <strong>SĐT:</strong> {order.sdt}
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <strong>Địa chỉ:</strong> {order.dia_chi}
            </p>
          </div>
        </div>
      </div>

      {/* ===== DANH SÁCH SẢN PHẨM ===== */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        {/* Header: Tăng padding, background nhẹ nhàng */}
        <div className="card-header bg-white py-3 border-bottom-0">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-box-seam text-primary"></i>{" "}
            {/* Giả sử có icon */}
            <h6 className="mb-0 fw-bold text-dark">Sản phẩm trong đơn</h6>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl shadow-md">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Tên sản phẩm
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Phân loại
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">
                  Đơn giá
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">
                  SL
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">
                  Thành tiền
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {order.order_items.map((item, index) => {
                const basePrice = Number(item.sanpham.gia_ban);
                const romPrice = Number(item.rom?.gia_thaydoi || 0);
                const finalPrice = basePrice + romPrice;
                const subtotal = finalPrice * item.soluong;

                return (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    {/* SẢN PHẨM */}
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-16 h-16 rounded-lg overflow-hidden shadow-sm">
                          <img
                            src={item.sanpham.hinh_anh}
                            alt={item.sanpham.tieu_de}
                            className="w-full h-full object-cover hover:scale-105 transition-transform"
                          />
                        </div>
                      </div>
                    </td>

                    {/* TÊN SẢN PHẨM */}
                    <td className="px-6 py-4">
                      <div
                        className="font-medium text-gray-800 truncate max-w-[200px]"
                        title={item.sanpham.tieu_de}
                      >
                        {item.sanpham.tieu_de}
                      </div>
                    </td>

                    {/* PHÂN LOẠI */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        {/* Màu sắc */}
                        <div
                          className="flex items-center gap-2"
                          title={`Màu: ${item.mausac.ten_mau}`}
                        >
                          <div
                            className="w-5 h-5 rounded-full border shadow-sm"
                            style={{
                              backgroundImage: `url(${item.mausac.hinh_anh})`,
                              backgroundSize: "cover",
                            }}
                          ></div>
                          <span className="text-sm text-gray-500">
                            {item.mausac.ten_mau}
                          </span>
                        </div>

                        {/* ROM */}
                        <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {item.rom.rom.toUpperCase()}
                        </span>
                      </div>
                    </td>

                    {/* GIÁ */}
                    <td className="px-6 py-4 text-right">
                      <span className="font-semibold text-gray-700">
                        {finalPrice.toLocaleString("vi-VN")}₫
                      </span>
                    </td>

                    {/* SỐ LƯỢNG */}
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                        x{item.soluong}
                      </span>
                    </td>

                    {/* TẠM TÍNH */}
                    <td className="px-6 py-4 text-right">
                      <span className="text-pink-600 font-bold text-lg">
                        {subtotal.toLocaleString("vi-VN")}₫
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer (Optional): Hiển thị tổng cộng nhanh nếu cần */}
        <div className="card-footer bg-light p-3 text-end border-top-0">
          <small className="text-muted me-2">
            Tổng số lượng:{" "}
            {order.order_items.reduce((acc, i) => acc + i.soluong, 0)}
          </small>
        </div>
      </div>
    </div>
  );
};
