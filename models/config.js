require("dotenv").config();
const pg = require("pg");
const { Sequelize } = require("sequelize");

const db = new Sequelize(
  "test_db",
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

module.exports = db;
