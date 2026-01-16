import React, { useEffect, useState } from "react";
import PieChartCustom from "../../components/statistical/PieChartCustom";
import {
  getThongKeSoSaoApi,
  getTiLeDanhGiaApi,
  getTop3SanPhamThapApi,
  getTop3SanPhamTotApi,
} from "../../util/api";

export const ReviewStatistic = () => {
  const [tiLe, setTiLe] = useState([]);
  const [topTot, setTopTot] = useState([]);
  const [topThap, setTopThap] = useState([]);
  const [soSao, setSoSao] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const resTiLe = await getTiLeDanhGiaApi();
    const resTopTot = await getTop3SanPhamTotApi();
    const resTopThap = await getTop3SanPhamThapApi();
    const resSoSao = await getThongKeSoSaoApi();

    const tiLeData = [
      { name: "Đã đánh giá", value: resTiLe.data.ratedOrders },
      { name: "Chưa đánh giá", value: resTiLe.data.notRated },
    ];

    const saoData = resSoSao.data.map((item) => ({
      so_sao: item.so_sao,
      so_luong: item.so_luong,
    }));

    setTiLe(tiLeData);
    setTopTot(resTopTot.data);
    setTopThap(resTopThap.data);
    setSoSao(saoData);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Thống kê đánh giá sản phẩm</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PieChartCustom
          title="Phân bố số sao"
          data={soSao}
          dataKey="so_luong"
          nameKey="so_sao"
        />

        <PieChartCustom
          title="Tỉ lệ đơn hàng được đánh giá"
          data={tiLe}
          dataKey="value"
          nameKey="name"
        />
      </div>

      <div className="mt-6 bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold text-xl mb-4">
          Top 3 sản phẩm đánh giá tốt nhất
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topTot.map((item, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-sm hover:shadow transition"
            >
              <p className="font-semibold text-lg">{item.sanpham.tieu_de}</p>

              <p className="text-yellow-500 font-medium">
                {parseFloat(item.diem_tb).toFixed(1)} điểm
              </p>

              <p className="text-sm text-gray-600">
                {item.so_luot} lượt đánh giá
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Top 3 sản phẩm đánh giá thấp */}
      <div className="mt-6 bg-white p-4 rounded-xl shadow">
        <h2 className="font-bold text-xl mb-4">
          Top 3 sản phẩm đánh giá thấp nhất
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topThap.map((item, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-sm hover:shadow transition"
            >
              <p className="font-semibold text-lg">{item.sanpham.tieu_de}</p>

              <p className="text-red-500 font-medium">
                {parseFloat(item.diem_tb).toFixed(1)} sao
              </p>

              <p className="text-sm text-gray-600">
                {item.so_luot} lượt đánh giá
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
