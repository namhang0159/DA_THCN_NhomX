const { config } = require("dotenv");
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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

module.exports = {
  loginAdminService,
  createAdminService,
};
