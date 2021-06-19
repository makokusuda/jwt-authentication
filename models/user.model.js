const db = require("./config");
const { DataTypes } = require("sequelize");

const User = db.define("user", {
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { User };
