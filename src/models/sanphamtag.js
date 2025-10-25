const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const sanpham = require("./sanpham");
const sanphamtag = sequelize.define(
  "sanphamtag",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ten_tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "sanphamtag",
    timestamps: false,
  }
);

module.exports = sanphamtag;
