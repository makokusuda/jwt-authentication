const db = require("./config");
const { DataTypes } = require("sequelize");

const RefreshToken = db.define("refresh_token", {
  refreshToken: {
    type: DataTypes.STRING,
  },
  expirationDate: {
    type: DataTypes.DATE,
  },
});

module.exports = { RefreshToken };
