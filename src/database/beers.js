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

async function getBeers() {
  const database = await getDatabase();
  database.query('SELECT * FROM ' + collectionName,  function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    //res.send(JSON.stringify(result[0]));
    });
}


async function getBeer(BeerId) {
  const database = await getDatabase();
  console.log(BeerId)
  database.query('SELECT * FROM ' + collectionName + ' WHERE beer_id = ' + BeerId,  function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    });
}

async function deleteBeer(id) {
  const database = await getDatabase();
  database.query('DELETE FROM ' + collectionName + ' WHERE beer_id = ' + id,  function (err, result, fields) {
    if (err) throw err;
    console.log("Bière numéro " + id + " supprimée.");
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
  deleteBeer,
  updateBeer,
  getBeer,
};
