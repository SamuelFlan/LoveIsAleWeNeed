// ./src/index.js

//Dépendances
const express = require('express'); // Librairie express
const bodyParser = require('body-parser'); // Body --> JSON
const cors = require('cors'); // Cors : Cross-Origin ressource sharing
const helmet = require('helmet'); // Sécurisation des API express
const morgan = require('morgan'); // librairie permettant d'ajouter des logins aux api express

// Dépendances relatives à la bdd
const {startDatabase} = require('./database/mysql');
const {insertBeer, getBeers, delBeer, updateBeer, getBeer, getBeerName} = require('./database/beers_DAO');

// Définition de l'app express
const app = express();

// On ajoute les Dépendances
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

// on retourne tte la table 'beer' via cette requete sur /
app.get('/', async (req, res) => {
  await getBeers(res);
});

app.get('/beer/name/:beername', async (req, res) => {
  await getBeerName(req.params.beername, res);
});

// route vers toutes les bières
app.route('/beer/:idbeer')
  .get( async function(req,res) {// Recherche d'une bière par son ID
    await getBeer(req.params.idbeer, res);
  })
  .delete(async function(req,res) {// Suppression d'une bière depuis son ID
    await delBeer(req.params.idbeer, res);
  })
  .put (async function (req, res) {// Modification d'une bière depuis son ID
    const updatedBeer = req.body;
	  await updateBeer(req.params.idbeer, updatedBeer);
    res.send('Bière n°'+req.params.idbeer+' modifiée. ');
  }) ;

// ajout d'une bière
  app.post('/beer', async (req, res) => {// Ajout d'une nouvelle bière
	   const newBeer = req.body;
	   await insertBeer(newBeer);
	   res.send({message: 'Bière ajoutée.'});
});

// Démarrage du serveur
startDatabase().then(async () => {
  app.listen(3001, async () => {
    console.log('listening on port 3001');
  });
});
