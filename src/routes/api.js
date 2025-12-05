const express = require("express");
const {
  createUser,
  loginUser,
  getSanPhamHot,
  getSanPhamBanChay,
  getSanPhamID,
  getSanPham,
  getDanhMuc,
  getMauSac,
  getBlog,
  getUser,
  getUserMe,
  getGioHang,
  updateGioHang,
  addGioHang,
  updateMauGioHang,
  createPayment,
  callbackPayment,
  statusPayment,
  createOrders,
  getOrderItem,
  getOrder,
  deleteGioHang,
  getRom,
  getRomByID,
  updateRomGioHang,
  getDanhGiaID,
  createDanhGia,
  checkDanhGia,
} = require("../controllers/homeController");

const auth = require("../middleware/auth");
const {
  loginAdmin,
  getAdminMe,
  createAdmin,
  getDoanhThuNgay,
  getDoanhThuThang,
  getDoanhThuNam,
} = require("../controllers/adminController");
const authAdmin = require("../middleware/authAdmiin");
const { uploadDanhGia } = require("../helper/uploadDanhgia");

const routerAPI = express.Router();
routerAPI.get("/", (req, res) => {
  return res.status(200).json("hello worrr");
});

//USER :
routerAPI.post("/register", createUser);
routerAPI.post("/login", loginUser);
routerAPI.get("/user", getUser);
routerAPI.get("/sanphamhot", getSanPhamHot);
routerAPI.get("/sanphambanchay", getSanPhamBanChay);
routerAPI.get("/sanpham/:id", getSanPhamID);
routerAPI.get("/sanpham", getSanPham);
routerAPI.get("/danhmuc", getDanhMuc);
routerAPI.get("/mausac", getMauSac);
routerAPI.get("/blog", getBlog);
routerAPI.get("/me", auth, getUserMe);
routerAPI.get("/giohang", getGioHang);
routerAPI.post("/updatesoluong", updateGioHang);
routerAPI.post("/addgiohang", addGioHang);
routerAPI.post("/updatemau", updateMauGioHang);
routerAPI.post("/updaterom", updateRomGioHang);
routerAPI.post("/deletegh", deleteGioHang);
routerAPI.post("/payment", createPayment);
routerAPI.post("/callback", callbackPayment);
routerAPI.post("/status", statusPayment);
routerAPI.post("/createorders", createOrders);
routerAPI.post("/orders", getOrder);
routerAPI.post("/orderitem", getOrderItem);
routerAPI.get("/rom", getRom);
routerAPI.get("/romid", getRomByID);
routerAPI.post("/danhgia", getDanhGiaID);
routerAPI.post(
  "/taodanhgia",
  auth,
  uploadDanhGia.single("hinh_anh"),
  createDanhGia
);
routerAPI.post("/checkdanhgia", auth, checkDanhGia);
//ADMIN
routerAPI.post("/registerAdmin", createAdmin);
routerAPI.post("/loginAdmin", loginAdmin);
routerAPI.get("/admin", authAdmin, getAdminMe);
routerAPI.get("/dtngay", getDoanhThuNgay);
routerAPI.get("/dtthang", getDoanhThuThang);
routerAPI.get("/dtnam", getDoanhThuNam);
module.exports = routerAPI;
