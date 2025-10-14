import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addGioHangApi,
  getMauSacApi,
  getMeApi,
  getSanPhamIDApi,
} from "./util/api";
import Blog from "./blog";
import Modal from "react-modal";
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
  useEffect(() => {
    const fetchSanPham = async () => {
      try {
        const res = await getSanPhamIDApi(id);
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
    const loginS = localStorage.getItem("access_token");
    if (loginS) {
      setLogin(loginS);
    }
  }, []);
  const addGioHang = async () => {
    if (!mausacC) {
      openModal("Cần chọn màu!");
      return;
    }
    if (!login) {
      openModal("Cần đăng nhập!");
      navigate("/login");
      return;
    }
    const res = await getMeApi();
    const idU = res.data.id;

    try {
      const res = await addGioHangApi(1, Number(sanpham.id), idU, idmau);
      openModal("Thêm thành công!");
      console.log(res);
    } catch (err) {
      console.error(err);
      openModal("Lỗi!!!!!");
    }
  };

  if (!sanpham || !sanpham.id) {
    return <p className="text-center mt-10">Đang tải sản phẩm...</p>;
  }
  return (
    <div>
      <div className="w-full px-10 py-12 flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
            {sanpham.tieu_de}
          </h1>
          <div className="w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex justify-center">
            <img
              src={hinhanh || sanpham.hinh_anh}
              alt={sanpham.tieu_de}
              className="max-h-[400px] object-contain"
            />
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col justify-start gap-6">
          <div className="bg-gray-50 p-6 rounded-2xl shadow">
            <p className="text-gray-600 text-lg font-bold">Giá sản phẩm</p>
            <div className="flex gap-10 items-center">
              <p className="text-red-600 font-bold text-3xl mt-2">
                {Number(sanpham.gia_ban).toLocaleString("vi-VN")} đ
              </p>
              <p className="text-gray-400 text-lg line-through mt-3">
                {Number(sanpham.gia_ban * 1.5).toLocaleString("vi-VN")} đ
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center flex-wrap">
            {mausac.length > 0 ? (
              mausac.map((item, index) => (
                <div
                  onClick={() => {
                    setHinhanh(item.hinh_anh);
                    setMausacC(item.ten_mau);
                    setIdMau(item.id);
                  }}
                  key={index}
                  className={`flex items-center p-4 w-42 gap-4 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer border border-gray-200 ${
                    item.ten_mau === mausacC
                      ? "border-red-600 border-2 "
                      : "border-white"
                  }`}
                >
                  <img
                    src={item.hinh_anh}
                    alt={item.ten_mau}
                    className="w-16 h-16 object-cover rounded-2xl mb-2"
                  />
                  <p className="text-sm font-medium text-gray-700">
                    {item.ten_mau}
                  </p>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                Không có màu nào
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <button
              className="w-[80%] bg-red-600 text-white py-3 rounded-2xl text-xl font-semibold hover:bg-red-700 transition"
              onClick={() => {
                if (login) {
                  if (!idmau) {
                    openModal("Cần chọn màu !");
                  } else if (login) {
                    const checkoutItem = {
                      id_sanpham: sanpham.id,
                      soluong: 1,
                      ten_mau: mausacC,
                      id_mau: idmau,
                    };

                    localStorage.setItem(
                      "checkout_items",
                      JSON.stringify([checkoutItem])
                    );
                    navigate(`/payment`);
                  }
                } else {
                  openModal("Cần đăng nhập trước !");
                  navigate("/login");
                }
              }}
            >
              Mua Ngay
            </button>
            <button
              className="flex p-4 bg-gray-300 rounded-2xl items-center gap-2 font-semibold hover:text-red-700 transition"
              onClick={() => addGioHang()}
            >
              <i className="fa fa-shopping-bag"></i> Thêm vào giỏ
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold mb-3 text-gray-800">
              Mô tả sản phẩm
            </h2>
            <p className="text-gray-700 leading-relaxed">{sanpham.noi_dung}</p>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="w-[90%] max-w-md mx-auto mt-[20vh] bg-white rounded-2xl shadow-lg p-6 outline-none"
        contentLabel="Thông báo"
      >
        <p className="text-gray-600 text-center mb-6 font-bold text-2xl">
          {modalMessage}
        </p>
        <div className="w-full flex justify-center">
          <button
            className="bg-green-300 rounded-2xl p-4 text-center"
            onClick={closeModal}
          >
            OK
          </button>
        </div>
      </Modal>
      <Blog id={id} title={sanpham.tieu_de}></Blog>
    </div>
  );
};

export default PageSP;
