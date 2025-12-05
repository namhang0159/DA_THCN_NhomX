const { config } = require("dotenv");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Orders = require("../models/orders");
const { Sequelize } = require("sequelize");
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
module.exports = {
  loginAdminService,
  createAdminService,
  getDoanhThuNgayService,
  getDoanhThuThangService,
  getDoanhThuNamService,
};
