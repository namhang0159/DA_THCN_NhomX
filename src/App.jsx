import { Header } from "./Header";
import { Banner } from "./Banner";
import { ListSale } from "./ListSale";
import { Content } from "./Content";
import { useEffect, useState } from "react";
import axios from "./util/axios.cusomize";
import { getSanPhamBanChayApi, getSanPhamHotApi, getUserApi } from "./util/api";
function App() {
  useEffect(() => {
    const fetchhello = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/v1/api/`
      );
      console.log("check", res);
    };
    fetchhello();
    const fecthUser = async () => {
      const res = await getUserApi();
      console.log(res);
    };
    fecthUser();
  }, []);
  const [sanphamhot, setSanPhamhot] = useState([]);
  const [sanphambanchay, setSanPhambanchay] = useState([]);
  useEffect(() => {
    const fecthSanPham = async () => {
      const res = await getSanPhamHotApi();
      console.log(res);
      const data = res.data;
      setSanPhamhot(data);
    };
    fecthSanPham();
  }, []);
  useEffect(() => {
    const fecthSanPhamBanChay = async () => {
      const res = await getSanPhamBanChayApi();
      const data = res.data;
      setSanPhambanchay(data);
    };
    fecthSanPhamBanChay();
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen">
      <Banner />

      <div className="max-w-7xl mx-auto px-4">
        <ListSale title="Sản phẩm nổi bật" data={sanphamhot} />
        <Content title="Bán chạy" data={sanphambanchay} />
      </div>
    </div>
  );
}

export default App;
