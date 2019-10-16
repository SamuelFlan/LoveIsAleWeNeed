// ./src/index.js

//Dépendances
const express = require('express'); // Librairie express
const bodyParser = require('body-parser'); // Body --> JSON
const cors = require('cors'); // Cors : Cross-Origin ressource sharing
const helmet = require('helmet'); // Sécurisation des API express
const morgan = require('morgan'); // librairie permettant d'ajouter des logins aux api express

// Dépendances relatives à la bdd mongo
const {startDatabase} = require('./database/mongo');
const {insertBeer, getBeers, deleteBeer, updateBeer} = require('./database/beers');

// Définition de l'app express
const app = express();

// Solution temporaire deBDD Avant d'en créer une + grde
const beers = [
  { title : 'Love Is Ale We Need (always!)'}
];

// On ajoute les Dépendances
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

// on retourne tte la table 'beer' via cette requete sur /
app.get('/', async (req, res) => {
  res.send(await getBeers());
});


app.post('/', async (req, res) => {
  const newBeer = req.body;
  await insertBeer(newBeer);
  res.send({ message: 'New beer inserted.' });
});

// endpoint to delete an beer
app.delete('/:id', async (req, res) => {
  await deleteBeer(req.params.id);
  res.send({ message: 'Beer removed.' });
});

// endpoint to update an beer
app.put('/:id', async (req, res) => {
  const updatedBeer = req.body;
  await updateBeer(req.params.id, updatedBeer);
  res.send({ message: 'Beer updated.' });
});



// start the in-memory MongoDB instance
startDatabase().then(async () => {
  await insertBeer({title: 'Hello, now from the in-memory database!'});

  // start the server
  app.listen(3001, async () => {
    console.log('listening on port 3001');
  });
});


// Démarrage du serveur
/*app.listen(3001, () => {
  console.log('écoute sur le port 3001');
});*/
