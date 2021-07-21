const dotenv = require("dotenv");

dotenv.config();

module.exports = {
	PORT: process.env.PORT,
	DATABASE_NAME: process.env.DATABASE_NAME,
	HOST: process.env.HOST,
	DATABASE_USER: process.env.DATABASE_USER,
	DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
};
