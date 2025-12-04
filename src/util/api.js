import axios from "axios";
const createUserApi = (name, email, password) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/register`;
  const data = {
    name,
    email,
    password,
  };
  return axios.post(URL_API, data);
};

const loginUserApi = (email, password) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/login`;
  const data = {
    email,
    password,
  };
  return axios.post(URL_API, data);
};
const getSanPhamHotApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/sanphamhot`;
  return axios.get(URL_API);
};

const getSanPhamBanChayApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/sanphambanchay`;
  return axios.get(URL_API);
};

const getSanPhamIDApi = (id) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/sanpham/${id}`;
  return axios.get(URL_API);
};
const getSanPhamApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/sanpham`;
  return axios.get(URL_API);
};
const getDanhMucApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/danhmuc`;
  return axios.get(URL_API);
};
const getMauSacApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/mausac`;
  return axios.get(URL_API);
};
const getBlogApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/blog`;
  return axios.get(URL_API);
};
const getUserApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/user`;
  return axios.get(URL_API);
};
const getMeApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/me`;
  return axios.get(URL_API);
};
const getGioHangApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/giohang`;
  return axios.get(URL_API);
};
const updateGioHangApi = (id, soluong) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/updatesoluong`;
  const data = {
    id,
    soluong,
  };
  return axios.post(URL_API, data);
};
const addGioHangApi = (soluong, id_sanpham, id_user, id_mau, id_rom) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/addgiohang`;
  const data = {
    soluong,
    id_sanpham,
    id_user,
    id_mau,
    id_rom,
  };
  return axios.post(URL_API, data);
};
const updateMauGHApi = (id, id_mau) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/updatemau`;
  const data = {
    id,
    id_mau,
  };
  return axios.post(URL_API, data);
};
const updateRomGHApi = (id, id_rom) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/updaterom`;
  const data = {
    id,
    id_rom,
  };
  return axios.post(URL_API, data);
};
const deleteGHApi = (id) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/deletegh`;
  const data = {
    id,
  };
  return axios.post(URL_API, data);
};
const createOrders = (
  id_user,
  items,
  ten,
  sdt,
  dia_chi,
  cach_nhan,
  cach_thanhtoan
) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/createorders`;
  const data = {
    id_user,
    items,
    ten,
    sdt,
    dia_chi,
    cach_nhan,
    cach_thanhtoan,
  };
  return axios.post(URL_API, data);
};
const checkStatusApi = (orderId) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/status`;
  const data = {
    orderId,
  };
  return axios.post(URL_API, data);
};
const getOrdersApi = (id_user) => {
  if (id_user === undefined || id_user === null) {
    return Promise.reject(new Error("id_user không hợp lệ"));
  }
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/orders`;
  const data = {
    id_user,
  };
  return axios.post(URL_API, data);
};
const getOrderItemApi = (id_order) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/orderitem`;
  const data = {
    id_order,
  };
  return axios.post(URL_API, data);
};
const getRomApi = () => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/rom`;
  return axios.get(URL_API);
};
const getDanhGiaApi = (id) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/danhgia`;
  const data = {
    id,
  };
  return axios.post(URL_API, data);
};
const taoDanhGiaApi = (id_sanpham, id_order, so_sao, noi_dung, hinh_anh) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/taodanhgia`;
  const form = new FormData();
  form.append("id_sanpham", id_sanpham);
  form.append("id_order", id_order);
  form.append("so_sao", so_sao);
  form.append("noi_dung", noi_dung);
  if (hinh_anh) form.append("hinh_anh", hinh_anh);

  return axios.post(URL_API, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
const checkDanhGiaApi = (id_sanpham, id_order) => {
  const URL_API = `${import.meta.env.VITE_BACKEND_URL}/v1/api/checkdanhgia`;
  const data = {
    id_sanpham,
    id_order,
  };
  return axios.post(URL_API, data);
};
export {
  createUserApi,
  loginUserApi,
  getSanPhamHotApi,
  getSanPhamBanChayApi,
  getSanPhamIDApi,
  getSanPhamApi,
  getDanhMucApi,
  getMauSacApi,
  getBlogApi,
  getUserApi,
  getMeApi,
  getGioHangApi,
  updateGioHangApi,
  addGioHangApi,
  updateMauGHApi,
  createOrders,
  checkStatusApi,
  deleteGHApi,
  getOrdersApi,
  getOrderItemApi,
  getRomApi,
  updateRomGHApi,
  getDanhGiaApi,
  checkDanhGiaApi,
  taoDanhGiaApi,
};
