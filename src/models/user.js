const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isBan: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // 0 = hoạt động, 1 = BAN
  },
});

module.exports = User;
