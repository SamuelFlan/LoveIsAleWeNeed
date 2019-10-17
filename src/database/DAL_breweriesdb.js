// Credentials : Base de données breweries et ses accès
var mysql=require('mysql');
var DatabaseCredentials = mysql.createConnection({
	host	:	'localhost',
	user	:	'root',
	password:	'root',
	database: 	'breweries'
});


module.exports = DatabaseCredentials;
