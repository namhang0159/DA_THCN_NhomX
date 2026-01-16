const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SanPhamTagMap = sequelize.define(
  "sanpham_tag",
  {
    id_sanpham: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_tag: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    tableName: "sanpham_tag",
    timestamps: false,
  }
);

module.exports = SanPhamTagMap;
