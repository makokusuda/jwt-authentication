require("dotenv").config();
const pg = require("pg");
const { Sequelize } = require("sequelize");
let db;

if (process.env.NODE_ENV === "production") {
  db = new Sequelize(process.env.DATABASE_URL);
} else {
  db = new Sequelize("test_db", process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "localhost",
    dialect: "postgres",
  });
}

module.exports = db;
