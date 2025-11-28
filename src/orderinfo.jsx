import { useParams } from "react-router-dom";
import {
  getMeApi,
  getOrderItemApi,
  getOrdersApi,
  getRomApi,
  getSanPhamIDApi,
} from "./util/api";
import { useEffect, useState } from "react";

export const Orderinfo = () => {
  const { id } = useParams();
  const [idMe, setIdMe] = useState();
  const [order, setOrder] = useState([]);
  const [item, setItem] = useState([]);
  const [sanpham, setSanpham] = useState([]);
  const [rom, setRom] = useState([]);
  useEffect(() => {
    const fecthMe = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;
      const res = await getMeApi();
      setIdMe(res.data.id);
    };
    fecthMe();
  }, []);
  useEffect(() => {
    const fetchOrder = async () => {
      const res = await getOrdersApi(idMe);
      const data = res.data;
      if (data) {
        const tim = data.find((i) => i.id == id);
        setOrder(tim);
      } else console.log("Fetch Order thất bại");
    };
    fetchOrder();
  }, [id, idMe]);
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await getOrderItemApi(id);
      const data = res.data;

      if (data) {
        setItem(data);
      } else {
        console.log("fetch order Item thất bại");
      }
    };
    fetchOrders();
  }, [id]);
  useEffect(() => {
    const fetchProducts = async () => {
      if (item.length === 0) return;

      const sp = [];
      for (const o of item) {
        try {
          const res = await getSanPhamIDApi(o.id_sanpham);
          sp.push(res.data);
        } catch (err) {
          console.error("Lỗi khi fetch sản phẩm:", err);
        }
      }

      setSanpham(sp);
    };

    fetchProducts();
  }, [item]);
  useEffect(() => {
    const fetchRom = async () => {
      try {
        const res = await getRomApi();
        const data = res.data;

        console.log(data);
        setRom(data);
      } catch (error) {
        console.log("Loi fetch ROM :", error);
      }
    };
    fetchRom();
  }, [item]);
  if (!order) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600 animate-pulse">Đang tải dữ liệu...</p>
      </div>
    );
  }
  return (
    <div>
      {/* Thông tin cá nhân */}
      <div className="mb-6 p-4  rounded-xl bg-white shadow-md hover:shadow-xl transition">
        <h3 className="font-bold text-xl">Thông tin nhận hàng</h3>
        <div className="space-y-1 text-gray-700">
          <p>
            <strong>Họ tên:</strong> {order.name_ship}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {order.sdt}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {order.dia_chi}
          </p>
          <p>
            <strong>Cách nhận:</strong> {order.cach_nhan}
          </p>
        </div>
      </div>
      {/* Thông tin đơn hàngg */}
      <div className="mb-6 p-4  rounded-xl bg-white shadow-md hover:shadow-xl transition">
        <h3 className="font-bold text-xl">Phương thức</h3>
        <p>
          <strong>Phương thức thanh toán: </strong>
          {order.cach_thanhtoan}
        </p>
        <p>
          <strong>Trạng thái:</strong>{" "}
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === "Thành công"
                ? "bg-green-100 text-green-700"
                : order.status === "Đã hủy"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {order.status}
          </span>
        </p>
      </div>
      <div className="p-4">
        <div
          key={id}
          className="mb-6 p-4 border rounded-xl bg-white shadow-md hover:shadow-xl transition"
        >
          {/* Thông tinn */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-lg">Đơn hàng #{id}</h2>
          </div>

          {/*  item */}
          {item.map((item) => {
            const sp = sanpham.find((s) => s.id === item.id_sanpham);
            const romC = rom.find((i) => i.id === item.id_rom);
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
                    Dung lượng : {romC ? romC.rom : ""}
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
            Tổng tiền: {order.amount} đ
          </div>
        </div>
      </div>
    </div>
  );
};
