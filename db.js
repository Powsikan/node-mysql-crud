// db.js
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost", // Replace with your host
  user: "root", // Replace with your MySQL username
  password: "", // Replace with your MySQL password
  database: "node-crud", // Replace with your database name
});

module.exports = pool.promise();
