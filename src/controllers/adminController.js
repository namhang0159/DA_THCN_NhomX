const { name } = require("ejs");
const {
  loginAdminService,
  createAdminService,
  getDoanhThuNgayService,
  getDoanhThuThangService,
  getDoanhThuNamService,
  getOrderStatusStatisticService,
  getOrderByDayService,
  getOrderByMonthService,
  getOrderByYearService,
  getTopDanhMucBanChayService,
  getTopSanPhamBanChayService,
  getThongKeSoSaoService,
  getTop3SanPhamTotService,
  getTop3SanPhamThapService,
  getTiLeDanhGiaService,
  deleteSanPhamService,
  updateSanPhamService,
  getSanPhamByIdService,
  getAllSanPhamService,
  createSanPhamService,
  getOrderAllervice,
  updateOrderStatusService,
  getOrderItemByIdService,
  banUserService,
  deleteUserService,
  updateUserService,
  addCateService,
  deleteCateService,
  updateCategoryService,
  getTagService,
  createTagService,
  updateTagService,
  deleteTagService,
  removeTagFromProductService,
  addTagToProductService,
  getProductWithTagService,
  banDanhGiaService,
  getDanhGiaService,
} = require("../services/adminService");
const createAdmin = async (req, res) => {
  console.log("BODY:", req.body);
  const { username, email, password } = req.body;
  const data = await createAdminService(username, email, password);
  if (data) {
    return res.status(201).json({ message: "Tạo USER thành công", user: data });
  } else {
    return res.status(500).json({ message: "Tạo USER thất bại" });
  }
};
const loginAdmin = async (req, res) => {
  console.log("BODY:", req.body);
  const { email, password } = req.body;
  const data = await loginAdminService(email, password);
  console.log(data);
  if (data) {
    return res
      .status(201)
      .json({ message: "Login USER thành công", user: data });
  } else {
    return res.status(500).json({ message: "Login USER thất bại" });
  }
};

const getAdminMe = async (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Chưa xác thực hoặc thiếu access_token" });
  }
  const data = {
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
    exp: req.user.exp,
  };
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(500).json({ message: "Fetch user thất bại" });
  }
};
const getDoanhThuNgay = async (req, res) => {
  const data = await getDoanhThuNgayService();
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(500).json({ message: "Lỗi fetch" });
  }
};
const getDoanhThuThang = async (req, res) => {
  const data = await getDoanhThuThangService();
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(500).json({ message: "Lỗi fetch" });
  }
};
const getDoanhThuNam = async (req, res) => {
  const data = await getDoanhThuNamService();
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(500).json({ message: "Lỗi fetch" });
  }
};
const getOrderStatusStatistic = async (req, res) => {
  const data = await getOrderStatusStatisticService();
  if (data) {
    return res.status(200).json(data);
  }
  return res.status(500).json({ message: "Lỗi thống kê" });
};
const getOrdersNgay = async (req, res) => {
  const data = await getOrderByDayService();
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(500).json({ message: "Lỗi fetch" });
  }
};
const getOrdersThang = async (req, res) => {
  const data = await getOrderByMonthService();
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(500).json({ message: "Lỗi fetch" });
  }
};
const getOrdersNam = async (req, res) => {
  const data = await getOrderByYearService();
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(500).json({ message: "Lỗi fetch" });
  }
};
const getTopSanPhamBanChay = async (req, res) => {
  const data = await getTopSanPhamBanChayService();
  if (data) return res.status(200).json(data);
  return res.status(500).json({ message: "Lỗi thống kê" });
};

