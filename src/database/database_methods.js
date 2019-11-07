// database_methods.js
// Créer les requetes sql indépedamment des objets

const {getDatabase} = require('./mysql');
const {ObjectID} = require('mysql');


// Select columns from table
async function select(tableName, columnsName, res) {
  const myQuery = 'SELECT ' + columnsName + ' FROM ' + tableName;
  const database = await getDatabase();
  database.query(myQuery, function (err, result, fields) {
    if (err) throw err;
    //console.log(result);
    res.send( result);
  });
}

// Select columns from table where column Like value
async function selectWhereLike(tableName, columnsName, columnWhere, valueWhere, res) {
  const myQuery = 'SELECT ' + columnsName + ' FROM ' + tableName + ' WHERE ' + columnWhere + ' LIKE ' + valueWhere;
  const database = await getDatabase();
  database.query(myQuery, function (err, result, fields) {
    if (err) throw err;
    //console.log(result);
    res.send( result);
  });
}

// Select columns from table where column equals value
async function selectWhereValue(tableName, columnsName, columnWhere, valueWhere, res) {
  const myQuery = 'SELECT ' + columnsName + ' FROM ' + tableName + ' WHERE ' + columnWhere + ' = ' + valueWhere;
  const database = await getDatabase();
  database.query(myQuery, function (err, result, fields) {
    if (err) throw err;
    //console.log(result);
    res.send( result);
  });
}

// Delete from a table, with a equals condition
async function deleteFrom(tableName, columnWhere, valueWhere, res) {
  const myQuery = 'DELETE FROM ' + tableName +  ' WHERE '+ columnWhere +' = '  + valueWhere;
  const database = await getDatabase();
  database.query(myQuery, function (err, result, fields) {
    if (err) throw err;
    //console.log(result);
    res.send(tableName + ":  " + columnWhere + " = " + valueWhere + " DELETED.");
  });
}

// Inserts values into table
async function insertInto(tableName, values, res) {
  const myQuery = 'INSERT INTO ' + tableName + ' VALUES ' + values;
  const database = await getDatabase();
  database.query(myQuery, function (err, result, fields) {
    if (err) throw err;
    //console.log(result);
    res.send(tableName + ": "+ values + " inserted.");
  });
}

async function updateOne() {

}

module.exports = {
  select,
  selectWhereLike,
  selectWhereValue,
  insertInto,
  updateOne,
  deleteFrom
}
