const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

// Import models
const SanPham = require("./sanpham");
const SanPhamTag = require("./sanphamtag");
const mausac = require("./mausac");
SanPham.hasMany(mausac, { foreignKey: "id_sanpham" });
mausac.belongsTo(SanPham, { foreignKey: "id_sanpham" });
// Định nghĩa quan hệ
SanPham.belongsToMany(SanPhamTag, {
  through: "sanpham_tag",
  foreignKey: "id_sanpham",
  otherKey: "id_tag",
  timestamps: false,
});

SanPhamTag.belongsToMany(SanPham, {
  through: "sanpham_tag",
  foreignKey: "id_tag",
  otherKey: "id_sanpham",
  timestamps: false,
});
const SanPham = require("./sanpham");
const MauSac = require("./mausac");

// Associations
SanPham.hasMany(MauSac, { foreignKey: "id_sanpham" });
MauSac.belongsTo(SanPham, { foreignKey: "id_sanpham" });

// Export tất cả để nơi khác dùng
module.exports = {
  sequelize,
  SanPham,
  SanPhamTag,
  mausac,
  SanPham,
  MauSac,
};
