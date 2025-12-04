const sequelize = require("../config/database");

const { DataTypes } = require("sequelize");
const mausac = require("./mausac");
const rom = require("./rom");
const sanpham = require("./sanpham");
const User = require("./user");
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
    id_rom: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: rom,
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
rom.hasMany(giohang, { foreignKey: "id_rom" });
giohang.belongsTo(rom, { foreignKey: "id_rom" });
module.exports = giohang;
