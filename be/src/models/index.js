const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

// Import models
const SanPham = require("./sanpham");
const SanPhamTag = require("./sanphamtag");
const mausac = require("./mausac");

// Định nghĩa quan hệ giữa SanPham và Mausac
SanPham.hasMany(mausac, { foreignKey: "id_sanpham" });
mausac.belongsTo(SanPham, { foreignKey: "id_sanpham" });

// Định nghĩa quan hệ many-to-many giữa SanPham và SanPhamTag
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

// Export tất cả để nơi khác dùng
module.exports = {
  SanPham,
  SanPhamTag,
  mausac,
};
