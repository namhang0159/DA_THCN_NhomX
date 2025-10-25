const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = require("./user");
const mausac = require("./mausac");

const Orders = sequelize.define(
  "orders",
  {
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Thành Công", "Đã hủy"),
      defaultValue: "Pending",
    },
    cach_thanhtoan: {
      type: DataTypes.ENUM("MoMo", "COD"),
      allowNull: false,
    },
    cach_nhan: {
      type: DataTypes.ENUM("Giao Hàng", "Cửa Hàng"),
      allowNull: false,
    },
    name_ship: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sdt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dia_chi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);

User.hasMany(Orders, { foreignKey: "id_user" });
Orders.belongsTo(User, { foreignKey: "id_user" });

module.exports = Orders;
