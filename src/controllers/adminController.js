const {
  loginAdminService,
  createAdminService,
  getDoanhThuNgayService,
  getDoanhThuThangService,
  getDoanhThuNamService,
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
module.exports = {
  loginAdmin,
  getAdminMe,
  createAdmin,
  getDoanhThuNgay,
  getDoanhThuThang,
  getDoanhThuNam,
};
