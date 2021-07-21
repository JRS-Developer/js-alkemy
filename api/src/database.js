const config = require("./config");
const mysql = require("mysql");

const connection = mysql.createConnection({
	host: config.HOST,
	user: config.DATABASE_USER,
	database: config.DATABASE_NAME,
	password: config.DATABASE_PASSWORD,
});

connection.connect(function (err) {
	if (err) {
		console.error("error connecting: " + err.stack);
		return;
	}

	console.log("connected as id " + connection.threadId);
});

module.exports = connection;
