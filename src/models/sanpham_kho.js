const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const SanPham = require("./sanpham");
const Rom = require("./rom");
const MauSac = require("./mausac");

const kho_sanpham = sequelize.define(
  "kho_sanpham",
  {
    so_luong: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    trang_thai: {
      type: DataTypes.TINYINT,
      defaultValue: 1, // 1: còn hàng | 0: hết
    },
    id_sanpham: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SanPham,
        key: "id",
      },
    },
    id_rom: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Rom,
        key: "id",
      },
    },
    id_mausac: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: MauSac,
        key: "id",
      },
    },
  },
  {
    tableName: "kho_sanpham",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["id_sanpham", "id_rom", "id_mausac"],
      },
    ],
  }
);

SanPham.hasMany(kho_sanpham, { foreignKey: "id_sanpham", as: "kho" });
kho_sanpham.belongsTo(SanPham, { foreignKey: "id_sanpham" });
Rom.hasMany(kho_sanpham, {
  foreignKey: "id_rom",
});
kho_sanpham.belongsTo(Rom, {
  foreignKey: "id_rom",
});

MauSac.hasMany(kho_sanpham, {
  foreignKey: "id_mausac",
});
kho_sanpham.belongsTo(MauSac, {
  foreignKey: "id_mausac",
});
module.exports = kho_sanpham;
