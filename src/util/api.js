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
const getOrdersApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/orderAll`;
  return axios.get(URL_API);
};
const updateOrderStatusAPI = (id, status) => {
  const URL_API = `${
    import.meta.env.VITE_BACKEND_URL
  }/v1/api/updateStatusOrder`;
  const data = { id, status };
  return axios.post(URL_API, data);
};
const getOrderItemAPI = (id) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/orderIt`;
  const data = { id };
  return axios.post(URL_API, data);
};
const getUsersApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/user`;
  return axios.get(URL_API);
};
const updateUserAPI = (id, data) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/updateUser`;
  const dataGui = { id, data };
  return axios.post(URL_API, dataGui);
};
const deleteUserAPI = (id) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/deleteUser`;
  const dataGui = { id };
  return axios.post(URL_API, dataGui);
};
const banUserAPI = (id, isBan) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/banUser`;
  const dataGui = { id, isBan };
  return axios.post(URL_API, dataGui);
};
const getCategoryApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/danhmuc`;
  return axios.get(URL_API);
};
const createCateAPI = (ten_danh_muc, hinh_anh) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/createCate`;
  const dataGui = { ten_danh_muc, hinh_anh };
  return axios.post(URL_API, dataGui);
};
const deleteCateAPI = (id) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/deleteCate`;
  const dataGui = { id };
  return axios.post(URL_API, dataGui);
};
const updateCateAPI = (id, ten_danh_muc, hinh_anh) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/updateCate`;
  const dataGui = { id, ten_danh_muc, hinh_anh };
  return axios.post(URL_API, dataGui);
};
const getTagApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/getTag`;
  return axios.get(URL_API);
};
const createTagAPI = (ten_tag) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/createTag`;
  const dataGui = { ten_tag };
  return axios.post(URL_API, dataGui);
};
const deleteTagAPI = (id) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/deleteTag`;
  const dataGui = { id };
  return axios.post(URL_API, dataGui);
};
const updateTagAPI = (id, ten_tag) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/updateTag`;
  const dataGui = { id, ten_tag };
  return axios.post(URL_API, dataGui);
};
const getTagProApi = (id_tag) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/getTagPro`;
  const data = { id_tag };
  return axios.post(URL_API, data);
};
const createTagProAPI = (id_sanpham, id_tag) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/createTagPro`;
  const dataGui = { id_sanpham, id_tag };
  return axios.post(URL_API, dataGui);
};
const deleteTagProAPI = (id_sanpham, id_tag) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/deleteTagPro`;
  const dataGui = { id_sanpham, id_tag };
  return axios.post(URL_API, dataGui);
};
const getDanhGiaApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/getDanhGia`;

  return axios.get(URL_API);
};
const banDanhGiaApi = (id, is_ban) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/banDanhGia`;
  const dataGui = { id, is_ban };
  return axios.post(URL_API, dataGui);
};
const getBlogsApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/read`;
  return axios.get(URL_API);
};

const createBlogApi = (data) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/create`;
  return axios.post(URL_API, data);
};

const updateBlogApi = (id, data) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/update/${id}`;
  return axios.put(URL_API, data);
};

const deleteBlogApi = (id) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/delete/${id}`;
  return axios.delete(URL_API);
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
  getOrdersApi,
  updateOrderStatusAPI,
  getOrderItemAPI,
  getUsersApi,
  updateUserAPI,
  deleteUserAPI,
  banUserAPI,
  getCategoryApi,
  createCateAPI,
  deleteCateAPI,
  updateCateAPI,
  getTagApi,
  createTagAPI,
  deleteTagAPI,
  updateTagAPI,
  getTagProApi,
  createTagProAPI,
  deleteTagProAPI,
  getDanhGiaApi,
  banDanhGiaApi,
  getBlogsApi,
  createBlogApi,
  updateBlogApi,
  deleteBlogApi,
};
