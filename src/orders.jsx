import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMeApi,
  getOrderItemApi,
  getOrdersApi,
  getSanPhamIDApi,
} from "./util/api";

const Orders = () => {
  const [id, setId] = useState();
  const [id_order, setId_order] = useState([]);
  const [order, setOrder] = useState([]);
  const [orderR, setOrderR] = useState([]);
  const [sanpham, setSanpham] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fecthMe = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;
      const res = await getMeApi();
      setId(res.data.id);
    };
    fecthMe();
  }, []);
  useEffect(() => {
    const fetchOrders = async () => {
      if (id === undefined || id === null) return;
      else {
        const res = await getOrdersApi(id);
        const data = res.data;
        setOrderR(res.data);
        setId_order(data.map((o) => o.id));
        return;
      }
    };
    fetchOrders();
  }, [id]);
  useEffect(() => {
    const fetchOrders = async () => {
      if (id_order.length === 0) return;
      else {
        const orderItem = [];
        for (const ori of id_order) {
          const res = await getOrderItemApi(ori);
          const data = res.data;

          orderItem.push(...data);
        }

        setOrder(orderItem);
      }
    };
    fetchOrders();
  }, [id_order]);
  useEffect(() => {
    const fetchProducts = async () => {
      if (order.length === 0) return;

      const sp = [];
      for (const o of order) {
        try {
          const res = await getSanPhamIDApi(o.id_sanpham);
          sp.push(res.data);
        } catch (err) {
          console.error("Lỗi khi fetch sản phẩm:", err);
        }
      }
      console.log(sp);
      setSanpham(sp);
    };

    fetchProducts();
  }, [order]);

  return (
    <div className="p-4">
      {id_order.length > 0 ? (
        id_order.map((oid) => {
          const items = order.filter((o) => o.id_order === oid);
          const ord = orderR.find((o) => o.id === oid);
          const status = ord.status;
          let maustatus = "";
          if (status === "Thành Công") {
            maustatus = "bg-green-100 text-green-600";
          } else if (status === "Pending") {
            maustatus = "bg-yellow-100 text-yellow-600";
          } else {
            maustatus = "bg-red-100 text-red-600";
          }
          return (
            <div
              key={oid}
              className="mb-6 p-4 border rounded-xl bg-white shadow-md hover:shadow-xl transition"
            >
              {/* Thông tinn */}
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-lg">Đơn hàng #{oid}</h2>
                <span className={`px-3 py-1 rounded-full text-sm ${maustatus}`}>
                  {status}
                </span>
              </div>

              {/*  item */}
              {items.map((item) => {
                const sp = sanpham.find((s) => s.id === item.id_sanpham);
                if (!sp) return null;
                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b py-2"
                  >
                    <img
                      src={sp.hinh_anh}
                      alt={sp.tieu_de}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{sp.tieu_de}</h3>
                      <p className="text-gray-500 text-sm">
                        Số lượng: {item.soluong}
                      </p>
                      <p className="text-gray-700 font-semibold">
                        Giá: {sp.gia_ban.toLocaleString()}đ
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Tổng  tiền */}
              <div className="text-right mt-3 font-bold text-gray-800">
                Tổng tiền: {ord.amount} đ
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center">Chưa có đơn hàng nào</p>
      )}
    </div>
  );
};

export default Orders;
