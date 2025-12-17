import React, { useEffect, useMemo, useState } from "react";
import { getOrdersApi, updateOrderStatusAPI } from "../../util/api";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [updatingId, setUpdatingId] = useState(null);
  const navigate = useNavigate();
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrdersApi();
        setOrders(res.data || []);
      } catch (err) {
        console.error("Lỗi lấy orders:", err);
      }
    };
    fetchOrders();
  }, []);

  const pageCount = Math.ceil(orders.length / itemsPerPage);

  const currentOrders = useMemo(() => {
    const offset = currentPage * itemsPerPage;
    return orders.slice(offset, offset + itemsPerPage);
  }, [orders, currentPage]);

  const statusColor = (status) => {
    switch (status) {
      case "Thành Công":
        return "bg-green-100 text-green-700";
      case "Đang giao":
        return "bg-yellow-100 text-yellow-700";
      case "Chờ nhận tại cửa hàng":
        return "bg-blue-100 text-blue-700";
      case "Đã hủy":
      case "Thất bại":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleUpdateStatus = async (id, status) => {
    if (status === "Đã hủy") {
      const ok = window.confirm("Bạn có chắc muốn hủy đơn hàng này?");
      if (!ok) return;
    }

    try {
      setUpdatingId(id);
      await updateOrderStatusAPI(id, status);

      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      );
    } catch (err) {
      console.error("Lỗi cập nhật trạng thái:", err);
      alert("Cập nhật thất bại");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* HEADER */}
      <div className="bg-white rounded-2xl shadow-lg border mb-6">
        <div className="p-4 border-b flex justify-between items-center">
          <h1 className="text-2xl font-bold"> Quản lý đơn hàng</h1>
          <span className="text-sm text-gray-500">
            Tổng: {orders.length} đơn
          </span>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="p-4 border">Mã</th>
                <th className="p-4 border">Khách hàng</th>
                <th className="p-4 border">SĐT</th>
                <th className="p-4 border">Địa chỉ</th>
                <th className="p-4 border">Thanh toán</th>
                <th className="p-4 border">Nhận hàng</th>
                <th className="p-4 border">Tổng tiền</th>
                <th className="p-4 border">Trạng thái</th>
                <th className="p-4 border">Ngày tạo</th>
                <th className="p-4 border">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition">
                    <td className="p-4 border font-semibold text-center">
                      #{order.id}
                    </td>

                    <td className="p-4 border">{order.name_ship}</td>
                    <td className="p-4 border">{order.sdt}</td>

                    <td className="p-4 border max-w-xs">
                      <p className="line-clamp-2">{order.dia_chi}</p>
                    </td>

                    <td className="p-4 border text-center">
                      {order.cach_thanhtoan}
                    </td>

                    <td className="p-4 border text-center">
                      {order.cach_nhan}
                    </td>

                    <td className="p-4 border text-red-600 font-bold text-center">
                      {Number(order.amount).toLocaleString("vi-VN")} ₫
                    </td>

                    <td className="p-4 border text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                          order.status
                        )}`}
                      >
                        ● {order.status}
                      </span>
                    </td>

                    <td className="p-4 border text-center text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleString("vi-VN")}
                    </td>

                    {/* ACTIONS */}
                    <td className="p-4 border text-center space-x-1">
                      {/* HỦY */}
                      {order.status !== "Đã hủy" &&
                        order.status !== "Thành Công" &&
                        order.status !== "Thất bại" && (
                          <button
                            disabled={updatingId === order.id}
                            onClick={() =>
                              handleUpdateStatus(order.id, "Đã hủy")
                            }
                            className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 disabled:bg-gray-300"
                          >
                            Hủy
                          </button>
                        )}

                      {/* GIAO HÀNG */}
                      {order.cach_nhan === "Giao Hàng" &&
                        (order.status === "Pending" ||
                          order.status === "Đã thanh toán - Chờ xác nhận") && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(order.id, "Đang giao")
                            }
                            className="px-2 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600"
                          >
                            Đang giao
                          </button>
                        )}

                      {/* NHẬN TẠI CỬA HÀNG */}
                      {order.cach_nhan === "Cửa Hàng" &&
                        (order.status === "Pending" ||
                          order.status === "Đã thanh toán - Chờ xác nhận") && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(
                                order.id,
                                "Chờ nhận tại cửa hàng"
                              )
                            }
                            className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                          >
                            Chờ nhận
                          </button>
                        )}

                      {(order.status === "Đang giao" ||
                        order.status === "Chờ nhận tại cửa hàng") && (
                        <>
                          <button
                            onClick={() =>
                              handleUpdateStatus(order.id, "Thành Công")
                            }
                            className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
                          >
                            Thành Công
                          </button>

                          <button
                            onClick={() =>
                              handleUpdateStatus(order.id, "Thất bại")
                            }
                            className="px-2 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-700"
                          >
                            Thất bại
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => navigate(`/orders/info/${order.id}`)}
                        className="px-2 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-700"
                      >
                        Xem chi tiết
                      </button>
                      {updatingId === order.id && (
                        <span className="ml-2 text-xs text-gray-500">⏳</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="p-6 text-center text-gray-500">
                    Chưa có đơn hàng
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ReactPaginate
        previousLabel="‹"
        nextLabel="›"
        breakLabel="..."
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        onPageChange={(e) => setCurrentPage(e.selected)}
        containerClassName="flex justify-center items-center gap-2 mt-6"
        pageClassName="px-3 py-1 border rounded text-sm hover:bg-gray-100 cursor-pointer"
        activeClassName="bg-red-500 text-white font-bold"
        previousClassName="px-3  border rounded hover:bg-gray-100"
        nextClassName="px-3  border rounded hover:bg-gray-100"
      />
    </div>
  );
};

export default Orders;
