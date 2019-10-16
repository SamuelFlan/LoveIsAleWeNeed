// ./src/database/beers.js
const {getDatabase} = require('./mongo');

const collectionName = 'beer';
const {ObjectID} = require('mongodb');

async function insertBeer(beer) {
  const database = await getDatabase();
  const {insertedId} = await database.collection(collectionName).insertOne(beer);
  return insertedId;
}

async function getBeers() {
  const database = await getDatabase();
  return await database.collection(collectionName).find({}).toArray();
}
async function deleteBeer(id) {
  const database = await getDatabase();
  await database.collection(collectionName).deleteOne({
    _id: new ObjectID(id),
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
};
