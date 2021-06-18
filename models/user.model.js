const config = require("./config");
const { DataTypes } = require("sequelize");

const User = config("user").define("User", {
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { User };
