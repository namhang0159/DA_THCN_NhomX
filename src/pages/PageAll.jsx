import React, { useEffect, useState } from "react";
import Product from "./product";
import { getDanhMucApi, getSanPhamApi, getTagProductApi } from "../util/api";
import { useLocation } from "react-router-dom";

export const PageAll = () => {
  const [sanpham, setSanPham] = useState([]);
  const [danhmuc, setDanhMuc] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const dm = await getDanhMucApi();
      setDanhMuc(dm.data || []);

      const params = new URLSearchParams(location.search);
      const tagId = params.get("tagId");

      if (tagId) {
        const sp = await getTagProductApi(tagId);
        setSanPham(sp.data || []);
      } else {
        const sp = await getSanPhamApi();
        setSanPham(sp.data || []);
      }
    };

    fetchData();
  }, [location.search]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Product title="Điện thoại" data={sanpham} type={danhmuc} />
      </div>
    </div>
  );
};
