import React, { useEffect, useState } from "react";
import {
  chooseAddressApi,
  createOrders,
  getAddressByUserApi,
  getMauSacApi,
  getMeApi,
  getRomApi,
  getSanPhamIDApi,
  createAddressApi,
  updateAddressApi,
  deleteAddressApi,
  getSanphamRomMauApi,
} from "./util/api";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [sanpham, setSanPham] = useState([]);
  const [way, setWay] = useState(null);
  const [items, setItems] = useState([]);
  const [tien, setTien] = useState(0);
  const [id_user, setId_user] = useState();
  const [wayPay, setWayPay] = useState("COD");
  const [wayShip, setWayShip] = useState("giaohang");
  const navigator = useNavigate();
  const [hoten, setHoten] = useState("");
  const [sdt, setSdt] = useState("");
  const [diachi, setDiachi] = useState("");
  const [rom, setRom] = useState([]);
  const [mauSac, setMauSac] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    hoten: "",
    sdt: "",
    diachi: "",
  });

  const fetchAddresses = async () => {
    if (!id_user) return;
    try {
      const res = await getAddressByUserApi(id_user);
      const data = res.data || [];
      data.sort((a, b) => b.is_choose - a.is_choose);
      setAddresses(data);
      const chosen = data.find((a) => a.is_choose === 1);
      if (chosen) {
        setSelectedAddress(chosen);
        setHoten(chosen.hoten);
        setSdt(chosen.sdt);
        setDiachi(chosen.diachi);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [id_user]);

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
            const res = await getSanphamRomMauApi(it.id_sanpham);
            return {
              ...res.data,
              soluong: it.soluong,
              id_mau: it.id_mau,
              id_rom: it.id_rom,
            };
          })
        );
        const sanphamWithKho = allProducts.map((sp) => {
          const khoItem = getKhoItem(sp);

          return {
            ...sp,
            khoItem,
            hetHang:
              !khoItem || khoItem.trang_thai === 0 || khoItem.so_luong === 0,
            khongDuSoLuong: khoItem && khoItem.so_luong < sp.soluong,
          };
        });

        setSanPham(sanphamWithKho);
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
    if (sanpham.length > 0 && rom.length > 0) {
      const tong = sanpham.reduce((sum, s) => {
        const ite = items.find(
          (i) => i.id_sanpham === s.id && i.id_rom === s.id_rom
        );
        const romC = rom.find((i) => i.id === ite?.id_rom);
        const giaRom = romC?.gia_thaydoi || 0;
        return (
          sum + (Number(s.gia_ban) + Number(giaRom)) * Number(s.soluong || 1)
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

  useEffect(() => {
    const fetchMauSac = async () => {
      try {
        const res = await getMauSacApi();
        setMauSac(res.data);
      } catch (error) {
        console.error("Lỗi fetch màu sắc:", error);
      }
    };
    fetchMauSac();
  }, []);

  const handleAddAddress = () => {
    if (!id_user) {
      alert("Bạn cần đăng nhập để thêm địa chỉ");
      return;
    }
    setShowAddModal(true);
  };

  const handleSaveNewAddress = async () => {
    if (!id_user) {
      alert("Bạn cần đăng nhập để thêm địa chỉ");
      return;
    }

    if (!newAddress.hoten || !newAddress.sdt || !newAddress.diachi) {
      alert("Vui lòng điền đầy đủ thông tin địa chỉ");
      return;
    }

    try {
      const is_choose = addresses.length === 0 ? 1 : 0;

      console.log("Gửi data:", {
        id_user,
        hoten: newAddress.hoten,
        sdt: newAddress.sdt,
        diachi: newAddress.diachi,
        is_choose,
      });

      await createAddressApi(
        id_user,
        newAddress.hoten,
        newAddress.sdt,
        newAddress.diachi,
        is_choose
      );

      alert("Thêm địa chỉ thành công!");
      setShowAddModal(false);
      setNewAddress({ hoten: "", sdt: "", diachi: "" });
      await fetchAddresses();
    } catch (error) {
      console.error("Lỗi thêm địa chỉ:", error);
      alert("Có lỗi xảy ra khi thêm địa chỉ");
    }
  };

  const handleEditAddress = (addr) => {
    setEditingAddress(addr);
    setNewAddress({
      hoten: addr.hoten,
      sdt: addr.sdt,
      diachi: addr.diachi,
    });
    setShowEditModal(true);
  };

  const handleUpdateAddress = async () => {
    if (!newAddress.hoten || !newAddress.sdt || !newAddress.diachi) {
      alert("Vui lòng điền đầy đủ thông tin địa chỉ");
      return;
    }

    try {
      await updateAddressApi(
        editingAddress.id,
        newAddress.hoten,
        newAddress.sdt,
        newAddress.diachi,
        editingAddress.is_choose
      );

      alert("Cập nhật địa chỉ thành công!");
      setShowEditModal(false);
      setEditingAddress(null);
      setNewAddress({ hoten: "", sdt: "", diachi: "" });
      await fetchAddresses();
    } catch (error) {
      console.error("Lỗi cập nhật địa chỉ:", error);
      alert("Có lỗi xảy ra khi cập nhật địa chỉ");
    }
  };

  const handleDeleteAddress = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa địa chỉ này?")) return;

    try {
      await deleteAddressApi(id);
      alert("Xóa địa chỉ thành công!");
      await fetchAddresses();
    } catch (error) {
      console.error("Lỗi xóa địa chỉ:", error);
      alert("Có lỗi xảy ra khi xóa địa chỉ");
    }
  };

  const paySubmit = async () => {
    if (!id_user) {
      alert("Bạn cần đăng nhập trước khi thanh toán");
      return;
    }
    if (!hoten || !sdt || !diachi) {
      alert("Vui lòng chọn địa chỉ giao hàng");
      return;
    }

    let wayS = wayShip === "cuahang" ? "Cửa Hàng" : "Giao Hàng";
    const invalidItems = sanpham.filter(
      (sp) => sp.hetHang || sp.khongDuSoLuong
    );

    if (invalidItems.length > 0) {
      alert(
        "Một số sản phẩm trong đơn đã hết hoặc không đủ số lượng. Vui lòng quay lại giỏ hàng."
      );
      return;
    }
    const orderItems = sanpham.map((sp) => {
      return {
        id_sanpham: sp.id,
        soluong: sp.soluong,
        id_mau: sp.id_mau,
        id_rom: sp.id_rom,
      };
    });

    console.log("orderItems gửi lên server:", orderItems);

    try {
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
        if (wayPay === "MOMO" && resp.data.paymentUrl) {
          window.location.href = resp.data.paymentUrl;
        } else {
          alert("Thanh toán thành công");
          localStorage.removeItem("checkout_items");
          setTimeout(() => navigator("/"), 1000);
        }
      } else {
        alert("Lỗi thanh toán");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Có lỗi xảy ra khi thanh toán");
    }
  };
  const getKhoItem = (sp) => {
    if (!sp?.kho) return null;
    return sp.kho.find(
      (k) => k.id_rom === sp.id_rom && k.id_mausac === sp.id_mau
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-600 mb-6">Trang Chủ / Thanh toán</div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* HEADER */}
            <div className="bg-white rounded-lg p-6 shadow">
              <h1 className="text-2xl font-bold mb-2">Thanh toán đơn hàng</h1>
              <p className="text-gray-600">
                Vui lòng kiểm tra thông tin trước khi xác nhận
              </p>
            </div>

            {/* THÔNG TIN NGƯỜI MUA */}
            <div className="bg-white rounded-lg p-6 shadow">
              <h2 className="text-lg font-semibold mb-4">Địa chỉ giao hàng</h2>
              {addresses.length === 0 ? (
                <div
                  onClick={handleAddAddress}
                  className="border-2 border-dashed border-blue-400 rounded-lg p-8 text-center cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition"
                >
                  <div className="text-blue-600 text-lg font-semibold">
                    + Thêm địa chỉ
                  </div>
                  <p className="text-gray-500 text-sm mt-2">
                    Bạn chưa có địa chỉ nào, vui lòng thêm địa chỉ
                  </p>
                </div>
              ) : (
                <>
                  {addresses.slice(0, 3).map((addr) => (
                    <div
                      key={addr.id}
                      className={`p-4 mb-3 rounded-lg border-2 transition ${
                        addr.is_choose === 1
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <div
                        onClick={async () => {
                          await chooseAddressApi(addr.id);
                          await fetchAddresses();
                        }}
                        className="cursor-pointer"
                      >
                        <div className="font-semibold">{addr.hoten}</div>
                        <div className="text-gray-600">{addr.sdt}</div>
                        <div className="text-gray-600">{addr.diachi}</div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditAddress(addr);
                          }}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteAddress(addr.id);
                          }}
                          className="text-sm text-red-600 hover:underline"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    {addresses.length > 3 && (
                      <button
                        onClick={() => setShowModal(true)}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Xem thêm
                      </button>
                    )}
                    <button
                      onClick={handleAddAddress}
                      className="text-blue-600 hover:underline text-sm font-semibold"
                    >
                      + Thêm địa chỉ mới
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* NHẬN HÀNG */}
            <div className="bg-white rounded-lg p-6 shadow">
              <h2 className="text-lg font-semibold mb-4">
                Cách thức nhận hàng
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="wayShip"
                    value="giaohang"
                    checked={wayShip === "giaohang"}
                    onChange={(e) => {
                      setWayShip(e.target.value);
                      setWay(e.target.value === "cuahang");
                    }}
                    className="w-4 h-4"
                  />
                  <span>Giao hàng tận nơi</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="wayShip"
                    value="cuahang"
                    checked={wayShip === "cuahang"}
                    onChange={(e) => {
                      setWayShip(e.target.value);
                      setWay(e.target.value === "cuahang");
                    }}
                    className="w-4 h-4"
                  />
                  <span>Nhận tại cửa hàng</span>
                </label>
              </div>
              {way && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="font-semibold mb-2">Địa chỉ cửa hàng:</div>
                  <div className="text-gray-600">
                    666/13 Lê Văn Nọ, Quận 113, TP Nào Đó
                  </div>
                </div>
              )}
            </div>

            {/* THANH TOÁN */}
            <div className="bg-white rounded-lg p-6 shadow">
              <h2 className="text-lg font-semibold mb-4">
                Phương thức thanh toán
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="wayPay"
                    value="COD"
                    checked={wayPay === "COD"}
                    onChange={(e) => setWayPay(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span>Thanh toán khi nhận hàng</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="wayPay"
                    value="MOMO"
                    checked={wayPay === "MOMO"}
                    onChange={(e) => setWayPay(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span>Ví MOMO</span>
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT – ĐƠN HÀNG */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow sticky top-4">
              <h2 className="text-lg font-semibold mb-4">Đơn hàng</h2>
              <div className="space-y-4 mb-6">
                {sanpham.map((item, index) => {
                  const RomC = rom.find(
                    (r) => r.id === item.id_rom && r.id_sanpham === item.id
                  );
                  const mauC = mauSac.find((m) => m.id === item.id_mau);
                  return (
                    <div key={index} className="border-b pb-4">
                      <div className="font-semibold mb-2">{item.tieu_de}</div>
                      <div className="text-red-600 font-semibold mb-2">
                        {Number(
                          Number(item.gia_ban) + Number(RomC?.gia_thaydoi || 0)
                        ).toLocaleString("vi-VN")}{" "}
                        ₫
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>Màu: {mauC?.ten_mau}</div>
                        <div>ROM: {RomC?.rom}</div>
                        <div>Số lượng: {item.soluong}</div>
                      </div>
                      {(item.hetHang || item.khongDuSoLuong) && (
                        <div className="mt-2 text-sm font-semibold text-red-600">
                          {item.hetHang
                            ? "❌ Sản phẩm đã hết hàng"
                            : `⚠️ Chỉ còn ${item.khoItem.so_luong} sản phẩm`}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className=" pt-4 mb-6">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Tổng thanh toán</span>
                  <span className="text-red-600">
                    {Number(tien).toLocaleString("vi-VN")}₫
                  </span>
                </div>
              </div>

              <button
                onClick={paySubmit}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Xác nhận thanh toán
              </button>
            </div>
          </div>
        </div>

        {/* Modal xem thêm địa chỉ */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Chọn địa chỉ</h2>
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-4 rounded-lg border-2 transition ${
                      addr.is_choose === 1
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div
                      onClick={async () => {
                        await chooseAddressApi(addr.id);
                        await fetchAddresses();
                        setShowModal(false);
                      }}
                      className="cursor-pointer"
                    >
                      <div className="font-semibold">{addr.hoten}</div>
                      <div className="text-gray-600">{addr.sdt}</div>
                      <div className="text-gray-600">{addr.diachi}</div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditAddress(addr);
                        }}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteAddress(addr.id);
                        }}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 w-full bg-gray-200 py-2 rounded-xl hover:bg-gray-300 transition"
              >
                Đóng
              </button>
            </div>
          </div>
        )}

        {/* Modal thêm địa chỉ mới */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Thêm địa chỉ mới</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Họ tên
                  </label>
                  <input
                    type="text"
                    value={newAddress.hoten}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, hoten: e.target.value })
                    }
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập họ tên"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    value={newAddress.sdt}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, sdt: e.target.value })
                    }
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Địa chỉ
                  </label>
                  <textarea
                    value={newAddress.diachi}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, diachi: e.target.value })
                    }
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập địa chỉ chi tiết"
                    rows="3"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setNewAddress({ hoten: "", sdt: "", diachi: "" });
                  }}
                  className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSaveNewAddress}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Lưu địa chỉ
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal sửa địa chỉ */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Sửa địa chỉ</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Họ tên
                  </label>
                  <input
                    type="text"
                    value={newAddress.hoten}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, hoten: e.target.value })
                    }
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập họ tên"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    value={newAddress.sdt}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, sdt: e.target.value })
                    }
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Địa chỉ
                  </label>
                  <textarea
                    value={newAddress.diachi}
                    onChange={(e) =>
                      setNewAddress({ ...newAddress, diachi: e.target.value })
                    }
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập địa chỉ chi tiết"
                    rows="3"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingAddress(null);
                    setNewAddress({ hoten: "", sdt: "", diachi: "" });
                  }}
                  className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Hủy
                </button>
                <button
                  onClick={handleUpdateAddress}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
