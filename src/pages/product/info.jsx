import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSanphamRomMauApi } from "../../util/api";
import { InfoItem, Section } from "../../components/product/infoItem";

export const Info = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      getSanphamRomMauApi(id).then((res) => {
        console.log(res);
        setProduct(res.data);
      });
    }
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-96 text-gray-500">
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {product.tieu_de}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Mã sản phẩm: #{product.id}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate(`/products/edit/${product.id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
          >
            Chỉnh sửa
          </button>
          <button
            onClick={() => navigate("/product")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-lg font-semibold"
          >
            Quay lại
          </button>
        </div>
      </div>

      {/* Thông tin chính */}
      <div className="grid grid-cols-3 gap-6">
        {/* Image */}
        <div className="col-span-1 bg-white rounded-xl shadow p-4 flex flex-col items-center">
          <img
            src={
              product.hinh_anh?.startsWith("http")
                ? product.hinh_anh
                : product.hinh_anh
                ? `${import.meta.env.VITE_BACKEND_URL}${product.hinh_anh}`
                : ""
            }
            alt={product.tieu_de}
            className="w-full h-64 object-contain rounded"
          />
        </div>

        {/* Info */}
        <div className="col-span-2 bg-white rounded-xl shadow p-6 space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <InfoItem
              label="Giá gốc"
              value={`${Number(product.gia_ban).toLocaleString()} đ`}
              highlight
            />
            <InfoItem label="Danh mục" value={`ID: ${product.id_danh_muc}`} />
            <InfoItem label="Số phiên bản ROM" value={product.roms.length} />
            <InfoItem label="Số màu sắc" value={product.mausacs.length} />
          </div>
        </div>
      </div>
      <Section title="Mô tả sản phẩm">
        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
          {product.noi_dung || "Chưa có mô tả"}
        </div>
      </Section>

      {/* ROM */}
      <Section title="Danh sách phiên bản ROM">
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border">Dung lượng</th>
              <th className="p-3 border">Giá bán</th>
            </tr>
          </thead>
          <tbody>
            {product.roms.length > 0 ? (
              product.roms.map((rom) => (
                <tr key={rom.id} className="hover:bg-gray-50 transition">
                  <td className="p-3 border text-center font-semibold">
                    {rom.rom.toUpperCase()}
                  </td>
                  <td className="p-3 border text-center text-red-600 font-bold">
                    {Number(
                      rom.gia_thaydoi === 0
                        ? product.gia_ban
                        : Number(rom.gia_thaydoi + Number(product.gia_ban))
                    ).toLocaleString()}{" "}
                    đ
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center p-4 text-gray-500">
                  Không có ROM
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Section>

      {/* Màu sắc */}
      <Section title="Danh sách màu sắc">
        <div className="grid grid-cols-5 gap-5">
          {product.mausacs.length > 0 ? (
            product.mausacs.map((mau) => (
              <div
                key={mau.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-3"
              >
                <img
                  src={
                    mau.hinh_anh?.startsWith("http")
                      ? mau.hinh_anh
                      : mau.hinh_anh
                      ? `${import.meta.env.VITE_BACKEND_URL}${mau.hinh_anh}`
                      : ""
                  }
                  alt={mau.ten_mau}
                  className="w-full h-36 object-cover rounded-lg"
                />
                <p className="text-center mt-2 font-semibold text-gray-700">
                  {mau.ten_mau}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Không có màu sắc</p>
          )}
        </div>
      </Section>
      {/* Kho sản phẩm */}
      <Section title="Tồn kho theo phiên bản">
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 border">ROM</th>
              <th className="p-3 border">Màu sắc</th>
              <th className="p-3 border">Số lượng</th>
              <th className="p-3 border">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {product.kho && product.kho.length > 0 ? (
              product.kho.map((k) => (
                <tr key={k.id} className="hover:bg-gray-50">
                  <td className="p-3 border text-center font-semibold">
                    {k.rom?.rom?.toUpperCase()}
                  </td>
                  <td className="p-3 border text-center">
                    {k.mausac?.ten_mau}
                  </td>
                  <td className="p-3 border text-center font-bold">
                    {k.so_luong}
                  </td>
                  <td className="p-3 border text-center">
                    {k.trang_thai === 1 ? (
                      <span className="text-green-600 font-semibold">
                        Còn hàng
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        Hết hàng
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  Chưa có dữ liệu kho
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Section>
    </div>
  );
};
