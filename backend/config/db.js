// const knex = require("knex");
// const env = require("./env.js");

// const db = knex({
//   client: "pg",
//   connection: {
//     connectionString: env.databaseUrl,
//     ssl: { rejectUnauthorized: false },
//     host: env.databaseHost,
//     port: 5432,
//     user: env.databaseUser,
//     password: env.databasePassword,
//     database: env.databaseDb,
//   },
// });

// module.exports = db;

const knex = require("knex");
require("dotenv").config();

// console.log(process.env.DATABASE_URL);

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    host: process.env.DATABASE_HOST,
    port: 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_DB,
  },
});

module.exports = db;
