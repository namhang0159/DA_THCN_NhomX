const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const danhmucsanpham = require("./danhmucsanpham");
const sanphamtag = require("./sanphamtag");
const Blog = require("./blog");
const sanpham = sequelize.define(
  "sanpham",
  {
    tieu_de: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gia_ban: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    hinh_anh: {
      type: DataTypes.STRING,
    },
    noi_dung: {
      type: DataTypes.TEXT,
    },
    ngay_tao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    ngay_sua: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    id_sanphamtag: {
      type: DataTypes.INTEGER,
      references: {
        model: "sanphamtag",
        key: "id",
      },
    },
  },
  {
    tableName: "sanpham",
    timestamps: false,
  }
);

danhmucsanpham.hasMany(sanpham, { foreignKey: "id_danh_muc" });
sanpham.belongsTo(danhmucsanpham, { foreignKey: "id_danh_muc" });
// Quan hệ với tag
sanpham.belongsToMany(sanphamtag, {
  through: "sanpham_tag",
  foreignKey: "id_sanpham",
  otherKey: "id_tag",
  timestamps: false,
});

sanphamtag.belongsToMany(sanpham, {
  through: "sanpham_tag",
  foreignKey: "id_tag",
  otherKey: "id_sanpham",
  timestamps: false,
});
sanpham.hasMany(Blog, { foreignKey: "id_sanpham" });
Blog.belongsTo(sanpham, { foreignKey: "id_sanpham" });

module.exports = sanpham;
