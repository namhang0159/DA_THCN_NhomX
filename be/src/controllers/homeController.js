const sequelize = require("../config/database");
const Orders = require("../models/orders");
const kho_sanpham = require("../models/sanpham_kho");
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
  getAddressesByUserService,
  createAddressService,
  updateAddressService,
  deleteAddressService,
  chooseAddressService,
  truKho,
} = require("../services/userService");
const createUser = async (req, res) => {
  console.log("BODY:", req.body);
  const { name, email, password } = req.body;
  try {
    const data = await createUserService(name, email, password);
    if (data) {
      return res
        .status(201)
        .json({ message: "Tạo USER thành công", user: data });
    } else if (data == null) {
      return res.status(409).json({
        message: "USER_EXIST",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Tạo USER thất bại", error });
  }
};
const loginUser = async (req, res) => {
  console.log("BODY:", req.body);
  const { email, password } = req.body;
  const data = await loginUserService(email, password);
  if (data.EC !== 0) {
    return res.status(401).json(data);
  }
  return res.status(201).json({ message: "Login USER thành công", user: data });
  if (!data) {
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
    const order = await Orders.findByPk(id_order);
    if (order.status === "Đã thanh toán - Chờ xác nhận") {
      return res.status(200).json({ message: "OK" });
    }
    if (resultCode === 0) {
      await Orders.update(
        { status: "Đã thanh toán - Chờ xác nhận" },
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
const repayOrder = async (req, res) => {
  try {
    const { id } = req.body;

    const order = await Orders.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Đơn hàng không tồn tại" });
    }

    if (order.status === "Đã thanh toán - Chờ xác nhận") {
      return res.status(400).json({ message: "Đơn hàng đã thanh toán" });
    }

    if (!["Pending", "Thất bại"].includes(order.status)) {
      return res
        .status(400)
        .json({ message: "Không thể thanh toán lại đơn này" });
    }

    const orderId = `${order.id}_${Date.now()}`;

    const momoRes = await createPaymentService(orderId, Number(order.amount));

    if (!momoRes || !momoRes.payUrl) {
      return res.status(500).json({ message: "Tạo thanh toán MoMo thất bại" });
    }

    return res.status(200).json({
      message: "Tạo link thanh toán lại thành công",
      paymentUrl: momoRes.payUrl,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Lỗi server" });
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

      for (const item of items) {
        const kho = await kho_sanpham.findOne({
          where: {
            id_sanpham: item.id_sanpham,
            id_rom: item.id_rom,
            id_mausac: item.id_mau,
            trang_thai: 1,
          },
        });

        if (!kho || kho.so_luong < item.soluong) {
          return res.status(400).json({
            message: "Sản phẩm không đủ tồn kho",
          });
        }
      }
      amount += Number(sp.gia_ban) * Number(item.soluong);
    }
    for (const item of items) {
      await truKho(item);
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
const getAddressesByUser = async (req, res) => {
  const { id_user } = req.params;
  const data = await getAddressesByUserService(id_user);
  return res.status(200).json(data);
};

const createAddress = async (req, res) => {
  const data = await createAddressService(req.body);
  if (!data) return res.status(500).json({ message: "Tạo địa chỉ thất bại" });

  return res.status(201).json({
    message: "Tạo địa chỉ thành công",
    data,
  });
};

const updateAddress = async (req, res) => {
  const { id } = req.params;
  const data = await updateAddressService(id, req.body);

  if (!data) return res.status(404).json({ message: "Không tìm thấy địa chỉ" });

  return res.status(200).json({
    message: "Cập nhật địa chỉ thành công",
    data,
  });
};

const deleteAddress = async (req, res) => {
  const { id } = req.params;
  const result = await deleteAddressService(id);

  if (!result) return res.status(404).json({ message: "Xóa địa chỉ thất bại" });

  return res.status(200).json({ message: "Xóa địa chỉ thành công" });
};

const chooseAddress = async (req, res) => {
  const { id } = req.params;
  const data = await chooseAddressService(id);

  if (!data) return res.status(404).json({ message: "Không tìm thấy địa chỉ" });

  return res.status(200).json({
    message: "Đã chọn địa chỉ mặc định",
    data,
  });
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
  getAddressesByUser,
  createAddress,
  updateAddress,
  deleteAddress,
  chooseAddress,
  repayOrder,
};
