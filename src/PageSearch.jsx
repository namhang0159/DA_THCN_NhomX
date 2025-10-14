import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Content } from "./Content";
import { getSanPhamApi } from "./util/api";

const PageSearch = () => {
  const [searchMang] = useSearchParams();
  const keyword = searchMang.get("search") || "";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSanPhamApi();
      setProducts(res.data);
    };
    fetchData();
  }, []);

  const filteredData = products.filter((item) =>
    item.tieu_de.toLowerCase().includes(keyword.toLowerCase())
  );

  return <Content title="Tất cả sản phẩm" data={filteredData} />;
};

export default PageSearch;
