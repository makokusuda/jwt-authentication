require("dotenv").config();
const pg = require("pg");
const { Sequelize } = require("sequelize");

const config = (name) => {
  const database = name;
  return new Sequelize(database, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "localhost",
    dialect: "postgres",
  });
};

module.exports = config;
