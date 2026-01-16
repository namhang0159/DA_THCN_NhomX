const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const sanpham = require("./sanpham");

const Blog = sequelize.define(
  "blog",
  {
    tieu_de: {
      type: DataTypes.STRING,
    },
    noi_dung: {
      type: DataTypes.TEXT,
    },
    hinh_anh: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    video: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_sanpham: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "sanpham",
        key: "id",
      },
    },
  },
  {
    tableName: "blog",
    timestamps: false,
  }
);

module.exports = Blog;
