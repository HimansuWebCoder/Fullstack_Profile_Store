const knex = require("knex");
const env = require("./env.js");

const db = knex({
  client: "pg",
  connection: {
    connectionString: env.databaseUrl,
    ssl: { rejectUnauthorized: false },
    host: env.databaseHost,
    port: 5432,
    user: env.databaseUser,
    password: env.databasePassword,
    database: env.databaseDb,
  },
});

module.exports = db;

// const knex = require('knex');
// const env = require('./env.js');

// const config = {
//   client: 'pg',
//   connection: env.databaseUrl ? {
//     connectionString: env.databaseUrl,
//     ssl: { rejectUnauthorized: false },
//   } : {
//     host: env.databaseHost,
//     port: env.databasePort,
//     user: env.databaseUser,
//     password: env.databasePassword,
//     database: env.databaseDb,
//   },
// };

// const db = knex(config);

// module.exports = db;
