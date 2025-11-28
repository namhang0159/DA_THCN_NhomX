import React, { useEffect, useState } from "react";
import Product from "./product";
import { getDanhMucApi, getSanPhamApi } from "./util/api";
export const PageAll = () => {
  const [sanpham, setSanPham] = useState([]);
  const [danhmuc, setDanhMuc] = useState([]);
  useEffect(() => {
    const fecthSanPham = async () => {
      const res = await getSanPhamApi();
      const data = res.data;
      setSanPham(data);
    };
    fecthSanPham();
    const fecthDanhMuc = async () => {
      const res = await getDanhMucApi();
      const data = res.data;
      setDanhMuc(data);
    };
    fecthDanhMuc();
  }, []);
  return (
    <div>
      <Product title={"Điện thoại"} data={sanpham} type={danhmuc} />
      <div className="flex "></div>
    </div>
  );
};
