// ./src/index.js

//Dépendances
/*
const cors = require('cors'); // Cors : Cross-Origin ressource sharing
const helmet = require('helmet'); // Sécurisation des API express
const morgan = require('morgan'); // librairie permettant d'ajouter des logins aux api express*/

// Dépendances relatives à la bdd
const {startDatabase} = require('./database/mysql');
const {insertBeer, getBeers, delBeer, updateBeer, getBeer, getBeerName} = require('./database/beers_DAO');

// jwt
const express = require('express');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('./server/config');
let middleware = require('./server/middleware');

class HandlerGenerator {
  login (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    // For the given username fetch user from DB
    let mockedUsername = 'admin';
    let mockedPassword = 'password';

    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        let token = jwt.sign({username: username},
          config.secret,
          { expiresIn: '24h' // expires in 24 hours
          }
        );
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
      } else {
        res.send(403).json({
          success: false,
          message: 'Incorrect username or password'
        });
      }
    } else {
      res.send(400).json({
        success: false,
        message: 'Authentication failed! Please check the request'
      });
    }
  }
  index (req, res) {
    res.json({
      success: true,
      message: 'Index page'
    });
  }
}

// Starting point of the server
function main () {

  let app = express(); // Export app for other routes to use

  let handlers = new HandlerGenerator();
  const port = process.env.PORT || 8000;
  app.use(bodyParser.urlencoded({ // Middleware
    extended: true
  }));
  app.use(bodyParser.json());



  // Routes : no need to check Token
  app.get('/', async (req, res) => {
    await getBeers(res);
  });

  app.get('/beer/name/:beername', async (req, res) => {
    await getBeerName(req.params.beername, res);
  });



  // route vers toutes les bières : check du token pour les opérations délicates
  app.route('/beer/:idbeer')
    .get(middleware.checkToken, handlers.index, async function(req,res) {// Recherche d'une bière par son ID
      await getBeer(req.params.idbeer, res);
    })
    .delete(middleware.checkToken, handlers.index, async function(req,res) {// Suppression d'une bière depuis son ID
      await delBeer(req.params.idbeer, res);
    })
    .put (middleware.checkToken, handlers.index, async function (req, res) {// Modification d'une bière depuis son ID
      const updatedBeer = req.body;
  	  await updateBeer(req.params.idbeer, updatedBeer);
      res.send('Bière n°'+req.params.idbeer+' modifiée. ');
    }) ;

  // ajout d'une bière
    app.post('/beer', middleware.checkToken, handlers.index, async (req, res) => {// Ajout d'une nouvelle bière
  	   const newBeer = req.body;
  	   await insertBeer(newBeer);
  	   res.send({message: 'Bière ajoutée.'});
  });

  // Routes & Handlers
  app.post('/login', handlers.login);
//  app.get('/', middleware.checkToken, handlers.index);

startDatabase().then(async () => {
  app.listen(port, async () => {
    console.log(`Server is listening on port: ${port}`);
  });
});

//  app.listen(port, () => console.log(`Server is listening on port: ${port}`));
}

main();


/*

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
*/
