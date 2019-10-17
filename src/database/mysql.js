// ./src/database/mysql.js

var connection  = require('./DAL_breweriesdb');
var mysql = require('mysql');

let database = null;

async function startDatabase() {

  database = mysql.createConnection({ // A remplacer par le DAL
  host: "localhost",
  user: "root",
  password: "root",
  database: "breweries"
});

}


async function getDatabase() {
  return database;
}


module.exports = {
  getDatabase,
  startDatabase,
}
