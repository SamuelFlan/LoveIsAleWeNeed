// ./src/database/beers.js
// Accès aux bières

const {getDatabase} = require('./mysql');
const beerDAO = require('./DAO/beersDAO')

const collectionName = beerDAO.table;
const {ObjectID} = require('mysql');

// Get all beers
async function getBeers( res ) {
  const database = await getDatabase();
  return await database.query('SELECT * FROM '+collectionName,  function (error, results) {
  res.send( results ) ;
});
}

// Get one beer with its ID
async function getBeer(BeerId, res) {
  const database = await getDatabase();
  console.log(BeerId)
  database.query('SELECT * FROM ' + collectionName + ' WHERE '+ beerDAO.beer_id +' = ' + BeerId,  function (err, result, fields) {
    if (err) throw err;
    //console.log(result);
    res.send( result);
    });
}

// Get one beer with its name
async function getBeerName(BeerName, res) {
  const database = await getDatabase();
  console.log(BeerName);
  database.query('SELECT * FROM ' + collectionName + ' WHERE '+ beerDAO.beer_name +' LIKE \'%' + BeerName+'%\'',  function (err, result, fields) {
    if (err) throw err;
    //console.log(result);
    res.send( result);
  });
}

// Insert one beer
async function insertBeer(beerName, idBeerType) {
  const database = await getDatabase();
  database.query('INSERT INTO '+collectionName+' VALUES',  function (err, result, fields) {
    if (err) throw err;
    });
}

// Delete one beer. Needs id_beer
async function delBeer(BeerId, res) {
  const database = await getDatabase();
  database.query('DELETE FROM ' + collectionName + 'WHERE '+ beerDAO.beer_id +' =  ' + BeerId,  function (err, result, fields) {
    if (err) throw err;
    res.send("Bière numéro " + BeerId + " supprimée.");
  });
}

// Update a beer
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
  getBeerName
};
