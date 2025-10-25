const { DataTypes } = require("sequelize");
const mausac = require("./mausac");
const Orders = require("./orders");

const SanPham = require("./sanpham");
const sequelize = require("../config/database");
const OrderItem = sequelize.define(
  "order_items",
  {
    soluong: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Orders, key: "id" },
    },
    id_sanpham: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: SanPham, key: "id" },
    },
    id_mau: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: mausac, key: "id" },
    },
  },
  { tableName: "order_items", timestamps: false }
);

Orders.hasMany(OrderItem, { foreignKey: "id_order" });
OrderItem.belongsTo(Orders, { foreignKey: "id_order" });
SanPham.hasMany(OrderItem, { foreignKey: "id_sanpham" });
OrderItem.belongsTo(SanPham, { foreignKey: "id_sanpham" });
mausac.hasMany(OrderItem, { foreignKey: "id_mau" });
OrderItem.belongsTo(mausac, { foreignKey: "id_mau" });
module.exports = { Orders, OrderItem };
