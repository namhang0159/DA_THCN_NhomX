import { useNavigate, useParams } from "react-router-dom";
import {
  checkDanhGiaApi,
  getMauSacApi,
  getMeApi,
  getOrderItemApi,
  getOrdersApi,
  getRomApi,
  getSanPhamIDApi,
  repayOrderApi,
} from "../util/api";
import { useEffect, useState } from "react";

export const Orderinfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [idMe, setIdMe] = useState();
  const [order, setOrder] = useState(null);
  const [item, setItem] = useState([]);
  const [sanpham, setSanpham] = useState([]);
  const [rom, setRom] = useState([]);
  const [mau, setMau] = useState([]);
  const [reviewedList, setReviewedList] = useState({});

  /* ================= FETCH ================= */

  useEffect(() => {
    const fetchMe = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;
      const res = await getMeApi();
      setIdMe(res.data.id);
    };
    fetchMe();
  }, []);

  useEffect(() => {
    if (!idMe) return;
    getOrdersApi(idMe).then((res) => {
      const found = res.data?.find((i) => i.id == id);
      setOrder(found || null);
    });
  }, [id, idMe]);

  useEffect(() => {
    getOrderItemApi(id).then((res) => setItem(res.data || []));
  }, [id]);

  useEffect(() => {
    if (!item.length) return;
    Promise.all(item.map((o) => getSanPhamIDApi(o.id_sanpham))).then((res) =>
      setSanpham(res.map((r) => r.data))
    );
  }, [item]);

  useEffect(() => {
    getRomApi().then((res) => setRom(res.data));
  }, []);
  useEffect(() => {
    getMauSacApi().then((res) => setMau(res.data));
  }, []);

  useEffect(() => {
    if (!item.length) return;
    const fetch = async () => {
      const map = {};
      for (const o of item) {
        const res = await checkDanhGiaApi(o.id_sanpham, id);
        map[o.id_sanpham] = res.data.reviewed;
      }
      setReviewedList(map);
    };
    fetch();
  }, [item, id]);
  const handleRepay = async () => {
    try {
      const res = await repayOrderApi(id);
      console.log("REPAY RESPONSE:", res.data);
      if (res.data?.paymentUrl) {
        window.location.href = res.data.paymentUrl;
      }
    } catch (err) {
      alert("Không thể tạo thanh toán lại", err);
    }
  };

  if (!order) {
    return (
      <div className="min-h-[300px] flex items-center justify-center text-gray-500">
        Đang tải đơn hàng...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Chi tiết đơn hàng #{id}</h1>
            <p className="text-gray-500 text-sm mt-1">
              Theo dõi trạng thái đơn hàng của bạn
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-md border bg-white hover:bg-gray-50"
          >
            ← Quay lại
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* SHIPPING */}
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <h3 className="font-semibold mb-4">Thông tin nhận hàng</h3>
              <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-600">
                <p>
                  <b>Họ tên:</b> {order.name_ship}
                </p>
                <p>
                  <b>SĐT:</b> {order.sdt}
                </p>
                <p>
                  <b>Địa chỉ:</b> {order.dia_chi}
                </p>
                <p>
                  <b>Cách nhận:</b> {order.cach_nhan}
                </p>
              </div>
            </div>

            {/* ITEMS */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b font-semibold">
                Sản phẩm đã mua
              </div>

              {item.map((it) => {
                const sp = sanpham.find((s) => s.id === it.id_sanpham);
                const romC = rom.find((r) => r.id === it.id_rom);
                const mauC = mau.find((r) => r.id === it.id_mau);
                if (!sp) return null;

                return (
                  <div
                    key={it.id}
                    className="p-5 flex gap-4 border-b last:border-0"
                  >
                    <img
                      src={sp.hinh_anh}
                      alt={sp.tieu_de}
                      className="w-20 h-20 object-contain bg-gray-100 rounded"
                    />

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-semibold">{sp.tieu_de}</h4>
                        <span className="font-semibold text-blue-600">
                          {sp.gia_ban.toLocaleString()}đ
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 mt-1">
                        ROM: {romC?.rom} • SL: {it.soluong} • {mauC?.ten_mau}
                      </p>

                      {order.status === "Thành Công" &&
                        !reviewedList[it.id_sanpham] && (
                          <button
                            onClick={() =>
                              navigate(`/review?sanpham=${sp.id}&order=${id}`)
                            }
                            className="mt-2 text-sm text-blue-600 hover:underline"
                          >
                            Đánh giá sản phẩm
                          </button>
                        )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <h3 className="font-semibold mb-4">Tóm tắt đơn hàng</h3>

              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Thanh toán</span>
                <span>{order.cach_thanhtoan}</span>
              </div>

              <div className="flex justify-between text-sm mb-4">
                <span className="text-gray-500">Trạng thái</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium
                    ${
                      order.status === "Thành Công"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Đã hủy"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="border-t pt-4 flex justify-between items-center">
                <span className="font-semibold">Tổng tiền</span>
                <span className="text-xl font-bold text-blue-600">
                  {order.amount.toLocaleString()}đ
                </span>
              </div>
              {order.cach_thanhtoan === "MoMo" &&
                ["Pending", "Thất bại"].includes(order.status) && (
                  <button
                    onClick={handleRepay}
                    className="mt-4 w-full h-12 rounded-lg
                 bg-pink-600 text-white font-semibold
                 hover:bg-pink-700 transition
                 flex items-center justify-center gap-2"
                  >
                    Thanh toán lại bằng MoMo
                  </button>
                )}
            </div>
            {/* HELP */}
            <button
              className="w-full h-12 rounded-lg border bg-white
                         flex items-center justify-center gap-2
                         hover:bg-gray-50 transition shadow-sm"
              onClick={() => navigate("/contact")}
            >
              <i class="fa fa-phone" aria-hidden="true"></i>
              Cần hỗ trợ đơn hàng?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
