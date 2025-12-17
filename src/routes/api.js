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
  getOrderStatusStatistic,
  getOrdersNgay,
  getOrdersThang,
  getOrdersNam,
  getTopSanPhamBanChay,
  getTopDanhMucBanChay,
  getThongKeSoSao,
  getTop3SanPhamTot,
  getTop3SanPhamThap,
  getTiLeDanhGia,
  createSanPhamController,
  updateSanPhamController,
  deleteSanPhamController,
  getAllSanPhamController,
  getSanPhamByIdController,
  getAllOrderController,
  updateOrderStatus,
  getOrderItemIdController,
  updateUser,
  deleteUser,
  banUser,
  updateCate,
  deleteCate,
  addCate,
  getTag,
  createTag,
  updateTag,
  deleteTag,
  addTagProduct,
  deleteTagProduct,
  getTagProduct,
  getDanhGia,
  banDanhGia,
} = require("../controllers/adminController");
const authAdmin = require("../middleware/authAdmiin");
const { uploadDanhGia } = require("../helper/uploadDanhgia");
const { getSanPhamALLIDService } = require("../services/userService");

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
routerAPI.get("/statistic/status", getOrderStatusStatistic);
routerAPI.get("/statistic/day", getOrdersNgay);
routerAPI.get("/statistic/month", getOrdersThang);
routerAPI.get("/statistic/year", getOrdersNam);
routerAPI.get("/thongke/top-sanpham", getTopSanPhamBanChay);
routerAPI.get("/thongke/top-danhmuc", getTopDanhMucBanChay);
routerAPI.get("/thongke/so-sao", getThongKeSoSao);
routerAPI.get("/thongke/top3-tot", getTop3SanPhamTot);
routerAPI.get("/thongke/top3-thap", getTop3SanPhamThap);
routerAPI.get("/thongke/ti-le", getTiLeDanhGia);
routerAPI.post("/product", getSanPhamByIdController);
routerAPI.post("/createproduct", createSanPhamController);
routerAPI.post("/updateProduct", updateSanPhamController);
routerAPI.post("/deleteProduct", deleteSanPhamController);
routerAPI.get("/orderAll", getAllOrderController);
routerAPI.post("/updateStatusOrder", updateOrderStatus);
routerAPI.post("/orderIt", getOrderItemIdController);
routerAPI.post("/updateUser", updateUser);
routerAPI.post("/deleteUser", deleteUser);
routerAPI.post("/banUser", banUser);
routerAPI.post("/createCate", addCate);
routerAPI.post("/updateCate", updateCate);
routerAPI.post("/deleteCate", deleteCate);
routerAPI.get("/getTag", getTag);
routerAPI.post("/createTag", createTag);
routerAPI.post("/updateTag", updateTag);
routerAPI.post("/deleteTag", deleteTag);
routerAPI.post("/createTagPro", addTagProduct);
routerAPI.post("/getTagPro", getTagProduct);
routerAPI.post("/deleteTagPro", deleteTagProduct);
routerAPI.get("/getDanhGia", getDanhGia);
routerAPI.post("/banDanhGia", banDanhGia);
module.exports = routerAPI;
