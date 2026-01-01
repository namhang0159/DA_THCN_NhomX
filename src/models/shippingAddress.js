const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const ShippingAddress = sequelize.define("ShippingAddress", {
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  hoten: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sdt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  diachi: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  is_choose: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

User.hasMany(ShippingAddress, { foreignKey: "id_user" });
ShippingAddress.belongsTo(User, { foreignKey: "id_user" });

module.exports = ShippingAddress;