const getTopDanhMucBanChay = async (req, res) => {
  const data = await getTopDanhMucBanChayService();
  if (data) return res.status(200).json(data);
  return res.status(500).json({ message: "Lỗi thống kê" });
};
const getThongKeSoSao = async (req, res) => {
  try {
    const data = await getThongKeSoSaoService();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTop3SanPhamTot = async (req, res) => {
  try {
    const data = await getTop3SanPhamTotService();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTop3SanPhamThap = async (req, res) => {
  try {
    const data = await getTop3SanPhamThapService();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTiLeDanhGia = async (req, res) => {
  try {
    const data = await getTiLeDanhGiaService();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const createSanPhamController = async (req, res) => {
  const data = req.body;
  const result = await createSanPhamService(data);
  if (result) {
    return res.status(201).json({ data: result });
  }
  return res.status(500).json({ EC: 1, EM: "Thêm sản phẩm thất bại" });
};

// Lấy tất cả sản phẩm
const getAllSanPhamController = async (req, res) => {
  const result = await getAllSanPhamService();
  return res.status(200).json({ data: result });
};

// Lấy sản phẩm theo ID
const getSanPhamByIdController = async (req, res) => {
  const { id } = req.body;
  const result = await getSanPhamByIdService(id);
  if (result) {
    return res.status(200).json(result);
  }
  return res.status(404).json({ EC: 1, EM: "Không tìm thấy sản phẩm" });
};

// Cập nhật sản phẩm
const updateSanPhamController = async (req, res) => {
  const { id, dataVao } = req.body;

  const result = await updateSanPhamService(id, dataVao);
  if (result) {
    return res.status(200).json({ EM: "Cập nhật thành công" });
  }
  return res.status(500).json({ EM: "Cập nhật thất bại" });
};

const deleteSanPhamController = async (req, res) => {
  const { id } = req.body;
  const result = await deleteSanPhamService(id);
  if (result) {
    return res.status(200).json({ EM: "Xóa thành công" });
  }
  return res.status(500).json({ EC: 1, EM: "Xóa thất bại" });
};
const getAllOrderController = async (req, res) => {
  const result = await getOrderAllervice();
  return res.status(200).json(result);
};
const updateOrderStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    const result = await updateOrderStatusService(id, status);
    if (result) return res.status(200).json("Thành công");
  } catch (error) {
    return res.status(500).json({ EC: 1, EM: "Thất bại thất bại" });
  }
};
const getOrderItemIdController = async (req, res) => {
  const { id } = req.body;
  const result = await getOrderItemByIdService(id);
  if (result) {
    return res.status(200).json(result);
  }
  return res.status(404).json({ EC: 1, EM: "Không tìm thấy sản phẩm" });
};
const updateUser = async (req, res) => {
  const { id, data } = req.body;
  const { name, email } = data;
  const dataS = await updateUserService(id, name, email);
  return res.status(200).json(dataS);
};

const deleteUser = async (req, res) => {
  const { id } = req.body;
  const data = await deleteUserService(id);
  return res.status(200).json(data);
};

const banUser = async (req, res) => {
  const { id, isBan } = req.body;
  const data = await banUserService(id, isBan);
  return res.status(200).json(data);
};
const addCate = async (req, res) => {
  const { ten_danh_muc, hinh_anh } = req.body;
  const dataS = await addCateService(ten_danh_muc, hinh_anh);
  return res.status(200).json(dataS);
};
const deleteCate = async (req, res) => {
  const { id } = req.body;
  const dataS = await deleteCateService(id);
  return res.status(200).json(dataS);
};
const updateCate = async (req, res) => {
  const { id, ten_danh_muc, hinh_anh } = req.body;
  const dataS = await updateCategoryService(id, ten_danh_muc, hinh_anh);
  return res.status(200).json(dataS);
};
const getTag = async (req, res) => {
  try {
    const data = await getTagService();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server" });
  }
};
const createTag = async (req, res) => {
  try {
    const { ten_tag } = req.body;

    const data = await createTagService(ten_tag);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server" });
  }
};
const updateTag = async (req, res) => {
  try {
    const { id, ten_tag } = req.body;

    const data = await updateTagService(id, ten_tag);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server" });
  }
};
const deleteTag = async (req, res) => {
  try {
    const { id } = req.body;

    const data = await deleteTagService(id);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server" });
  }
};
const addTagProduct = async (req, res) => {
  const { id_sanpham, id_tag } = req.body;
  await addTagToProductService(id_sanpham, id_tag);
  res.json({ message: "Thêm tag thành công" });
};
const deleteTagProduct = async (req, res) => {
  const { id_sanpham, id_tag } = req.body;
  await removeTagFromProductService(id_sanpham, id_tag);
  res.json({ message: "Thêm tag thành công" });
};
const getTagProduct = async (req, res) => {
  try {
    const { id_tag } = req.body;
    const data = await getProductWithTagService(id_tag);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Lỗi server" });
  }
};
const getDanhGia = async (req, res) => {
  const data = await getDanhGiaService();
  return res.status(200).json(data);
};
const banDanhGia = async (req, res) => {
  const { id, is_ban } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "Thiếu id đánh giá",
    });
  }

  const result = await banDanhGiaService(id, is_ban);

  return res.status(200).json({
    success: result,
  });
};

module.exports = {
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
  getAllSanPhamController,
  getSanPhamByIdController,
  updateSanPhamController,
  deleteSanPhamController,
  getAllOrderController,
  updateOrderStatus,
  getOrderItemIdController,
  updateUser,
  deleteUser,
  banUser,
  addCate,
  deleteCate,
  updateCate,
  getTag,
  createTag,
  deleteTag,
  updateTag,
  addTagProduct,
  deleteTagProduct,
  getTagProduct,
  getDanhGia,
  banDanhGia,
};
