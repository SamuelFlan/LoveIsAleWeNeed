// ./src/database/beers.js
// Accès aux bières

const {getDatabase} = require('./mysql');

const collectionName = 'beer';
const {ObjectID} = require('mysql');

async function insertBeer(beerName, idBeerType) {
  const database = await getDatabase();
  database.query('INSERT INTO '+collectionName+' VALUES',  function (err, result, fields) {
    if (err) throw err;
    });
}

/*
async function getBeers() {
  const database = await getDatabase();
  database.query('SELECT * FROM ' + collectionName, function (err, result)  {
     if (err) throw err;
     return(JSON.stringify(result[0]));
   });
}*/

async function getBeers( res ) { // get all beers
  const database = await getDatabase();
  return await database.query('SELECT * FROM '+collectionName,  function (error, results) {
  res.send( results ) ;
});
}

async function getBeer(BeerId, res) { // get one beer by its ID
  const database = await getDatabase();
  console.log(BeerId)
  database.query('SELECT * FROM ' + collectionName + ' WHERE beer_id = ' + BeerId,  function (err, result, fields) {
    if (err) throw err;
    //console.log(result);
    res.send( result);
    });
}

async function delBeer(BeerId, res) { // delete one beer by its id
  const database = await getDatabase();
  database.query('DELETE FROM ' + collectionName + ' WHERE beer_id = ' + BeerId,  function (err, result, fields) {
    if (err) throw err;
    res.send("Bière numéro " + BeerId + " supprimée.");
  });
}

async function updateBeer(id, beer) {
  const database = await getDatabase();
  delete beer._id;
  await database.collection(collectionName).update(
    { _id: new ObjectID(id), },
    {
      $set: {
        ...beer,
      },
    },
  );
}

module.exports = {
  insertBeer,
  getBeers,
  delBeer,
  updateBeer,
  getBeer,
};
