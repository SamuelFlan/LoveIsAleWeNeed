// Connect to database

var mysql=require('mysql');
var connection = mysql.createConnection({
	host	:	'localhost',
	user	:	'root',
	password:	'root',
	database: 	'breweries'
});


module.exports = connection;
