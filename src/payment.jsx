import React, { useEffect, useState } from "react";
import {
  createOrders,
  getMauSacApi,
  getMeApi,
  getRomApi,
  getSanPhamIDApi,
} from "./util/api";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [sanpham, setSanPham] = useState([]);

  const [way, setWay] = useState(null);
  const [items, setItems] = useState([]);
  const [tien, setTien] = useState();
  const [id_user, setId_user] = useState();
  const [wayPay, setWayPay] = useState("COD");
  const [wayShip, setWayShip] = useState("giaohang");
  const navigator = useNavigate();
  const [hoten, setHoten] = useState("");
  const [sdt, setSdt] = useState("");
  const [diachi, setDiachi] = useState("");
  const [rom, setRom] = useState([]);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("checkout_items")) || [];
    console.log("checkout_items:", data);
    setItems(data);
  }, []);
  useEffect(() => {
    if (items.length === 0) return;
    const fetchSanPham = async () => {
      try {
        const allProducts = await Promise.all(
          items.map(async (it) => {
            const res = await getSanPhamIDApi(it.id_sanpham);
            console.log("API trả về:", res);
            return {
              ...res.data,
              soluong: it.soluong,
              ten_mau: it.ten_mau,
              id_rom: it.id_rom,
            };
          })
        );
        setSanPham(allProducts);
      } catch (error) {
        console.error("Lỗi fetch sản phẩm:", error);
      }
    };
    fetchSanPham();
  }, [items]);
  useEffect(() => {
    const fetchRom = async () => {
      try {
        const res = await getRomApi();
        const data = res.data;
        setRom(data);
      } catch (error) {
        console.log("Lỗi fetch Rom :", error);
      }
    };
    fetchRom();
  }, []);

  useEffect(() => {
    if (sanpham.length > 0) {
      const tong = sanpham.reduce((sum, s) => {
        const ite = items.find(
          (i) => i.id_sanpham === s.id && i.id_rom === s.id_rom
        );
        const romC = rom.find((i) => i.id === ite?.id_rom);

        return (
          sum +
          Number(Number(s.gia_ban) + Number(romC.gia_thaydoi)) *
            Number(s.soluong || 1)
        );
      }, 0);
      setTien(tong);
    }
  }, [sanpham, rom, items]);
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          setId_user(null);
          return;
        }

        const res = await getMeApi();
        const data = res.data;
        setId_user(data.id);
      } catch (err) {
        console.error("Lỗi khi gọi getMeApi:", err);
      }
    };

    fetchMe();
  }, []);
  const paySubmit = async () => {
    if (!id_user) {
      alert("Bạn cần đăng nhập trước khi thanh toán");
      return;
    }
    let wayS = "";
    if (wayShip === "cuahang") {
      wayS = "Cửa Hàng";
    }
    if (wayShip === "giaohang") {
      wayS = "Giao Hàng";
    }
    if (wayPay === "MOMO") {
      const res = await getMauSacApi();
      const orderItems = sanpham.map((sp) => {
        const matched = res.data.find(
          (i) => i.ten_mau === sp.ten_mau && i.id_sanpham === sp.id
        );
        const tim = rom.find((i) => i.id_sanpham === sp.id);
        return {
          id_sanpham: sp.id,
          soluong: sp.soluong,
          id_mau: matched?.id || null,
          id_rom: tim.id,
        };
      });
      console.log("order nè", orderItems);
      const resp = await createOrders(
        id_user,
        orderItems,
        hoten,
        sdt,
        diachi,
        wayS,
        wayPay
      );
      if (resp.data) {
        console.log(resp.data);
        window.location.href = resp.data.paymentUrl;
      } else {
        alert("Lỗi");
      }
    } else {
      const res = await getMauSacApi();
      const orderItems = sanpham.map((sp) => {
        const matched = res.data.find(
          (i) => i.ten_mau === sp.ten_mau && i.id_sanpham === sp.id
        );
        const tim = rom.find((i) => i.id_sanpham === sp.id);
        return {
          id_sanpham: sp.id,
          soluong: sp.soluong,
          id_mau: matched?.id || null,
          id_rom: tim.id,
        };
      });
      console.log(orderItems);
      const resp = await createOrders(
        id_user,
        orderItems,
        hoten,
        sdt,
        diachi,
        wayS,
        wayPay
      );
      if (resp.data) {
        alert("Thanh cong");
        setTimeout(navigator("/"), 3000);
      }
    }
  };
  return (
    <div>
      <div className="w-full border-gray-500 flex flex-col justify-center m-2 p-3 rounded-2xl shadow-gray-300 hover:shadow-xl transition duration-300">
        <h1 className="text-4xl font-bold text-center">Thanh Toán</h1>
        <form action="" className="mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Thông tin người mua
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Họ Tên
              </label>
              <input
                type="text"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Nhập họ tên"
                onChange={(e) => setHoten(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Số Điện Thoại
              </label>
              <input
                type="text"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Nhập số điện thoại"
                onChange={(e) => setSdt(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Địa Chỉ
              </label>
              <input
                type="text"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Nhập địa chỉ"
                onChange={(e) => setDiachi(e.target.value)}
                required
              />
            </div>
          </div>
        </form>
        {/* Đơn hàng */}
        <section className="mb-6 mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Đơn hàng
          </h2>
          {sanpham.map((item, index) => {
            const RomC = rom.find(
              (r) => r.id === item.id_rom && r.id_sanpham === item.id
            );

            return (
              <div
                key={index}
                className="border rounded-xl p-4 bg-gray-50 mb-4"
              >
                <h3 className="text-lg font-semibold">{item.tieu_de}</h3>
                <p className="text-red-600 font-bold text-xl">
                  {Number(
                    Number(item.gia_ban) + Number(RomC.gia_thaydoi)
                  ).toLocaleString("vi-VN")}
                  ₫
                </p>
                <p className="text-gray-700">Màu đã chọn: {item.ten_mau}</p>
                <p className="text-gray-700">
                  ROM đã chọn: {RomC ? RomC.rom : "Không có"}
                </p>
                <p className="text-gray-700">Số lượng: {item.soluong}</p>
              </div>
            );
          })}
        </section>

        {/* Cách thức nhận hàng */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Cách thức nhận hàng
          </h2>
          <select
            name="optionship"
            id="optionship"
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
            onChange={(e) => {
              if (e.target.value === "cuahang") {
                setWay(e.target.value);
              } else {
                setWay(null);
              }
              setWayShip(e.target.value);
            }}
          >
            <option value="giaohang">Giao hàng tận nơi</option>
            <option value="cuahang">Nhận tại cửa hàng</option>
          </select>
        </section>
        {way ? (
          <p className="text-xl font-bold text-red-400 mb-3">
            Địa chỉ :666/13 Đường Lê Văn Nó Quận 113 Tp Nào đó
          </p>
        ) : (
          <p></p>
        )}
        {/* Phương thức thanh toán */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Phương thức thanh toán
          </h2>
          <select
            name="optionpayment"
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-red-500 focus:outline-none"
            onChange={(e) => setWayPay(e.target.value)}
          >
            <option value="COD">Thanh toán khi nhận hàng</option>
            <option value="MOMO">MOMO</option>
          </select>
        </section>
        <section className="mb-6 mt-6 border rounded-2xl p-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Tổng tiền
          </h2>

          <p className="text-red-600 font-bold text-xl">
            {Number(tien).toLocaleString("vi-VN")}₫
          </p>
        </section>
        {/* Nút xác nhận */}
        <button
          type="button"
          onClick={paySubmit}
          className="w-full bg-red-600 text-white py-3 rounded-2xl text-xl font-semibold hover:bg-red-700 transition"
        >
          Xác nhận thanh toán
        </button>
      </div>
    </div>
  );
};

export default Payment;
