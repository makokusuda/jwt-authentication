const db = require("./config");
const { DataTypes } = require("sequelize");

const RefreshToken = db.define("refresh_token", {
  refreshToken: {
    type: DataTypes.STRING,
  },
  expirationDate: {
    type: DataTypes.DATE,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
  accessToken: {
    type: DataTypes.STRING,
  },
});

module.exports = { RefreshToken };
