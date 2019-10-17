// ./src/database/mysql.js

var connection  = require('./db');
var mysql = require('mysql');

let database = null;

async function startDatabase() {

  database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "breweries"
});

}


async function getDatabase() {
  //if (!database) await startDatabase();
  return database;
}


module.exports = {
  getDatabase,
  startDatabase,
}
