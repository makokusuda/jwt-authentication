const db = require("./config");
const { DataTypes } = require("sequelize");

const RefreshToken = db.define("refreshToken", {
  token: {
    type: DataTypes.STRING,
  },
  expirationDate: {
    type: DataTypes.DATE,
  },
});

module.exports = { RefreshToken };
