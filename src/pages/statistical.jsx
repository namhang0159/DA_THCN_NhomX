import React, { useEffect, useState } from "react";
import {
  getDoanhThuNamApi,
  getDoanhThuNgayApi,
  getDoanhThuThangApi,
} from "../util/api";
import {
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Statistical = () => {
  const [dtngay, setDtngay] = useState([]);
  const [dtthang, setDtthang] = useState([]);
  const [dtnam, setDtnam] = useState([]);
  useEffect(() => {
    const fetchDoanhThuNgay = async () => {
      try {
        const res = await getDoanhThuNgayApi();
        setDtngay(res.data);
      } catch (error) {
        console.log("Loi ", error);
      }
    };
    fetchDoanhThuNgay();
    const fetchDoanhThuThang = async () => {
      try {
        const res = await getDoanhThuThangApi();
        setDtthang(res.data);
      } catch (error) {
        console.log("Loi ", error);
      }
    };
    fetchDoanhThuThang();
    const fetchDoanhThuNam = async () => {
      try {
        const res = await getDoanhThuNamApi();
        setDtnam(res.data);
      } catch (error) {
        console.log("Loi ", error);
      }
    };
    fetchDoanhThuNam();
  }, []);
  return (
    <div>
      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-3">
          Biểu Đồ Doanh Thu Theo Ngày
        </h3>

        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={dtngay}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="ngay" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="doanh_thu"
              name="Doanh thu"
              stroke="#4F46E5"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-3">
          Biểu Đồ Doanh Thu Theo Tháng
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={dtthang}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="thang" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar dataKey="doanh_thu" barSize={20} fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-3">
          Biểu Đồ Doanh Thu Theo Năm
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={dtnam}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nam" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="doanh_thu" barSize={30} fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
