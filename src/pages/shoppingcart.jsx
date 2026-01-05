import React, { useEffect, useMemo, useState } from "react";
import {
  deleteGHApi,
  getGioHangApi,
  getMauSacApi,
  getMeApi,
  getRomApi,
  getSanphamRomMauApi,
  updateGioHangApi,
  updateMauGHApi,
  updateRomGHApi,
} from "../util/api";
import { useNavigate } from "react-router-dom";

const ShoppingCard = () => {
  const navigate = useNavigate();

  const [giohang, setGiohang] = useState([]);
  const [sanpham, setSanPham] = useState([]);
  const [mau, setMau] = useState([]);
  const [rom, setRom] = useState([]);
  const [idUser, setIdUser] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    const fetchMe = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;
      const res = await getMeApi();
      setIdUser(res.data.id);
    };
    fetchMe();
  }, []);

  useEffect(() => {
    if (!idUser) return;
    const fetchGioHang = async () => {
      const res = await getGioHangApi();
      const data = Array.isArray(res.data)
        ? res.data.filter((i) => i.id_user === Number(idUser))
        : [];
      setGiohang(data);
    };
    fetchGioHang();
  }, [idUser]);

  useEffect(() => {
    if (!giohang.length) return;
    const fetchSanPham = async () => {
      const res = await getSanphamRomMauApi();
      console.log("API REP:", res);
      const ids = giohang.map((g) => g.id_sanpham);
      setSanPham(res.data.filter((s) => ids.includes(s.id)));
    };
    fetchSanPham();
  }, [giohang]);

  useEffect(() => {
    getMauSacApi().then((res) => setMau(res.data));
    getRomApi().then((res) => setRom(res.data));
  }, []);

  /* ================= HANDLER ================= */

  const updateSoluong = async (id, soluong) => {
    await updateGioHangApi(id, soluong);
    const reload = await getGioHangApi();
    setGiohang(reload.data.filter((i) => i.id_user === idUser));
  };

  const updateMauGH = async (id, id_mau) => {
    await updateMauGHApi(id, id_mau);
    const reload = await getGioHangApi();
    setGiohang(reload.data.filter((i) => i.id_user === idUser));
  };

  const updateRomGH = async (id, id_rom) => {
    await updateRomGHApi(id, id_rom);
    const reload = await getGioHangApi();
    setGiohang(reload.data.filter((i) => i.id_user === idUser));
  };

  const deleteItem = async (id) => {
    await deleteGHApi(id);
    setGiohang((prev) => prev.filter((i) => i.id !== id));
    setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
  };

  const toggleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedItems.length === giohang.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(giohang.map((gh) => gh.id));
    }
  };

  /* ================= TÍNH TỔNG ================= */

  const totalPrice = useMemo(() => {
    return giohang
      .filter((gh) => selectedItems.includes(gh.id))
      .reduce((sum, gh) => {
        const sp = sanpham.find((s) => s.id === gh.id_sanpham);
        const r = rom.find((i) => i.id === gh.id_rom);
        if (!sp) return sum;
        return (
          sum + (Number(sp.gia_ban) + Number(r?.gia_thaydoi || 0)) * gh.soluong
        );
      }, 0);
  }, [giohang, sanpham, rom, selectedItems]);

  const handleCheckout = () => {
    const invalidItems = giohang.filter((gh) => {
      if (!selectedItems.includes(gh.id)) return false;
      const sp = sanpham.find((s) => s.id === gh.id_sanpham);
      const khoItem = getKhoItem(sp, gh);
      return (
        !khoItem || khoItem.trang_thai === 0 || khoItem.so_luong < gh.soluong
      );
    });

    if (invalidItems.length > 0) {
      alert("Có sản phẩm trong giỏ đã hết hoặc không đủ số lượng");
      return;
    }
    if (!selectedItems.length) {
      alert("Vui lòng chọn ít nhất 1 sản phẩm để thanh toán");
      return;
    }

    const checkoutItems = giohang.filter((gh) => selectedItems.includes(gh.id));
    localStorage.setItem("checkout_items", JSON.stringify(checkoutItems));
    navigate("/payment");
  };
  const getKhoItem = (sp, gh) => {
    if (!sp?.kho) return null;
    return sp.kho.find(
      (k) => k.id_rom === gh.id_rom && k.id_mausac === gh.id_mau
    );
  };

  /* ================= UI ================= */

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="pb-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900">
                Shopping Cart
              </h1>
              <p className="text-gray-500">
                {giohang.length} sản phẩm trong giỏ
              </p>
            </div>

            {giohang.length > 0 && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedItems.length === giohang.length}
                  onChange={toggleSelectAll}
                  className="w-5 h-5 rounded"
                />
                <span className="text-sm font-medium">Chọn tất cả</span>
              </label>
            )}
          </div>

          {giohang.length === 0 && (
            <p className="text-center text-gray-500 mt-20">
              Giỏ hàng của bạn đang trống
            </p>
          )}

          {giohang.map((gh) => {
            const sp = sanpham.find((s) => s.id === gh.id_sanpham);
            if (!sp) return null;

            const ROMI = rom.find((i) => i.id === gh.id_rom);
            const mauSP = mau.filter((m) => m.id_sanpham === sp.id);
            const romSP = rom.filter((r) => r.id_sanpham === sp.id);
            const isSelected = selectedItems.includes(gh.id);
            const khoItem = getKhoItem(sp, gh);

            const hetHang =
              !khoItem || khoItem.trang_thai === 0 || khoItem.so_luong === 0;

            const khongDuSoLuong = khoItem && khoItem.so_luong < gh.soluong;

            return (
              <div
                key={gh.id}
                className={`flex gap-4 bg-white p-4 rounded-xl border transition ${
                  isSelected
                    ? "border-blue-500 shadow-md"
                    : "border-gray-100 shadow-sm"
                } hover:shadow-md`}
              >
                {/* Checkbox */}
                <div className="flex pt-2 items-center">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    disabled={hetHang || khongDuSoLuong}
                    onChange={() => toggleSelectItem(gh.id)}
                    className="w-5 h-5 cursor-pointer disabled:opacity-40"
                  />
                </div>

                {/* Image */}
                <div className="shrink-0">
                  <div className="bg-gray-100 rounded-lg w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center">
                    <img
                      src={
                        sp.hinh_anh?.startsWith("http")
                          ? sp.hinh_anh
                          : sp.hinh_anh
                          ? `${import.meta.env.VITE_BACKEND_URL}${sp.hinh_anh}`
                          : ""
                      }
                      alt={sp.tieu_de}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {sp.tieu_de}
                      </h3>
                      <p className="text-green-600 text-sm font-medium mt-1">
                        Còn hàng
                      </p>
                      {hetHang && (
                        <p className="text-red-500 text-sm font-semibold">
                          Hết hàng
                        </p>
                      )}

                      {!hetHang && khongDuSoLuong && (
                        <p className="text-orange-500 text-sm font-semibold">
                          Chỉ còn {khoItem.so_luong} sản phẩm
                        </p>
                      )}

                      <div className="flex gap-2 mt-2">
                        <select
                          value={gh.id_mau}
                          onChange={(e) => updateMauGH(gh.id, e.target.value)}
                          className="text-xs rounded-md bg-gray-100 px-2 py-1"
                        >
                          {mauSP.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.ten_mau}
                            </option>
                          ))}
                        </select>

                        <select
                          value={gh.id_rom}
                          onChange={(e) => updateRomGH(gh.id, e.target.value)}
                          className="text-xs rounded-md bg-gray-100 px-2 py-1"
                        >
                          {romSP.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.rom}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <p className="text-lg font-bold text-gray-900">
                      {(
                        (Number(sp.gia_ban) + Number(ROMI?.gia_thaydoi || 0)) *
                        gh.soluong
                      ).toLocaleString()}
                      ₫
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity */}
                    <div className="flex items-center border rounded-lg p-1">
                      <button
                        onClick={() =>
                          updateSoluong(gh.id, Math.max(gh.soluong - 1, 1))
                        }
                        className="w-8 h-8 hover:bg-gray-100 rounded"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {gh.soluong}
                      </span>
                      <button
                        disabled={khongDuSoLuong || hetHang}
                        onClick={() => updateSoluong(gh.id, gh.soluong + 1)}
                        className="w-8 h-8 hover:bg-gray-100 rounded"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => deleteItem(gh.id)}
                      className="text-sm text-gray-400 hover:text-red-500"
                    >
                      🗑 Xóa
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= RIGHT ================= */}
        <div className="lg:col-span-4">
          <div
            className="sticky top-24 bg-white p-6 rounded-xl
                          border border-gray-100 shadow-sm flex flex-col gap-6"
          >
            <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>

            <div className="flex justify-between text-sm text-gray-500">
              <span>Đã chọn</span>
              <span className="font-medium text-blue-600">
                {selectedItems.length} sản phẩm
              </span>
            </div>

            <div className="flex justify-between text-sm text-gray-500">
              <span>Tạm tính</span>
              <span className="font-medium text-gray-900">
                {totalPrice.toLocaleString()}₫
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Vận chuyển</span>
              <span className="text-green-600 font-medium">Miễn phí</span>
            </div>

            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-lg font-bold">Tổng</span>
              <span className="text-2xl font-black text-gray-900">
                {totalPrice.toLocaleString()}₫
              </span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={selectedItems.length === 0}
              className={`w-full font-bold py-3.5 rounded-lg shadow-lg transition ${
                selectedItems.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 text-white"
              }`}
            >
              Thanh toán ({selectedItems.length})
            </button>

            <button
              onClick={() => navigate("/")}
              className="text-sm text-gray-500 hover:text-blue-600"
            >
              ← Tiếp tục mua sắm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCard;
