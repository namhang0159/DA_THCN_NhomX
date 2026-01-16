const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const sanpham = require("./sanpham");

const rom = sequelize.define(
  "rom",
  {
    rom: {
      type: DataTypes.ENUM("64gb", "128gb", "256gb", "512gb", "1T"),
      defaultValue: "64gb",
      allowNull: false,
    },
    gia_thaydoi: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_sanpham: {
      type: DataTypes.INTEGER,
      references: {
        model: sanpham,
        key: "id",
      },
    },
  },
  {
    tableName: "rom",
    timestamps: false,
  }
);
rom.belongsTo(sanpham, { foreignKey: "id_sanpham" });
sanpham.hasMany(rom, { foreignKey: "id_sanpham" });

module.exports = rom;
