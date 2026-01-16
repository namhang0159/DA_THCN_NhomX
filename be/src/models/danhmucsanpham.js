const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const danhmucsanpham = sequelize.define(
  "danhmucsanpham",
  {
    ten_danh_muc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ngay_tao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    ngay_sua: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    hinh_anh: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "danhmucsanpham",
    timestamps: false,
  }
);

module.exports = danhmucsanpham;
