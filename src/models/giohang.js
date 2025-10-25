const sequelize = require("../config/database");
const User = require("./user");
const sanpham = require("./sanpham");
const { DataTypes } = require("sequelize");
const mausac = require("./mausac");
const giohang = sequelize.define(
  "giohang",
  {
    soluong: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    id_sanpham: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: sanpham,
        key: "id",
      },
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    id_mau: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: mausac,
        key: "id",
      },
    },
  },
  { tableName: "giohang", timestamps: false }
);
sanpham.hasMany(giohang, { foreignKey: "id_sanpham" });
giohang.belongsTo(sanpham, { foreignKey: "id_sanpham" });

User.hasMany(giohang, { foreignKey: "id_user" });
giohang.belongsTo(User, { foreignKey: "id_user" });

mausac.hasMany(giohang, { foreignKey: "id_mau" });
giohang.belongsTo(mausac, { foreignKey: "id_mau" });
module.exports = giohang;
