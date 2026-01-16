const { config } = require("dotenv");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Orders = require("../models/orders");
const { Sequelize, where } = require("sequelize");
const { OrderItem } = require("../models/orderitem");
const sanpham = require("../models/sanpham");
const danhmucsanpham = require("../models/danhmucsanpham");
const Danhgia = require("../models/danhgia");
const rom = require("../models/rom");
const mausac = require("../models/mausac");
const User = require("../models/user");
const sanphamtag = require("../models/sanphamtag");
const { SanPham, SanPhamTag } = require("../models");
const SanPhamTagMap = require("../models/sanpham_tag");
const Blog = require("../models/blog");
const kho_sanpham = require("../models/sanpham_kho");
const sequelize = require("../config/database");
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
  const t = await sequelize.transaction();

  try {
    const { roms = [], mausacs = [], kho = [], ...productData } = data;

    // 1. Tạo sản phẩm
    const newProduct = await sanpham.create(productData, { transaction: t });

    // 2. Thêm ROM
    let romRecords = [];
    if (roms.length > 0) {
      const romData = roms.map((r) => ({
        rom: r.rom,
        gia_thaydoi: r.gia_thaydoi,
        id_sanpham: newProduct.id,
      }));

      romRecords = await rom.bulkCreate(romData, {
        transaction: t,
        returning: true,
      });
    }

    // 3. Thêm màu sắc
    let mauRecords = [];
    if (mausacs.length > 0) {
      const mauData = mausacs.map((m) => ({
        ten_mau: m.ten_mau,
        hinh_anh: m.hinh_anh,
        id_sanpham: newProduct.id,
      }));

      mauRecords = await mausac.bulkCreate(mauData, {
        transaction: t,
        returning: true,
      });
    }

    // 4. Thêm kho (ROM × MÀU)
    if (kho.length > 0) {
      const khoData = kho.map((k) => ({
        id_sanpham: newProduct.id,
        id_rom: romRecords[k.romIndex].id,
        id_mausac: mauRecords[k.mauIndex].id,
        so_luong: k.so_luong,
        trang_thai: k.so_luong > 0 ? 1 : 0,
      }));

      await kho_sanpham.bulkCreate(khoData, {
        transaction: t,
      });
    }

    await t.commit();
    return newProduct;
  } catch (error) {
    await t.rollback();
    console.error("Lỗi khi tạo sản phẩm:", error);
    throw error;
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
    const includeConfig = [
      { model: rom, as: "roms" },
      { model: mausac, as: "mausacs" },
      {
        model: kho_sanpham,
        as: "kho",
        attributes: ["id_rom", "id_mausac", "so_luong", "trang_thai"],
        include: [
          { model: rom, attributes: ["id", "rom"] },
          { model: mausac, attributes: ["id", "ten_mau"] },
        ],
      },
    ];

    if (!id) {
      return await sanpham.findAll({
        include: includeConfig,
      });
    }

    return await sanpham.findOne({
      where: { id },
      include: includeConfig,
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateSanPhamService = async (id, data) => {
  const t = await sequelize.transaction();

  try {
    const { roms = [], mausacs = [], kho = [], ...productData } = data;

    // 1️⃣ Update thông tin sản phẩm
    await sanpham.update(productData, {
      where: { id },
      transaction: t,
    });

    // 2️⃣ XÓA ĐÚNG THỨ TỰ (CON → CHA)
    await kho_sanpham.destroy({
      where: { id_sanpham: id },
      transaction: t,
    });

    await rom.destroy({
      where: { id_sanpham: id },
      transaction: t,
    });

    await mausac.destroy({
      where: { id_sanpham: id },
      transaction: t,
    });

    // 3️⃣ TẠO ROM MỚI
    const romRecords = await rom.bulkCreate(
      roms.map((r) => ({
        rom: r.rom,
        gia_thaydoi: r.gia_thaydoi,
        id_sanpham: id,
      })),
      { transaction: t }
    );

    // 4️⃣ TẠO MÀU MỚI
    const mauRecords = await mausac.bulkCreate(
      mausacs.map((m) => ({
        ten_mau: m.ten_mau,
        hinh_anh: m.hinh_anh,
        id_sanpham: id,
      })),
      { transaction: t }
    );

    // 5️⃣ TẠO LẠI KHO
    if (kho.length > 0) {
      await kho_sanpham.bulkCreate(
        kho.map((k) => ({
          id_sanpham: id,
          id_rom: romRecords[k.romIndex]?.id,
          id_mausac: mauRecords[k.mauIndex]?.id,
          so_luong: k.so_luong,
          trang_thai: k.so_luong > 0 ? 1 : 0,
        })),
        { transaction: t }
      );
    }

    await t.commit();
    return true;
  } catch (error) {
    await t.rollback();
    console.error("Lỗi update sản phẩm:", error);
    return false;
  }
};

// Xóa sản phẩm
const deleteSanPhamService = async (id) => {
  try {
    await kho_sanpham.destroy({ where: { id_sanpham: id } });

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
const getOrderAllervice = async () => {
  try {
    const result = await Orders.findAll({
      include: [{ model: OrderItem }],
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const updateOrderStatusService = async (id, status) => {
  try {
    const result = await Orders.update(
      { status },
      {
        where: { id },
      }
    );
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getOrderItemByIdService = async (id) => {
  try {
    const result = await Orders.findOne({
      where: { id },
      attributes: [
        "id",
        "amount",
        "status",
        "cach_thanhtoan",
        "cach_nhan",
        "name_ship",
        "sdt",
        "dia_chi",
        "createdAt",
      ],
      include: [
        {
          model: OrderItem,
          attributes: ["soluong"],
          include: [
            {
              model: sanpham,
              attributes: ["tieu_de", "gia_ban", "hinh_anh"],
            },
            {
              model: mausac,
              attributes: ["ten_mau", "hinh_anh"],
            },
            {
              model: rom,
              attributes: ["rom", "gia_thaydoi"],
            },
          ],
        },
      ],
    });

    return result;
  } catch (error) {
    console.error("Lỗi lấy chi tiết đơn hàng:", error);
    return null;
  }
};
const updateUserService = async (id, name, email) => {
  const user = await User.findByPk(id);
  if (!user) {
    return {
      EC: 1,
      EM: "User không tồn tại",
    };
  }

  await User.update(
    {
      name,
      email,
    },
    {
      where: { id },
    }
  );

  return {
    EC: 0,
    EM: "Cập nhật user thành công",
  };
};
const deleteUserService = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    return { EC: 1, EM: "User không tồn tại" };
  }

  await User.destroy({ where: { id } });
  return { EC: 0, EM: "Xóa user thành công" };
};

// 4. BAN / UNBAN user
const banUserService = async (id, isBan) => {
  const user = await User.findByPk(id);
  if (!user) {
    return { EC: 1, EM: "User không tồn tại" };
  }

  await User.update({ isBan }, { where: { id } });

  return {
    EC: 0,
    EM: isBan === 1 ? "User đã bị BAN" : "User đã được UNBAN",
  };
};
const addCateService = async (ten_danh_muc, hinh_anh) => {
  try {
    const result = await danhmucsanpham.create({
      ten_danh_muc,
      hinh_anh,
      ngay_tao: new Date(),
    });
    return result;
  } catch (error) {
    return { EC: 1, EM: "Lỗi" + error };
  }
};
const deleteCateService = async (id) => {
  const user = await danhmucsanpham.findByPk(id);
  if (!user) {
    return { EC: 1, EM: "Danh Mục không tồn tại" };
  }

  await danhmucsanpham.destroy({ where: { id } });
  return { EC: 0, EM: "Xóa danh mục thành công" };
};
const updateCategoryService = async (id, ten_danh_muc, hinh_anh) => {
  const category = await danhmucsanpham.findByPk(id);

  if (!category) {
    throw new Error("Danh mục không tồn tại");
  }

  await danhmucsanpham.update(
    {
      ten_danh_muc,
      hinh_anh,
      ngay_sua: new Date(),
    },
    { where: { id } }
  );

  return category;
};
const getTagService = async () => {
  try {
    const result = await sanphamtag.findAll();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const createTagService = async (ten_tag) => {
  try {
    const result = await sanphamtag.create({ ten_tag });

    return {
      status: true,
      message: "Thêm tag thành công",
      data: result,
    };
  } catch (error) {
    console.log("createTagService error:", error);
    throw error;
  }
};
const updateTagService = async (id, ten_tag) => {
  try {
    if (!id || !ten_tag) {
      return {
        status: false,
        message: "Thiếu dữ liệu",
      };
    }

    const tag = await sanphamtag.findByPk(id);
    if (!tag) {
      return {
        status: false,
        message: "Tag không tồn tại",
      };
    }

    await tag.update({ ten_tag });

    return {
      status: true,
      message: "Cập nhật tag thành công",
    };
  } catch (error) {
    console.log("updateTagService error:", error);
    throw error;
  }
};
const deleteTagService = async (id) => {
  try {
    if (!id) {
      return {
        status: false,
        message: "Thiếu ID",
      };
    }

    const tag = await sanphamtag.findByPk(id);
    if (!tag) {
      return {
        status: false,
        message: "Tag không tồn tại",
      };
    }

    await tag.destroy();

    return {
      status: true,
      message: "Xóa tag thành công",
    };
  } catch (error) {
    console.log("deleteTagService error:", error);
    throw error;
  }
};
const addTagToProductService = async (id_sanpham, id_tag) => {
  const existed = await SanPhamTagMap.findOne({
    where: { id_sanpham, id_tag },
  });

  if (existed) {
    throw new Error("Sản phẩm đã có tag này");
  }

  await SanPhamTagMap.create({
    id_sanpham,
    id_tag,
  });

  return true;
};

const removeTagFromProductService = async (id_sanpham, id_tag) => {
  const product = await SanPham.findByPk(id_sanpham);
  if (!product) return null;

  await SanPhamTagMap.destroy({ where: { id_sanpham, id_tag } });
  return true;
};
const getProductWithTagService = async (id_tag) => {
  return await SanPham.findAll({
    include: [
      {
        model: SanPhamTag,
        where: { id: id_tag },
        through: { attributes: [] },
      },
    ],
  });
};
const getDanhGiaService = async () => {
  try {
    const result = await Danhgia.findAll({
      order: [["ngay_tao", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
        {
          model: sanpham,
          attributes: ["id", "tieu_de"],
        },
        {
          model: Orders,
          attributes: ["id"],
        },
      ],
    });

    return result;
  } catch (error) {
    console.log("getDanhGiaService error:", error);
    return null;
  }
};
const banDanhGiaService = async (id, is_ban) => {
  try {
    await Danhgia.update(
      { is_ban },
      {
        where: { id },
      }
    );
    return true;
  } catch (error) {
    console.log("banDanhGiaService error:", error);
    return false;
  }
};
const createBlogService = async (data) => {
  try {
    const { tieu_de, noi_dung, hinh_anh, video, id_sanpham } = data;

    // kiểm tra sản phẩm tồn tại
    const sanpham = await SanPham.findByPk(id_sanpham);
    if (!sanpham) {
      return {
        EM: "Sản phẩm không tồn tại",
        EC: 1,
        DT: null,
      };
    }

    const blog = await Blog.create({
      tieu_de,
      noi_dung,
      hinh_anh,
      video,
      id_sanpham,
    });

    return {
      EM: "Thêm blog thành công",
      EC: 0,
      DT: blog,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Lỗi service create blog",
      EC: -1,
      DT: null,
    };
  }
};

// Lấy danh sách blog
const getAllBlogService = async () => {
  try {
    const blogs = await Blog.findAll({
      include: [
        {
          model: SanPham,
          attributes: ["id", "tieu_de"],
        },
      ],
    });

    return {
      EM: "Lấy danh sách blog thành công",
      EC: 0,
      DT: blogs,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Lỗi service get blog",
      EC: -1,
      DT: null,
    };
  }
};

// Lấy blog theo id
const getBlogByIdService = async (id) => {
  try {
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return {
        EM: "Blog không tồn tại",
        EC: 1,
        DT: null,
      };
    }

    return {
      EM: "Lấy blog thành công",
      EC: 0,
      DT: blog,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Lỗi service get blog by id",
      EC: -1,
      DT: null,
    };
  }
};

const updateBlogService = async (id, data) => {
  try {
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return {
        EM: "Blog không tồn tại",
        EC: 1,
        DT: null,
      };
    }

    await blog.update(data);

    return {
      EM: "Cập nhật blog thành công",
      EC: 0,
      DT: blog,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Lỗi service update blog",
      EC: -1,
      DT: null,
    };
  }
};

// Xóa blog
const deleteBlogService = async (id) => {
  try {
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return {
        EM: "Blog không tồn tại",
        EC: 1,
        DT: null,
      };
    }

    await blog.destroy();

    return {
      EM: "Xóa blog thành công",
      EC: 0,
      DT: null,
    };
  } catch (error) {
    console.log(error);
    return {
      EM: "Lỗi service delete blog",
      EC: -1,
      DT: null,
    };
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
  getOrderAllervice,
  updateOrderStatusService,
  getOrderItemByIdService,
  deleteUserService,
  banUserService,
  updateUserService,
  deleteCateService,
  updateCategoryService,
  addCateService,
  getTagService,
  createTagService,
  deleteTagService,
  updateTagService,
  addTagToProductService,
  removeTagFromProductService,
  getProductWithTagService,
  getDanhGiaService,
  banDanhGiaService,
  createBlogService,
  getAllBlogService,
  getBlogByIdService,
  updateBlogService,
  deleteBlogService,
};
