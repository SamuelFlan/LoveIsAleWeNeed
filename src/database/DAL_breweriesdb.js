// Credentials : Base de données breweries et ses accès
var mysql=require('mysql');
var databaseCredentials = {
	host	:	"localhost",
	user	:	"root",
	password:	"root",
	database: 	"beerdb"
};


module.exports = databaseCredentials;
