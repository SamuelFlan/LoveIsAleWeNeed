// ./src/database/beers.js
// Accès aux bières

const {getDatabase} = require('./mysql');
const beerDAO = require('./DAO/beersDAO')

const collectionName = beerDAO.table;
const {ObjectID} = require('mysql');
const {select, selectWhereLike, selectWhereValue, insertInto, deleteFrom} = require ('./database_methods');


// Get all beers
async function getBeers( res ) {  select(collectionName, '*', res); }

// Get one beer with its ID
async function getBeer(BeerId, res) { selectWhereValue(collectionName, '*', beerDAO.beer_id, BeerId, res); }

// Get one beer with its name / a part of its name
async function getBeerName(BeerName, res) { selectWhereLike(collectionName, '*', beerDAO.beer_name, '\'%' + BeerName + '%\'', res ); }

// Delete one beer. Needs id_beer
async function delBeer(BeerId, res) { deleteFrom(collectionName, beerDAO.beer_id, BeerId, res); }


/* /!\ : pas encore mis à jour avec les nouvelles méthodes insertInto & updateOne */
// Insert one beer
async function insertBeer(beerName, idBeerType) {
  const database = await getDatabase();
  database.query('INSERT INTO '+collectionName+' VALUES',  function (err, result, fields) {
    if (err) throw err;
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
