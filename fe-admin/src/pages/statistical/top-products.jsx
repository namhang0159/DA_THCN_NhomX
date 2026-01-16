import React, { useEffect, useState } from "react";
import {
  getTopDanhMucBanChayApi,
  getTopSanPhamBanChayApi,
} from "../../util/api";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import BarChartCustom from "../../components/statistical/BarChartCustom";
import PieChartCustom from "../../components/statistical/PieChartCustom";

export const Topproducts = () => {
  const [data, setData] = useState([]);
  const [dataC, setDataC] = useState([]);
  useEffect(() => {
    const fetchTopPro = async () => {
      try {
        const res = await getTopSanPhamBanChayApi();
        const formatted = res.data.map((item) => ({
          ten: item.sanpham.tieu_de,
          tong_ban: parseInt(item.tong_ban),
        }));
        setData(formatted);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTopPro();
    const fetchTopCate = async () => {
      try {
        const res = await getTopDanhMucBanChayApi();
        const formatted = res.data.map((item) => ({
          ten: item["sanpham.danhmucsanpham.ten_danh_muc"],
          tong_ban: Number(item.tong_ban),
        }));
        setDataC(formatted);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTopCate();
  }, []);
  return (
    <div>
      <BarChartCustom
        title="Top 3 sản phẩm bán chạy"
        data={data}
        dataKey="tong_ban"
        nameKey="ten"
      />
      <PieChartCustom
        title="Danh mục bán chạy"
        data={dataC}
        dataKey="tong_ban"
        nameKey="ten"
      />
    </div>
  );
};
