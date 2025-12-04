const Orders = require("../models/orders");
const { get } = require("../routes/api");
const {
  createPaymentService,
  statusPaymentService,
} = require("../services/paymentService");
const {
  createUserService,
  loginUserService,
  getSanPhamService,
  getSanPhamIDService,
  getDanhMucService,
  getMauSacService,
  getBlogService,
  getUserService,
  getGioHangApi,
  updateGioHangService,
  addGioHangService,
  updateMauGioHangService,
  updateRomGioHangService,
  createOrderService,
  createOrderItemService,
  getOrdersApi,
  getOrdersService,
  getOrderItemService,
  getSanPhamALLIDService,
  deleteGioHangService,
  getRomService,
  getRomByIDService,
  getDanhGia,
  getDanhGiaService,
  createDanhGiaService,
  checkDanhGiaService,
} = require("../services/userService");
const createUser = async (req, res) => {
  console.log("BODY:", req.body);
  const { name, email, password } = req.body;
  const data = await createUserService(name, email, password);
  if (data) {
    return res.status(201).json({ message: "Tạo USER thành công", user: data });
  } else {
    return res.status(500).json({ message: "Tạo USER thất bại" });
  }
};
const loginUser = async (req, res) => {
  console.log("BODY:", req.body);
  const { email, password } = req.body;
  const data = await loginUserService(email, password);
  if (data) {
    return res
      .status(201)
      .json({ message: "Login USER thành công", user: data });
  } else {
    return res.status(500).json({ message: "Login USER thất bại" });
  }
};
const getSanPhamHot = async (req, res) => {
  const data = await getSanPhamService("Nổi bật");
  return res.status(200).json(data);
};
const getSanPhamBanChay = async (req, res) => {
  const data = await getSanPhamService("Bán chạy");
  return res.status(200).json(data);
};
const getSanPhamID = async (req, res) => {
  const { id } = req.params;
  const data = await getSanPhamIDService(id);
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(500).json({ message: "Fetch sanpham thất bại" });
  }
};
const getSanPham = async (req, res) => {
  const data = await getSanPhamService();
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(500).json({ message: "Fetch sanpham thất bại" });
  }
};
const getDanhMuc = async (req, res) => {
  const data = await getDanhMucService();
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(500).json({ message: "Fetch sanpham thất bại" });
  }
};
const getMauSac = async (req, res) => {
  const data = await getMauSacService();
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(500).json({ message: "Fetch sanpham thất bại" });
  }
};
const getBlog = async (req, res) => {
  const data = await getBlogService();
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(500).json({ message: "Fetch sanpham thất bại" });
  }
};
const getUser = async (req, res) => {
  const data = await getUserService();
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(500).json({ message: "Fetch user thất bại" });
  }
};
const getUserMe = async (req, res) => {
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
const getGioHang = async (req, res) => {
  const data = await getGioHangApi();
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(500).json({ message: "Fetch sanpham thất bại" });
  }
};
const updateGioHang = async (req, res) => {
  const { id, soluong } = req.body;
  const data = await updateGioHangService(id, soluong);
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(500).json({ message: "Fetch sanpham thất bại" });
  }
};
const addGioHang = async (req, res) => {
  const { soluong, id_sanpham, id_user, id_mau, id_rom } = req.body;
  const data = await addGioHangService(
    soluong,
    id_sanpham,
    id_user,
    id_mau,
    id_rom
  );
  if (data) {
    return res.status(200).json("Them thanh cong");
  } else {
    return res.status(500).json({ message: "Add san pham that bai" });
  }
};
const updateMauGioHang = async (req, res) => {
  const { id, id_mau } = req.body;
  const data = await updateMauGioHangService(id, id_mau);
  if (data) {
    return res.status(200).json("Thanh Cong");
  } else {
    return res.status(500).json({ message: "Update sanpham thất bại" });
  }
};
const updateRomGioHang = async (req, res) => {
  const { id, id_rom } = req.body;
  const data = await updateRomGioHangService(id, id_rom);
  if (data) {
    return res.status(200).json("Thanh Cong");
  } else {
    return res.status(500).json({ message: "Update sanpham thất bại" });
  }
};
const deleteGioHang = async (req, res) => {
  const { id } = req.body;
  const data = await deleteGioHangService(id);
  if (data) {
    return res.status(200).json("Thanh Cong");
  } else {
    return res.status(500).json({ message: "Update sanpham thất bại" });
  }
};
const createPayment = async (req, res) => {
  const { amount, orderInfo } = req.body;
  const data = await createPaymentService(amount, orderInfo);
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(500).json({ message: "CREATE PAY sanpham thất bại" });
  }
};
const callbackPayment = async (req, res) => {
  if (req) {
    console.log(">>callback");
    console.log(req.body);
    const { orderId, resultCode } = req.body;
    const id_order = orderId.split("_")[0];
    if (resultCode === 0) {
      await Orders.update(
        { status: "Thành công" },
        { where: { id: id_order } }
      );
    } else {
      await Orders.update({ status: "Thất bại" }, { where: { id: id_order } });
    }
    return res.status(200).json({ message: "Callback nhận thành công" });
  } else {
    return res.status(500).json({ message: "CREATE PAY sanpham thất bại" });
  }
};
const statusPayment = async (req, res) => {
  const { orderId } = req.body;
  const data = await statusPaymentService(orderId);
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(500).json({ message: "CREATE PAY sanpham thất bại" });
  }
};
const createOrders = async (req, res) => {
  const { id_user, items, ten, sdt, dia_chi, cach_nhan, cach_thanhtoan } =
    req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Danh sách sản phẩm không hợp lệ" });
  }
  try {
    let amount = 0;
    for (const item of items) {
      const [sp] = await getSanPhamALLIDService(item.id_sanpham);
      if (!sp) {
        return res
          .status(404)
          .json({ message: `Sản phẩm ID ${item.id_sanpham} không tồn tại` });
      }
      amount += Number(sp.gia_ban) * Number(item.soluong);
    }
    if (amount > 1000000) {
      amount = 50000;
    }
    const order = await createOrderService(
      amount,
      cach_thanhtoan,
      cach_nhan,
      ten,
      sdt,
      dia_chi,
      id_user
    );
    const id_order = order.id;
    for (const item of items) {
      const sp = await getSanPhamIDService(item.id_sanpham);
      const res = await createOrderItemService(
        item.soluong,
        id_order,
        item.id_sanpham,
        item.id_mau,
        item.id_rom
      );
      if (res) {
        console.log("Thanh Cong");
      } else {
        console.log("that bai");
      }
    }
    if (cach_thanhtoan === "COD") {
      for (const item of items) {
        const giohang = await getGioHangApi();
        for (const gh of giohang) {
          if (gh.id_user === id_user && item.id_sanpham === gh.id_sanpham) {
            await deleteGioHangService(gh.id);
          }
        }
      }
      return res.json({ order, message: "Đặt hàng thành công (COD)" });
    }
    if (cach_thanhtoan === "MOMO") {
      const orderId = `${order.id}_${Date.now()}`;
      const momoRes = await createPaymentService(orderId, amount);
      console.log("MoMo response:", momoRes);
      if (!momoRes || !momoRes.payUrl) {
        return res
          .status(500)
          .json({ message: "Tạo thanh toán MoMo thất bại" });
      }
      for (const item of items) {
        const giohang = await getGioHangApi();
        for (const gh of giohang) {
          if (gh.id_user === id_user && item.id_sanpham === gh.id_sanpham)
            await deleteGioHangService(gh.id);
        }
      }
      return res.json({ order, paymentUrl: momoRes.payUrl });
    }
    return res.status(400).json({ message: "ERROR" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "CREATE PAY sanpham thất bại" });
  }
};
const getOrder = async (req, res) => {
  const { id_user } = req.body;
  const data = await getOrdersService(id_user);
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(500).json({ message: "Fetch sanpham thất bại" });
  }
};
const getOrderItem = async (req, res) => {
  const { id_order } = req.body;
  const data = await getOrderItemService(id_order);
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(500).json({ message: "Fetch sanpham thất bại" });
  }
};
const getRom = async (req, res) => {
  const data = await getRomService();
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(500).json({ message: "Lỗi fetch ROM" });
  }
};
const getRomByID = async (req, res) => {
  const { id } = req.params;
  const data = await getRomByIDService(id);
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(500).json({ message: "Lỗi fetch ROM" });
  }
};
const getDanhGiaID = async (req, res) => {
  const { id } = req.body;
  const data = await getDanhGiaService(id);
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(500).json({ message: "Lỗi fetch DanhGia" });
  }
};
const createDanhGia = async (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ message: "Chưa xác thực hoặc thiếu access_token" });
  }
  const { id_sanpham, id_order, so_sao, noi_dung } = req.body;
  let hinh_anh = null;
  if (req.file) {
    hinh_anh = "/uploads/danhgia/" + req.file.filename;
  }
  const data = await createDanhGiaService(
    req.user.id,
    id_sanpham,
    id_order,
    so_sao,
    noi_dung,
    hinh_anh
  );
  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(500).json({ message: "Lỗi fetch DanhGia" });
  }
};
const checkDanhGia = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Chưa xác thực" });
    }

    const { id_sanpham, id_order } = req.body;

    const checked = await checkDanhGiaService(
      req.user.id,
      id_sanpham,
      id_order
    );

    return res.status(200).json({
      reviewed: !!checked,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
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
};
