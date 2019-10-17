// ./src/index.js

//Dépendances
const express = require('express'); // Librairie express
const bodyParser = require('body-parser'); // Body --> JSON
const cors = require('cors'); // Cors : Cross-Origin ressource sharing
const helmet = require('helmet'); // Sécurisation des API express
const morgan = require('morgan'); // librairie permettant d'ajouter des logins aux api express

// Dépendances relatives à la bdd
const {startDatabase} = require('./database/mysql');
const {insertBeer, getBeers, deleteBeer, updateBeer,/* getBeer*/} = require('./database/beers');

// Définition de l'app express
const app = express();


// On ajoute les Dépendances
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

// on retourne tte la table 'beer' via cette requete sur /
app.get('/', async (req, res) => {
  res.send(await getBeers());
});

var idbeer;

// On retourne une seule bière
app.route('/beer/:idbeer')
  .get( async function(req,res) {
    var idbeer = req.params.idbeer;
    var final = await getBeer(idbeer);
    console.log(final);
      //res.send(JSON.stringify(rows[0]));
  })
  .delete(async function(req,res) {
    res.send('Delete : beer')
  });


/*
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
});*/



// Démarrage du serveur
startDatabase().then(async () => {
  app.listen(3001, async () => {
    console.log('listening on port 3001');
  });
});
