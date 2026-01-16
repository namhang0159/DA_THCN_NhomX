const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Danhgia = sequelize.define(
  "danhgia",
  {
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    id_sanpham: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "sanpham",
        key: "id",
      },
    },
    id_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "orders",
        key: "id",
      },
    },
    so_sao: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    noi_dung: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    hinh_anh: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ngay_tao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    ngay_sua: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    is_ban: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "danhgia",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["id_user", "id_sanpham", "id_order"],
        name: "unique_user_product_order",
      },
    ],
  }
);

const User = require("./user");
const Sanpham = require("./sanpham");
const Orders = require("./orders");

User.hasMany(Danhgia, { foreignKey: "id_user" });
Danhgia.belongsTo(User, { foreignKey: "id_user" });

Sanpham.hasMany(Danhgia, { foreignKey: "id_sanpham" });
Danhgia.belongsTo(Sanpham, { foreignKey: "id_sanpham" });

Orders.hasMany(Danhgia, { foreignKey: "id_order" });
Danhgia.belongsTo(Orders, { foreignKey: "id_order" });

module.exports = Danhgia;
