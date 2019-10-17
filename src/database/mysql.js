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

 /*
async function startDatabase() {
  const url =  'mongodb://localhost:27017';
  const dbname = 'breweries';
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    database = client.db(dbName);

    client.close();

  });
}
*/

async function getDatabase() {
  //if (!database) await startDatabase();
  return database;
}


module.exports = {
  getDatabase,
  startDatabase,
}
