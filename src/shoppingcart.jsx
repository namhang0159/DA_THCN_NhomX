import React, { useEffect, useState } from "react";
import {
  deleteGHApi,
  getGioHangApi,
  getMauSacApi,
  getMeApi,
  getSanPhamApi,
  updateGioHangApi,
  updateMauGHApi,
} from "./util/api";
import { useNavigate } from "react-router-dom";

const ShoppingCard = () => {
  const [giohang, setGiohang] = useState([]);
  const [id, setId] = useState();
  const [sanpham, setSanPham] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [mau, setMau] = useState([]);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  // --- API Calls ---
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
    if (!id) return;
    const fetchGioHang = async () => {
      const res = await getGioHangApi();
      const filter = Array.isArray(res.data)
        ? res.data.filter((item) => item.id_user === Number(id))
        : [];
      setGiohang(filter);
    };
    fetchGioHang();
  }, [id]);

  useEffect(() => {
    if (!giohang.length) return;
    const fetchSanPham = async () => {
      const res = await getSanPhamApi();
      const sanphamIds = giohang.map((g) => g.id_sanpham);
      const filter = Array.isArray(res.data)
        ? res.data.filter((item) => sanphamIds.includes(item.id))
        : [];
      setSanPham(filter);
    };
    fetchSanPham();
  }, [giohang]);

  useEffect(() => {
    const fecthMau = async () => {
      const res = await getMauSacApi();
      setMau(res.data);
    };
    fecthMau();
  }, []);

  const updateSoluong = async (idGioHang, soluong) => {
    try {
      const res = await updateGioHangApi(idGioHang, soluong);
      if (res) {
        const reload = await getGioHangApi();
        setGiohang(reload.data);
      }
    } catch (err) {
      console.error("Lỗi:", err);
    }
  };

  const toggleSelect = (gh) => {
    const exists = selectedItems.find((s) => s.id === gh.id);
    const mauItem = mau.find((m) => m.id === gh.id_mau);
    const ten_mau = mauItem ? mauItem.ten_mau : "";
    if (exists) {
      setSelectedItems(selectedItems.filter((s) => s.id !== gh.id));
    } else {
      setSelectedItems([
        ...selectedItems,
        { id: gh.id, id_sanpham: gh.id_sanpham, soluong: gh.soluong, ten_mau },
      ]);
    }
  };

  const setAll = () => {
    const allItems = giohang.map((item) => ({
      id: item.id,
      id_sanpham: item.id_sanpham,
      soluong: item.soluong,
      id_mau: item.id_mau,
    }));
    setSelectedItems(allItems);
  };

  const handleDatNgay = () => {
    if (selectedItems.length === 0) {
      alert("Vui lòng chọn sản phẩm để đặt!");
      return;
    }
    localStorage.setItem("checkout_items", JSON.stringify(selectedItems));
    navigate("/payment");
  };

  const updateMauGH = async (id, id_mau) => {
    try {
      const res = await updateMauGHApi(id, id_mau);
      if (res) {
        const reload = await getGioHangApi();
        setGiohang(reload.data);
      }
    } catch (error) {
      console.error("Lỗi đổi màu:", error);
    }
  };

  const deleteItem = async (idGioHang) => {
    try {
      setGiohang((prev) => prev.filter((g) => g.id !== idGioHang));
      const res = await deleteGHApi(idGioHang);
      alert(res.data);
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
    }
  };
  return (
    <div className="max-w-5xl w-full mx-auto rounded-2xl shadow-xl bg-white p-4 md:p-6">
      <h1 className="text-center text-2xl md:text-3xl font-semibold mb-6 text-gray-700">
        🛒 Giỏ hàng của bạn
      </h1>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={setAll}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm md:text-base"
        >
          Chọn tất cả
        </button>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-500  text-white px-4 py-2 rounded-lg hover:bg-blue-400"
        >
          {isEditing ? "Hoàn tất" : "Chỉnh sửa"}
        </button>
      </div>

      <div className=" max-h-[70vh] overflow-y-auto pr-3">
        {giohang.length > 0 ? (
          giohang.map((gh, index) => {
            const sp = sanpham.find((s) => s.id === gh.id_sanpham);
            if (!sp) return null;
            const mauSac = mau.filter((it) => it.id_sanpham === sp.id);
            return (
              <div
                key={index}
                onClick={() => toggleSelect(gh)}
                className="relative bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition m-4 p-4 flex items-center justify-between"
              >
                <div
                  className={`flex  md:flex-row  gap-4 flex-1 items-center transition-transform duration-300 ${
                    isEditing ? "-translate-x-16" : ""
                  }`}
                >
                  {/* Checkbox chọn sản phẩm */}
                  <input
                    type="checkbox"
                    checked={selectedItems.some((s) => s.id === gh.id)}
                    onChange={() => toggleSelect(gh)}
                    className="w-5 h-5 accent-red-500"
                  />
                  {/* Ảnh */}
                  <img
                    src={sp.hinh_anh}
                    alt={sp.tieu_de}
                    className="w-16 h-16 object-contain rounded-md"
                  />

                  {/* Thông tin */}
                  <div className="flex-1 ml-4">
                    <h3 className="font-medium text-gray-800">{sp.tieu_de}</h3>
                    <p className="text-red-500 font-semibold">
                      {Number(sp.gia_ban).toLocaleString()}₫
                    </p>
                  </div>
                  {/* Màu sắc */}
                  <div className="flex-1 ml-4">
                    <h3 className=" text-gray-800 font-bold">Màu sắc</h3>
                    <select
                      value={gh?.id_mau ?? ""}
                      onChange={(e) => updateMauGH(gh.id, e.target.value)}
                    >
                      {mauSac.map((mItem, index) => (
                        <option key={index} value={mItem.id}>
                          {mItem.ten_mau}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Số lượng */}
                  <div className="flex flex-col items-center gap-2">
                    {/* Hiển thị số lượng */}
                    <div className="text-gray-600 font-medium">
                      SL: {gh?.soluong ?? 0}
                    </div>

                    {/* Nút tăng giảm */}
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                        onClick={() =>
                          updateSoluong(gh.id, Math.max(gh.soluong - 1, 1))
                        }
                      >
                        -
                      </button>
                      <button
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300"
                        onClick={() => updateSoluong(gh.id, gh.soluong + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => deleteItem(gh.id)}
                      className="absolute right-[-80px] md:h-[145%] h-full md:top-[-15px] -translate-y-0 bg-red-500 text-white md:px-6 px-2  md:rounded-r-xl  shadow hover:bg-red-400 transition"
                    >
                      Xóa
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 mt-20">
            Giỏ hàng của bạn đang trống
          </p>
        )}
      </div>

      {/* Nút đặt ngay */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleDatNgay}
          className="bg-red-500 px-6 py-3 rounded-2xl hover:bg-red-400 text-white font-semibold shadow-lg text-sm md:text-base"
        >
          Đặt Ngay
        </button>
      </div>
    </div>
  );
};

export default ShoppingCard;
