const config = require("./config");
const { DataTypes } = require("sequelize");

const RefreshToken = config("refresh_token").define("RefreshToken", {
  token: {
    type: DataTypes.STRING,
  },
  expirationDate: {
    type: DataTypes.DATE,
  },
});

module.exports = { RefreshToken };
