import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addGioHangApi,
  getMauSacApi,
  getMeApi,
  getRomApi,
  getSanPhamHotApi,
  getSanphamRomMauApi,
} from "../util/api";
import Blog from "../compoment/blog";
import Modal from "react-modal";
import { GroupDanhGia } from "../compoment/danhgia/groupDanhGia";
import { ListSale } from "../compoment/ListSale";
const PageSP = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  function openModal(message) {
    setModalMessage(message);
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const navigate = useNavigate();
  const { id } = useParams();
  const [sanpham, setSanpham] = useState({});
  const [mausac, setMausac] = useState([]);
  const [hinhanh, setHinhanh] = useState();
  const [mausacC, setMausacC] = useState();
  const [login, setLogin] = useState(null);
  const [idmau, setIdMau] = useState();
  const [rom, setRom] = useState([]);
  const [romC, setRomC] = useState(null);
  const [gia_tang, setGia_tang] = useState(null);
  useEffect(() => {
    const fetchSanPham = async () => {
      try {
        const res = await getSanphamRomMauApi(id);
        console.log("API response:", res);
        const data = res.data;
        setSanpham(data);
      } catch (error) {
        console.error("Lỗi fetch sản phẩm:", error);
      }
    };

    fetchSanPham();
    const fetchMausac = async () => {
      const res = await getMauSacApi();
      const data = res.data;
      const mau = data.filter((item) => item.id_sanpham === Number(id));
      setMausac(mau);
    };
    fetchMausac();
  }, [id]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    const loginS = localStorage.getItem("access_token");
    if (loginS) {
      setLogin(loginS);
    }
  }, []);
  useEffect(() => {
    const fetchRom = async () => {
      const res = await getRomApi();
      const data = res.data;
      if (data) {
        const loc = data.filter((i) => i.id_sanpham === Number(id));
        setRom(loc);
      }
    };
    fetchRom();
  }, []);
  const addGioHang = async () => {
    if (!checkConHang(romC, idmau)) {
      openModal("Phiên bản này đã hết hàng");
      return;
    }

    if (!mausacC) {
      openModal("Cần chọn màu!");
      return;
    }
    if (!login) {
      openModal("Cần đăng nhập!");
      navigate("/login");
      return;
    }
    if (romC == null) {
      openModal("Cần chọn Rom!");
      return;
    }
    const res = await getMeApi();
    const idU = res.data.id;

    try {
      const res = await addGioHangApi(1, Number(sanpham.id), idU, idmau, romC);
      openModal("Thêm thành công!");
      console.log(res);
    } catch (err) {
      console.error(err);
      openModal("Lỗi!!!!!");
    }
  };
  const [sanphamhot, setSanPhamhot] = useState([]);

  useEffect(() => {
    const fecthSanPham = async () => {
      const res = await getSanPhamHotApi();
      const data = res.data;
      setSanPhamhot(data);
    };
    fecthSanPham();
  }, []);
  const checkConHang = (idRom, idMau) => {
    if (!sanpham.kho) return false;

    const item = sanpham.kho.find(
      (k) => k.id_rom === idRom && k.id_mausac === idMau
    );

    return item && item.so_luong > 0 && item.trang_thai === 1;
  };
  const checkMauConHang = (idMau) => {
    if (!romC) return true;
    return checkConHang(romC, idMau);
  };

  if (!sanpham || !sanpham.id) {
    return <p className="text-center mt-10">Đang tải sản phẩm...</p>;
  }
  return (
    <div className="bg-[#f6f7f8] min-h-screen text-[#111418] transition-colors">
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex gap-2 text-sm text-[#617589] mb-6">
          <span>Home</span>
          <span>/</span>
          <span>Products</span>
          <span>/</span>
          <span className="text-[#111418] font-medium">{sanpham.tieu_de}</span>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT – IMAGES */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main image */}
            <div
              className="w-full aspect-[4/3] bg-white rounded-xl border border-gray-200
                          flex items-center justify-center p-8 shadow-sm"
            >
              <img
                src={
                  hinhanh
                    ? hinhanh.startsWith("http")
                      ? hinhanh
                      : `${import.meta.env.VITE_BACKEND_URL}${hinhanh}`
                    : sanpham.hinh_anh?.startsWith("http")
                    ? sanpham.hinh_anh
                    : `${import.meta.env.VITE_BACKEND_URL}${sanpham.hinh_anh}`
                }
                alt={sanpham.tieu_de}
                className="max-h-full object-contain"
              />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {mausac.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setHinhanh(item.hinh_anh);
                    setMausacC(item.ten_mau);
                    setIdMau(item.id);
                  }}
                  className={`aspect-square rounded-lg p-2 border transition
                  ${
                    idmau === item.id
                      ? "border-blue-600"
                      : "border-gray-200 hover:border-blue-300"
                  }
                `}
                >
                  <img
                    src={
                      item.hinh_anh?.startsWith("http")
                        ? item.hinh_anh
                        : item.hinh_anh
                        ? `${import.meta.env.VITE_BACKEND_URL}${item.hinh_anh}`
                        : ""
                    }
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT – INFO */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 flex flex-col gap-6">
              {/* Title */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {sanpham.tieu_de}
                </h1>

                <div className="text-3xl font-bold">
                  {Number(
                    Number(sanpham.gia_ban) + Number(gia_tang || 0)
                  ).toLocaleString("vi-VN")}{" "}
                  đ
                </div>
              </div>

              {/* Description */}
              <p className="text-[#617589] leading-relaxed">
                {sanpham.mo_ta_ngan || "Sản phẩm chính hãng, bảo hành đầy đủ."}
              </p>

              <hr className="border-gray-200" />

              {/* COLOR */}
              <div className="flex flex-col gap-3">
                <span className="text-sm font-bold uppercase tracking-wider">
                  Chọn màu
                </span>
                <div className="flex flex-wrap gap-4">
                  {mausac.map((item) => (
                    <label
                      key={item.id}
                      className={`relative size-10 ${
                        romC && !checkMauConHang(item.id)
                          ? "opacity-40 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      <input
                        type="radio"
                        className="peer sr-only"
                        disabled={romC && !checkMauConHang(item.id)}
                        checked={idmau === item.id}
                        onChange={() => {
                          if (!checkMauConHang(item.id)) return;
                          setHinhanh(item.hinh_anh);
                          setMausacC(item.ten_mau);
                          setIdMau(item.id);
                        }}
                      />

                      <span
                        className="absolute inset-0 rounded-full border border-gray-300
                                 bg-center bg-cover"
                        style={{
                          backgroundImage: `url(${
                            item.hinh_anh?.startsWith("http")
                              ? item.hinh_anh
                              : item.hinh_anh
                              ? `${import.meta.env.VITE_BACKEND_URL}${
                                  item.hinh_anh
                                }`
                              : ""
                          })`,
                        }}
                      />
                      <span
                        className="absolute -inset-1 rounded-full border-2 border-transparent
                                 peer-checked:border-blue-600"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* ROM */}
              <div className="flex flex-col gap-3">
                <span className="text-sm font-bold uppercase tracking-wider">
                  Dung lượng
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {rom.map((item) => {
                    const conHang = idmau && checkConHang(item.id, idmau);

                    return (
                      <label
                        key={item.id}
                        className={`cursor-pointer ${
                          idmau && !conHang
                            ? "opacity-40 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          className="peer sr-only"
                          disabled={idmau && !conHang}
                          checked={romC === item.id}
                          onChange={() => {
                            if (!conHang) return;
                            setRomC(item.id);
                            setGia_tang(item.gia_thaydoi);
                          }}
                        />

                        <div
                          className={`rounded-lg border p-3 text-center transition
          ${
            idmau && !conHang
              ? "border-gray-300 bg-gray-100"
              : "border-gray-300 peer-checked:border-blue-600 peer-checked:bg-blue-50"
          }
        `}
                        >
                          <div className="font-bold">{item.rom}</div>

                          {idmau && !conHang ? (
                            <div className="text-xs text-red-500 font-semibold">
                              Hết hàng
                            </div>
                          ) : (
                            <div className="text-xs text-gray-500">
                              +
                              {Number(item.gia_thaydoi).toLocaleString("vi-VN")}{" "}
                              đ
                            </div>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col gap-4 mt-2">
                <button
                  onClick={addGioHang}
                  className="w-full h-12 rounded-lg bg-blue-600 hover:bg-blue-700
                           text-white font-bold transition active:scale-[0.99]"
                >
                  Thêm vào giỏ
                </button>

                <button
                  onClick={() => {
                    if (!checkConHang(romC, idmau)) {
                      openModal("Phiên bản này đã hết hàng");
                      return;
                    }

                    if (!login) {
                      openModal("Cần đăng nhập!");
                      navigate("/login");
                      return;
                    }
                    if (!idmau || !romC) {
                      openModal("Vui lòng chọn màu và ROM");
                      return;
                    }
                    localStorage.setItem(
                      "checkout_items",
                      JSON.stringify([
                        {
                          id_sanpham: sanpham.id,
                          soluong: 1,
                          ten_mau: mausacC,
                          id_mau: idmau,
                          id_rom: romC,
                        },
                      ])
                    );
                    navigate("/payment");
                  }}
                  className="w-full h-12 rounded-lg border border-gray-300
                           hover:bg-gray-100 font-bold transition"
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="mt-10 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold mb-3">Mô tả sản phẩm</h2>
          <p className="text-gray-700 leading-relaxed">{sanpham.noi_dung}</p>
        </div>

        {/* BLOG */}
        <Blog id={id} title={sanpham.tieu_de} />

        {/* REVIEWS */}
        <div className="mt-10">
          <GroupDanhGia id={id} max={3} />
        </div>

        {/* HOT PRODUCTS */}
        <div className="mt-14">
          <ListSale title="Nổi bật" data={sanphamhot} />
        </div>
      </div>

      {/* MODAL */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="w-[90%] max-w-md mx-auto mt-[20vh]
                 bg-white rounded-xl shadow-lg p-6 outline-none"
      >
        <p className="text-center font-bold text-xl mb-6">{modalMessage}</p>
        <div className="flex justify-center">
          <button
            onClick={closeModal}
            className="px-6 py-3 bg-green-400 rounded-lg font-bold"
          >
            OK
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PageSP;
