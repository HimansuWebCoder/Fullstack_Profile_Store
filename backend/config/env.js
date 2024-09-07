require("dotenv").config(); // load .env file

module.exports = {
	databaseUrl: process.env.DATABASE_URL,
	databaseHost: process.env.DATABASE_HOST,
	databaseUser: process.env.DATABASE_USER,
	databasePassword: process.env.DATABASE_PW,
	databaseDb: process.env.DATABASE_DB,
};
