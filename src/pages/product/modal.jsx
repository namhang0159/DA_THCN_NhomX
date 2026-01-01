import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  addSanPhamAPI,
  getDanhMucApi,
  getSanphamRomMauApi,
} from "../../util/api";
import axios from "../../util/api.customize";

export const ProductAdd = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [imageType, setImageType] = useState("url"); // "url" | "file"

  const [product, setProduct] = useState({
    tieu_de: "",
    gia_ban: 0,
    hinh_anh: "",
    id_danh_muc: 0,
    noi_dung: "",
    roms: [],
    mausacs: [],
    kho: [],
    imageFile: null,
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
        const roms = res.data.roms || [];
        const mausacs = res.data.mausacs || [];
        const khoRaw = res.data.kho || [];

        // 🔥 map id_rom + id_mausac → romIndex + mauIndex
        const khoMapped = khoRaw.map((k) => ({
          romIndex: roms.findIndex((r) => r.id === k.id_rom),
          mauIndex: mausacs.findIndex((m) => m.id === k.id_mausac),
          so_luong: k.so_luong,
        }));

        setProduct({
          tieu_de: res.data.tieu_de || "",
          gia_ban: res.data.gia_ban || 0,
          hinh_anh: res.data.hinh_anh || "",
          id_danh_muc: res.data.id_danh_muc || "",
          noi_dung: res.data.noi_dung || "",
          roms,
          mausacs,
          kho: khoMapped,
        });
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
      mausacs: [
        ...product.mausacs,
        {
          ten_mau: "",
          hinh_anh: "",
          imageFile: null, // FILE
          imageType: "url",
        },
      ],
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("tieu_de", product.tieu_de);
    formData.append("gia_ban", product.gia_ban);
    formData.append("id_danh_muc", product.id_danh_muc);
    formData.append("noi_dung", product.noi_dung);
    formData.append("roms", JSON.stringify(product.roms));
    formData.append("kho", JSON.stringify(product.kho));

    if (imageType === "file" && product.imageFile) {
      formData.append("image", product.imageFile);
    } else {
      formData.append("hinh_anh", product.hinh_anh);
    }

    product.mausacs.forEach((mau, index) => {
      formData.append(`mausacs[${index}][ten_mau]`, mau.ten_mau);

      if (mau.imageType === "file" && mau.imageFile) {
        formData.append(`mausacs[${index}][image]`, mau.imageFile);
      } else {
        formData.append(`mausacs[${index}][hinh_anh]`, mau.hinh_anh);
      }
    });

    if (id) {
      formData.append("id", id);
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/v1/api/updateProduct`,
        formData
      );
    } else {
      await addSanPhamAPI(formData);
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
              setProduct({ ...product, gia_ban: Number(e.target.value) })
            }
            className="border rounded p-2 w-full"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Hình ảnh</label>

          {/* Chọn kiểu ảnh */}
          <div className="flex gap-4 mb-2">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="url"
                checked={imageType === "url"}
                onChange={() => setImageType("url")}
              />
              URL
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                value="file"
                checked={imageType === "file"}
                onChange={() => setImageType("file")}
              />
              Upload file
            </label>
          </div>

          {/* Nhập URL */}
          {imageType === "url" && (
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={product.hinh_anh}
              onChange={(e) =>
                setProduct({ ...product, hinh_anh: e.target.value })
              }
              className="border rounded p-2 w-full"
            />
          )}

          {/* Upload file */}
          {imageType === "file" && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setProduct({ ...product, imageFile: e.target.files[0] })
              }
              className="border rounded p-2 w-full"
            />
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Danh mục</label>
          <select
            value={product.id_danh_muc}
            onChange={(e) =>
              setProduct({ ...product, id_danh_muc: Number(e.target.value) })
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
      <div className="mb-6">
        <label className="block font-semibold mb-1">
          Mô tả chi tiết sản phẩm
        </label>
        <textarea
          rows={5}
          value={product.noi_dung}
          onChange={(e) => setProduct({ ...product, noi_dung: e.target.value })}
          className="border rounded p-3 w-full resize-none"
          placeholder="Nhập mô tả chi tiết sản phẩm..."
        />
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
                  <option value="2T">2T</option>
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
              <td className="p-2 border space-y-2">
                {/* Chọn kiểu ảnh */}
                <div className="flex gap-3 text-sm">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name={`mau-image-${idx}`}
                      checked={mau.imageType === "url"}
                      onChange={() => {
                        const newMausacs = [...product.mausacs];
                        newMausacs[idx].imageType = "url";
                        setProduct({ ...product, mausacs: newMausacs });
                      }}
                    />
                    URL
                  </label>

                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      checked={mau.imageType === "file"}
                      name={`mau-image-${idx}`}
                      onChange={() => {
                        const newMausacs = [...product.mausacs];
                        newMausacs[idx].imageType = "file";
                        setProduct({ ...product, mausacs: newMausacs });
                      }}
                    />
                    File
                  </label>
                </div>

                {/* Nhập URL */}
                {mau.imageType === "url" && (
                  <input
                    type="text"
                    placeholder="https://..."
                    value={mau.hinh_anh}
                    onChange={(e) => {
                      const newMausacs = [...product.mausacs];
                      newMausacs[idx].hinh_anh = e.target.value;
                      setProduct({ ...product, mausacs: newMausacs });
                    }}
                    className="border rounded p-1 w-full"
                  />
                )}

                {/* Upload file */}
                {mau.imageType === "file" && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const newMausacs = [...product.mausacs];
                      newMausacs[idx].imageFile = e.target.files[0];
                      setProduct({ ...product, mausacs: newMausacs });
                    }}
                    className="border rounded p-1 w-full"
                  />
                )}
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
      {/* KHO SẢN PHẨM */}
      <h2 className="text-xl font-bold mb-2">Kho sản phẩm</h2>

      {product.roms.length === 0 || product.mausacs.length === 0 ? (
        <p className="text-gray-500 italic mb-6">
          Vui lòng thêm ROM và Màu sắc để nhập kho
        </p>
      ) : (
        <table className="w-full border mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ROM</th>
              <th className="p-2 border">Màu</th>
              <th className="p-2 border">Số lượng</th>
            </tr>
          </thead>
          <tbody>
            {product.roms.map((rom, rIdx) =>
              product.mausacs.map((mau, mIdx) => {
                const khoItem = product.kho.find(
                  (k) => k.romIndex === rIdx && k.mauIndex === mIdx
                ) || {
                  romIndex: rIdx,
                  mauIndex: mIdx,
                  so_luong: 0,
                };

                return (
                  <tr key={`${rIdx}-${mIdx}`}>
                    <td className="p-2 border">{rom.rom}</td>
                    <td className="p-2 border">{mau.ten_mau}</td>
                    <td className="p-2 border">
                      <input
                        type="number"
                        min={0}
                        value={khoItem.so_luong}
                        onChange={(e) => {
                          const newKho = product.kho.filter(
                            (k) => !(k.romIndex === rIdx && k.mauIndex === mIdx)
                          );

                          newKho.push({
                            romIndex: rIdx,
                            mauIndex: mIdx,
                            so_luong: Number(e.target.value),
                          });

                          setProduct({ ...product, kho: newKho });
                        }}
                        className="border rounded p-1 w-full"
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      )}

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
