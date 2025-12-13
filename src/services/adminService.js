const { config } = require("dotenv");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Orders = require("../models/orders");
const { Sequelize } = require("sequelize");
const { OrderItem } = require("../models/orderitem");
const sanpham = require("../models/sanpham");
const danhmucsanpham = require("../models/danhmucsanpham");
const Danhgia = require("../models/danhgia");
const rom = require("../models/rom");
const mausac = require("../models/mausac");
const saltRounds = 10;
require("dotenv").config();
const createAdminService = async (username, email, password) => {
  if (!password) {
    throw new Error("Password is required");
  }
  const user = await Admin.findOne({ where: { email } });
  if (user) {
    console.log("User exist");
    return null;
  }
  try {
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const result = await Admin.create({
      username,
      email,
      password: hashPassword,
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const loginAdminService = async (email, password) => {
  if (!password) {
    throw new Error("Password is required");
  }

  try {
    const user = await Admin.findOne({ where: { email: email } });
    if (user) {
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (isMatchPassword) {
        const payload = {
          id: user.id,
          email: user.email,
          name: user.username,
        };
        const access_token = jwt.sign(payload, process.env.JWT_SECRET);

        return {
          EC: 0,
          access_token,

          user: {
            id: user.id,
            email: user.email,
            name: user.username,
          },
        };
      } else {
        return {
          EC: 1,
          EM: "Email hoặc mật khẩu không hợp lệ",
        };
      }
    } else {
      return {
        EC: 1,
        EM: "Email hoặc mật khẩu không hợp lệ",
      };
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getDoanhThuNgayService = async (id_sanpham) => {
  try {
    const result = await Orders.findAll({
      attributes: [
        [Sequelize.fn("DATE", Sequelize.col("createdAt")), "ngay"],
        [Sequelize.fn("SUM", Sequelize.col("amount")), "doanh_thu"],
      ],
      where: {
        status: "Thành Công",
      },
      group: [Sequelize.fn("DATE", Sequelize.col("createdAt"))],
      order: [[Sequelize.fn("DATE", Sequelize.col("createdAt")), "ASC"]],
      raw: true,
    });
    return result;
  } catch (error) {
    return null;
  }
};
const getDoanhThuThangService = async (id_sanpham) => {
  try {
    const result = await Orders.findAll({
      attributes: [
        [Sequelize.fn("YEAR", Sequelize.col("createdAt")), "nam"],
        [Sequelize.fn("MONTH", Sequelize.col("createdAt")), "thang"],
        [Sequelize.fn("SUM", Sequelize.col("amount")), "doanh_thu"],
      ],
      where: {
        status: "Thành Công",
      },
      group: [
        Sequelize.fn("YEAR", Sequelize.col("createdAt")),
        Sequelize.fn("MONTH", Sequelize.col("createdAt")),
      ],
      order: [
        [Sequelize.fn("YEAR", Sequelize.col("createdAt")), "ASC"],
        [Sequelize.fn("MONTH", Sequelize.col("createdAt")), "ASC"],
      ],
      raw: true,
    });
    return result;
  } catch (error) {
    return null;
  }
};
const getDoanhThuNamService = async (id_sanpham) => {
  try {
    const result = await Orders.findAll({
      attributes: [
        [Sequelize.fn("YEAR", Sequelize.col("createdAt")), "nam"],
        [Sequelize.fn("SUM", Sequelize.col("amount")), "doanh_thu"],
      ],
      where: {
        status: "Thành Công",
      },
      group: [Sequelize.fn("YEAR", Sequelize.col("createdAt"))],
      order: [[Sequelize.fn("YEAR", Sequelize.col("createdAt")), "ASC"]],
      raw: true,
    });
    return result;
  } catch (error) {
    return null;
  }
};
const getOrderStatusStatisticService = async () => {
  try {
    const result = await Orders.findAll({
      attributes: [
        "status",
        [Sequelize.fn("COUNT", Sequelize.col("id")), "so_don"],
      ],
      group: ["status"],
      raw: true,
    });
    return result;
  } catch (error) {
    return null;
  }
};
const getOrderByDayService = async () => {
  return await Orders.findAll({
    attributes: [
      [Sequelize.fn("DATE", Sequelize.col("createdAt")), "ngay"],
      [Sequelize.fn("COUNT", Sequelize.col("id")), "so_don"],
    ],
    group: [Sequelize.fn("DATE", Sequelize.col("createdAt"))],
    order: [[Sequelize.fn("DATE", Sequelize.col("createdAt")), "ASC"]],
    raw: true,
  });
};
const getOrderByMonthService = async () => {
  return await Orders.findAll({
    attributes: [
      [Sequelize.fn("YEAR", Sequelize.col("createdAt")), "nam"],
      [Sequelize.fn("MONTH", Sequelize.col("createdAt")), "thang"],
      [Sequelize.fn("COUNT", Sequelize.col("id")), "so_don"],
    ],
    group: [
      Sequelize.fn("YEAR", Sequelize.col("createdAt")),
      Sequelize.fn("MONTH", Sequelize.col("createdAt")),
    ],
    raw: true,
  });
};
const getOrderByYearService = async () => {
  return await Orders.findAll({
    attributes: [
      [Sequelize.fn("YEAR", Sequelize.col("createdAt")), "nam"],
      [Sequelize.fn("COUNT", Sequelize.col("id")), "so_don"],
    ],
    group: [Sequelize.fn("YEAR", Sequelize.col("createdAt"))],
    raw: true,
  });
};
const getTopSanPhamBanChayService = async () => {
  try {
    const result = await OrderItem.findAll({
      attributes: [
        "id_sanpham",
        [Sequelize.fn("SUM", Sequelize.col("soluong")), "tong_ban"],
      ],
      include: [
        {
          model: sanpham,
          attributes: ["tieu_de", "gia_ban", "hinh_anh"],
        },
      ],
      group: ["id_sanpham"],
      order: [[Sequelize.literal("tong_ban"), "DESC"]],
      limit: 3,
      raw: false,
    });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getTopDanhMucBanChayService = async () => {
  try {
    const result = await OrderItem.findAll({
      attributes: [
        [Sequelize.col("sanpham.id_danh_muc"), "id_danh_muc"],
        [Sequelize.fn("SUM", Sequelize.col("soluong")), "tong_ban"],
      ],
      include: [
        {
          model: sanpham,
          attributes: [],
          include: [
            {
              model: danhmucsanpham,
              attributes: ["ten_danh_muc"],
            },
          ],
        },
      ],
      group: ["sanpham.id_danh_muc", "sanpham->danhmucsanpham.id"],
      order: [[Sequelize.literal("tong_ban"), "DESC"]],
      raw: true,
    });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getThongKeSoSaoService = async () => {
  return await Danhgia.findAll({
    attributes: [
      "so_sao",
      [Sequelize.fn("COUNT", Sequelize.col("so_sao")), "so_luong"],
    ],
    group: ["so_sao"],
    order: [["so_sao", "ASC"]],
  });
};

const getTop3SanPhamTotService = async () => {
  return await Danhgia.findAll({
    attributes: [
      "id_sanpham",
      [Sequelize.fn("AVG", Sequelize.col("so_sao")), "diem_tb"],
      [Sequelize.fn("COUNT", Sequelize.col("id_sanpham")), "so_luot"],
    ],
    include: [{ model: sanpham }],
    group: ["id_sanpham"],
    order: [[Sequelize.literal("diem_tb"), "DESC"]],
    limit: 3,
  });
};

// 3. Top 3 sản phẩm đánh giá thấp nhất
const getTop3SanPhamThapService = async () => {
  return await Danhgia.findAll({
    attributes: [
      "id_sanpham",
      [Sequelize.fn("AVG", Sequelize.col("so_sao")), "diem_tb"],
      [Sequelize.fn("COUNT", Sequelize.col("id_sanpham")), "so_luot"],
    ],
    include: [{ model: sanpham }],
    group: ["id_sanpham"],
    order: [[Sequelize.literal("diem_tb"), "ASC"]],
    limit: 3,
  });
};

const getTiLeDanhGiaService = async () => {
  const total = await Orders.count({ where: { status: "Thành Công" } });

  const rated = await Danhgia.count({
    include: [
      {
        model: Orders,
        where: { status: "Thành Công" },
      },
    ],
  });

  return {
    totalOrders: total,
    ratedOrders: rated,
    notRated: total - rated,
  };
};
const createSanPhamService = async (data) => {
  try {
    const { roms, mausacs, ...productData } = data;

    // Tạo sản phẩm
    const newProduct = await sanpham.create(productData);

    // Thêm ROM nếu có
    if (roms && roms.length > 0) {
      const romData = roms.map((r) => ({
        rom: r.rom,
        gia_thaydoi: r.gia_thaydoi,
        id_sanpham: newProduct.id,
      }));
      await rom.bulkCreate(romData);
    }

    // Thêm màu sắc nếu có
    if (mausacs && mausacs.length > 0) {
      const mauData = mausacs.map((m) => ({
        ten_mau: m.ten_mau,
        hinh_anh: m.hinh_anh,
        id_sanpham: newProduct.id,
      }));
      await mausac.bulkCreate(mauData);
    }

    return newProduct;
  } catch (error) {
    console.error("Lỗi khi tạo sản phẩm:", error);
    return null;
  }
};
const getAllSanPhamService = async () => {
  try {
    const result = await sanpham.findAll({
      include: [{ model: rom }, { model: mausac }],
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Lấy sản phẩm theo ID
const getSanPhamByIdService = async (id) => {
  try {
    const result = await sanpham.findOne({
      where: { id },
      include: [
        { model: rom, as: "roms" },
        { model: mausac, as: "mausacs" },
      ],
    });
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateSanPhamService = async (id, data) => {
  try {
    const { roms = [], mausacs = [], ...productData } = data;

    await sanpham.update(productData, { where: { id } });

    if (roms) {
      await rom.destroy({ where: { id_sanpham: id } });
      const romData = roms.map((r) => ({
        rom: r.rom,
        gia_thaydoi: r.gia_thaydoi,
        id_sanpham: id,
      }));
      await rom.bulkCreate(romData);
    }

    if (mausacs) {
      await mausac.destroy({ where: { id_sanpham: id } });
      const mauData = mausacs.map((m) => ({
        ten_mau: m.ten_mau,
        hinh_anh: m.hinh_anh,
        id_sanpham: id,
      }));
      await mausac.bulkCreate(mauData);
    }

    return true;
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
    return false;
  }
};

// Xóa sản phẩm
const deleteSanPhamService = async (id) => {
  try {
    // Xóa ROM liên kết
    await rom.destroy({ where: { id_sanpham: id } });

    // Xóa màu sắc liên kết
    await mausac.destroy({ where: { id_sanpham: id } });

    // Cuối cùng xóa sản phẩm
    await sanpham.destroy({ where: { id } });

    return true;
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    return false;
  }
};
module.exports = {
  loginAdminService,
  createAdminService,
  getDoanhThuNgayService,
  getDoanhThuThangService,
  getDoanhThuNamService,
  getOrderStatusStatisticService,
  getOrderByDayService,
  getOrderByMonthService,
  getOrderByYearService,
  getTopSanPhamBanChayService,
  getTopDanhMucBanChayService,
  getThongKeSoSaoService,
  getTop3SanPhamTotService,
  getTop3SanPhamThapService,
  getTiLeDanhGiaService,
  createSanPhamService,
  getAllSanPhamService,
  getSanPhamByIdService,
  updateSanPhamService,
  deleteSanPhamService,
};
