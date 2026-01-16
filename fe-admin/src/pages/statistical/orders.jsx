import React from "react";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Line,
  Cell,
} from "recharts";
import {
  getOrderDayApi,
  getOrderMonthcApi,
  getOrderStatusStatisticApi,
  getOrderYearApi,
} from "../../util/api";
const COLORS = [
  "#22c55e",
  "#ef4444",
  "#facc15",
  "#3b82f6",
  "#a855f7",
  "#f97316",
];

export const OrderStatusChart = () => {
  const [data, setData] = useState([]);
  const [ngay, setNgay] = useState([]);
  const [thang, setThang] = useState([]);
  const [nam, setNam] = useState([]);
  useEffect(() => {
    const fetchOrdersStatusChart = async () => {
      try {
        const res = await getOrderStatusStatisticApi();
        setData(res.data);
      } catch (error) {
        alert("Lỗi", error);
      }
    };
    fetchOrdersStatusChart();
    const fetchOrdersDayChart = async () => {
      try {
        const res = await getOrderDayApi();
        setNgay(res.data);
      } catch (error) {
        alert("Lỗi", error);
      }
    };
    fetchOrdersDayChart();
    const fetchOrdersMonthChart = async () => {
      try {
        const res = await getOrderMonthcApi();
        setThang(res.data);
      } catch (error) {
        alert("Lỗi", error);
      }
    };
    fetchOrdersMonthChart();
    const fetchOrdersNamChart = async () => {
      try {
        const res = await getOrderYearApi();
        setNam(res.data);
      } catch (error) {
        alert("Lỗi", error);
      }
    };
    fetchOrdersNamChart();
  }, []);

  return (
    <div className="bg-gray-100 p-4 space-y-6">
      {/* PIE CHART */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-3">Tỷ lệ trạng thái đơn hàng</h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="so_don"
              nameKey="status"
              outerRadius={120}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* LINE CHART - NGÀY */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-3">Số đơn hàng theo ngày</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={ngay}>
            <XAxis dataKey="ngay" />
            <YAxis />
            <Tooltip />
            <Line dataKey="so_don" stroke="#2563eb" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* GRID: THÁNG + NĂM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-3">Số đơn hàng theo tháng</h2>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={thang}>
              <XAxis dataKey="thang" />
              <YAxis />
              <Tooltip />
              <Line dataKey="so_don" stroke="#16a34a" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-3"> Số đơn hàng theo năm</h2>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={nam}>
              <XAxis dataKey="nam" />
              <YAxis />
              <Tooltip />
              <Line dataKey="so_don" stroke="#f97316" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
