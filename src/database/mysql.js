// ./src/database/mysql.js

var databaseCredentials  = require('./DAL_breweriesdb');
var mysql = require('mysql');

let database = null;

async function startDatabase() {
  database = mysql.createConnection({
  host: databaseCredentials.host,
  user: databaseCredentials.user,
  password: databaseCredentials.password,
  database: databaseCredentials.database
});

database.connect(function(error){
      if(!!error){
        console.log(error);
      }else{
        console.log('Connected!:)');
      }
    });


}


async function getDatabase() {
  return database;
}


module.exports = {
  getDatabase,
  startDatabase,
}
