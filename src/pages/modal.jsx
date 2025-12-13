import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  addSanPhamAPI,
  updateSanPhamAPI,
  getDanhMucApi,
  getSanphamRomMauApi,
} from "../util/api";

export const ProductAdd = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    tieu_de: "",
    gia_ban: 0,
    hinh_anh: "",
    id_danh_muc: "",
    roms: [],
    mausacs: [],
  });

  useEffect(() => {
    const fetchDanhMuc = async () => {
      try {
        const res = await getDanhMucApi();
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDanhMuc();
  }, []);

  useEffect(() => {
    if (id) {
      getSanphamRomMauApi(id).then((res) => {
        setProduct({
          tieu_de: res.data.tieu_de || "",
          gia_ban: res.data.gia_ban || 0,
          hinh_anh: res.data.hinh_anh || "",
          id_danh_muc: res.data.id_danh_muc || "",
          roms: res.data.roms || [],
          mausacs: res.data.mausacs || [],
        });
        console.log(res.data);
      });
    }
  }, [id]);

  const handleAddRom = () => {
    setProduct({
      ...product,
      roms: [...product.roms, { rom: "64gb", gia_thaydoi: 0 }],
    });
  };

  const handleAddMau = () => {
    setProduct({
      ...product,
      mausacs: [...product.mausacs, { ten_mau: "", hinh_anh: "" }],
    });
  };

  const handleSubmit = async () => {
    if (id) {
      console.log(id);
      console.log(product);

      const res = await updateSanPhamAPI(id, product);
      console.log(res);
    } else {
      await addSanPhamAPI(product);
    }
    navigate("/product");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {id ? "Sửa sản phẩm" : "Thêm sản phẩm"}
      </h1>

      {/* Thông tin cơ bản */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-semibold mb-1">Tên sản phẩm</label>
          <input
            type="text"
            value={product.tieu_de}
            onChange={(e) =>
              setProduct({ ...product, tieu_de: e.target.value })
            }
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Giá gốc</label>
          <input
            type="number"
            value={product.gia_ban}
            onChange={(e) =>
              setProduct({ ...product, gia_ban: e.target.value })
            }
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Hình ảnh</label>
          <input
            type="text"
            value={product.hinh_anh}
            onChange={(e) =>
              setProduct({ ...product, hinh_anh: e.target.value })
            }
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Danh mục</label>
          <select
            value={product.id_danh_muc}
            onChange={(e) =>
              setProduct({ ...product, id_danh_muc: e.target.value })
            }
            className="border rounded p-2 w-full"
          >
            <option value="">-- Chọn danh mục --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.ten_danh_muc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ROM Section */}
      <h2 className="text-xl font-bold mb-2">Danh sách ROM</h2>
      <table className="w-full border mb-3">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Dung lượng</th>
            <th className="p-2 border">Giá thay đổi</th>
          </tr>
        </thead>
        <tbody>
          {product.roms.map((rom, idx) => (
            <tr key={idx}>
              <td className="p-2 border">
                <select
                  value={rom.rom}
                  onChange={(e) => {
                    const newRoms = [...product.roms];
                    newRoms[idx].rom = e.target.value;
                    setProduct({ ...product, roms: newRoms });
                  }}
                  className="border rounded p-1 w-full"
                >
                  <option value="64gb">64gb</option>
                  <option value="128gb">128gb</option>
                  <option value="256gb">256gb</option>
                  <option value="512gb">512gb</option>
                  <option value="1T">1T</option>
                </select>
              </td>
              <td className="p-2 border">
                <input
                  type="number"
                  value={rom.gia_thaydoi}
                  onChange={(e) => {
                    const newRoms = [...product.roms];
                    newRoms[idx].gia_thaydoi = e.target.value;
                    setProduct({ ...product, roms: newRoms });
                  }}
                  className="border rounded p-1 w-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleAddRom}
        className="bg-green-500 text-white px-3 py-2 rounded mb-6"
      >
        + Thêm ROM
      </button>

      {/* Màu sắc Section */}
      <h2 className="text-xl font-bold mb-2">Danh sách màu sắc</h2>
      <table className="w-full border mb-3">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Tên màu</th>
            <th className="p-2 border">Hình ảnh</th>
          </tr>
        </thead>
        <tbody>
          {product.mausacs.map((mau, idx) => (
            <tr key={idx}>
              <td className="p-2 border">
                <input
                  type="text"
                  value={mau.ten_mau}
                  onChange={(e) => {
                    const newMausacs = [...product.mausacs];
                    newMausacs[idx].ten_mau = e.target.value;
                    setProduct({ ...product, mausacs: newMausacs });
                  }}
                  className="border rounded p-1 w-full"
                />
              </td>
              <td className="p-2 border">
                <input
                  type="text"
                  value={mau.hinh_anh}
                  onChange={(e) => {
                    const newMausacs = [...product.mausacs];
                    newMausacs[idx].hinh_anh = e.target.value;
                    setProduct({ ...product, mausacs: newMausacs });
                  }}
                  className="border rounded p-1 w-full"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleAddMau}
        className="bg-blue-500 text-white px-3 py-2 rounded mb-6"
      >
        + Thêm màu
      </button>

      {/* Submit */}
      <div className="text-center">
        <button
          onClick={handleSubmit}
          className="bg-amber-500 text-white px-6 py-3 rounded font-bold"
        >
          {id ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
        </button>
      </div>
    </div>
  );
};
