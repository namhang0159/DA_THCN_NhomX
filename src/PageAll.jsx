import React, { useEffect, useState } from "react";
import Product from "./product";
import { getDanhMucApi, getSanPhamApi } from "./util/api";

export const PageAll = () => {
  const [sanpham, setSanPham] = useState([]);
  const [danhmuc, setDanhMuc] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const sp = await getSanPhamApi();
      const dm = await getDanhMucApi();
      setSanPham(sp.data || []);
      setDanhMuc(dm.data || []);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Product title="Điện thoại" data={sanpham} type={danhmuc} />
      </div>
    </div>
  );
};
