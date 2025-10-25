const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const SanPham = require("./sanpham");

const mausac = sequelize.define(
  "mausac",
  {
    ten_mau: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    hinh_anh: {
      type: DataTypes.STRING,
    },
    id_sanpham: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SanPham,
        key: "id",
      },
    },
  },
  {
    tableName: "mausac",
    timestamps: false,
  }
);
SanPham.hasMany(mausac, { foreignKey: "id_sanpham" });
mausac.belongsTo(SanPham, { foreignKey: "id_sanpham" });

module.exports = mausac;
