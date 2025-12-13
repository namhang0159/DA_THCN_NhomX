import axios from "./api.customize.js";

const LoginApi = (email, password) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/loginAdmin`;
  const data = {
    email,
    password,
  };
  return axios.post(URL_API, data);
};
const fetchMeApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/admin`;
  return axios.get(URL_API);
};
const getDoanhThuNgayApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/dtngay`;
  return axios.get(URL_API);
};
const getDoanhThuThangApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/dtthang`;
  return axios.get(URL_API);
};
const getDoanhThuNamApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/dtnam`;
  return axios.get(URL_API);
};
const getSanphamApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/sanpham`;
  return axios.get(URL_API);
};
const getSanphamRomMauApi = (id) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/product`;
  const data = { id };
  return axios.post(URL_API, data);
};
const getOrderStatusStatisticApi = () => {
  const URL_API = `${
    import.meta.env.VITE_BACKEND_URL
  }/v1/api//statistic/status`;
  return axios.get(URL_API);
};
const getOrderDayApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/statistic/day`;
  return axios.get(URL_API);
};
const getOrderMonthcApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/statistic/month`;
  return axios.get(URL_API);
};
const getOrderYearApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/statistic/year`;
  return axios.get(URL_API);
};
const getTopSanPhamBanChayApi = () => {
  const URL_API = `${
    import.meta.env.VITE_BACKEND_URL
  }/v1/api/thongke/top-sanpham`;
  return axios.get(URL_API);
};
const getTopDanhMucBanChayApi = () => {
  const URL_API = `${
    import.meta.env.VITE_BACKEND_URL
  }/v1/api/thongke/top-danhmuc`;
  return axios.get(URL_API);
};
const getThongKeSoSaoApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/thongke/so-sao`;
  return axios.get(URL_API);
};

const getTop3SanPhamTotApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/thongke/top3-tot`;
  return axios.get(URL_API);
};

const getTop3SanPhamThapApi = () => {
  const URL_API = `${
    import.meta.env.VITE_BACKEND_URL
  }/v1/api/thongke/top3-thap`;
  return axios.get(URL_API);
};

const getTiLeDanhGiaApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/thongke/ti-le`;
  return axios.get(URL_API);
};
const addSanPhamAPI = (data) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/createProduct`;

  return axios.post(URL_API, data);
};
const updateSanPhamAPI = (id, dataVao) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/updateProduct`;
  const data = { id, dataVao };
  return axios.post(URL_API, data);
};
const deleteSanPhamAPI = (id) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/deleteProduct`;
  const data = { id };
  return axios.post(URL_API, data);
};
const getDanhMucApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/danhmuc`;
  return axios.get(URL_API);
};
export {
  LoginApi,
  fetchMeApi,
  getDoanhThuNgayApi,
  getDoanhThuThangApi,
  getDoanhThuNamApi,
  getSanphamApi,
  getOrderStatusStatisticApi,
  getOrderDayApi,
  getOrderMonthcApi,
  getOrderYearApi,
  getTopSanPhamBanChayApi,
  getTopDanhMucBanChayApi,
  getThongKeSoSaoApi,
  getTop3SanPhamTotApi,
  getTop3SanPhamThapApi,
  getTiLeDanhGiaApi,
  addSanPhamAPI,
  updateSanPhamAPI,
  deleteSanPhamAPI,
  getDanhMucApi,
  getSanphamRomMauApi,
};
