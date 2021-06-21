const db = require("./config");
const { DataTypes } = require("sequelize");

const Article = db.define("article", {
  title: {
    type: DataTypes.STRING,
  },
  body: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.INTEGER,
  },
});

module.exports = { Article };
