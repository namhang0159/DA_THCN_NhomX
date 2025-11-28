const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const sanpham = require("../models/sanpham");
const sanphamtag = require("../models/sanphamtag");
const danhmucsanpham = require("../models/danhmucsanpham");
const mausac = require("../models/mausac");
const Blog = require("../models/blog");
const giohang = require("../models/giohang");
const Orders = require("../models/orders");
const { OrderItem } = require("../models/orderitem");
const rom = require("../models/rom");
const { where } = require("sequelize");

require("dotenv").config();
const createUserService = async (name, email, password) => {
  if (!password) {
    throw new Error("Password is required");
  }
  const user = await User.findOne({ where: { email } });
  if (user) {
    console.log("User exist");
    return null;
  }
  try {
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const result = await User.create({ name, email, password: hashPassword });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const loginUserService = async (email, password) => {
  if (!password) {
    throw new Error("Password is required");
  }
  try {
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      const isMatchPassword = await bcrypt.compare(password, user.password);
      if (isMatchPassword) {
        const payload = {
          id: user.id,
          email: user.email,
          name: user.name,
        };
        const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE,
        });
        return {
          EC: 0,
          access_token,

          user: {
            id: user.id,
            email: user.email,
            name: user.name,
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
const getUserService = async () => {
  try {
    const result = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getSanPhamService = async (tagName) => {
  try {
    if (tagName) {
      return await sanpham.findAll({
        include: [
          {
            model: sanphamtag,
            where: { ten_tag: tagName },
            through: { attributes: [] },
          },
        ],
      });
    } else {
      return await sanpham.findAll();
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getSanPhamIDService = async (id) => {
  try {
    const result = await sanpham.findOne({ where: { id: id } });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getSanPhamALLIDService = async (id) => {
  try {
    const result = await sanpham.findAll({ where: { id: id } });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getDanhMucService = async () => {
  try {
    const result = await danhmucsanpham.findAll();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getMauSacService = async () => {
  try {
    const result = await mausac.findAll();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getBlogService = async () => {
  try {
    const result = await Blog.findAll();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getGioHangApi = async () => {
  try {
    const result = await giohang.findAll();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const updateGioHangService = async (id, soluong) => {
  try {
    const result = await giohang.update({ soluong }, { where: { id } });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const addGioHangService = async (
  soluong,
  id_sanpham,
  id_user,
  id_mau,
  id_rom
) => {
  try {
    const exist = await giohang.findOne({
      where: { id_user, id_sanpham, id_mau, id_rom },
    });

    if (exist) {
      exist.soluong += soluong;
      await exist.save();
      return exist;
    } else {
      const result = await giohang.create({
        soluong,
        id_sanpham,
        id_user,
        id_mau,
        id_rom,
      });
      return result;
    }
  } catch (error) {
    console.log("Lỗi addGioHangService:", error);
    return null;
  }
};
const deleteGioHangService = async (id) => {
  try {
    const result = await giohang.destroy({
      where: { id },
    });
    return result;
  } catch (error) {
    console.log("Lỗi addGioHangService:", error);
    return null;
  }
};
const updateMauGioHangService = async (id, id_mau) => {
  try {
    const result = await giohang.update({ id_mau }, { where: { id } });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const updateRomGioHangService = async (id, id_rom) => {
  try {
    const result = await giohang.update({ id_rom }, { where: { id } });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const createOrderService = async (
  amount,
  cach_thanhtoan,
  cach_nhan,
  name_ship,
  sdt,
  dia_chi,
  id_user
) => {
  try {
    const status = "Pending";
    const result = await Orders.create({
      amount,
      cach_thanhtoan,
      cach_nhan,
      name_ship,
      sdt,
      dia_chi,
      id_user,
      status,
    });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const createOrderItemService = async (
  soluong,
  id_order,
  id_sanpham,
  id_mau,
  id_rom
) => {
  try {
    const result = await OrderItem.create({
      soluong,
      id_order,
      id_sanpham,
      id_mau,
      id_rom,
    });

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getOrdersService = async (id_user) => {
  try {
    if (id_user !== undefined && id_user !== null) {
      const result = await Orders.findAll({ where: { id_user } });
      return result;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getOrderItemService = async (id_order) => {
  try {
    const result = await OrderItem.findAll({ where: { id_order: id_order } });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const getRomService = async () => {
  try {
    const result = await rom.findAll();
    return result;
  } catch (error) {
    return null;
  }
};
const getRomByIDService = async (id) => {
  try {
    const result = await rom.findAll({ where: { id: id } });
    return result;
  } catch (error) {
    return null;
  }
};
module.exports = {
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
  createOrderService,
  createOrderItemService,
  getOrdersService,
  getOrderItemService,
  getSanPhamALLIDService,
  deleteGioHangService,
  getRomService,
  getRomByIDService,
  updateRomGioHangService,
};
