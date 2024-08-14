const knex = require("knex");

// const db = knex({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: { rejectUnauthorized: false },
//     host: process.env.DATABASE_HOST,
//     port: 5432,
//     // user: process.env.DATABASE_USER,
//     user: "profile_store_database",
//     // password: process.env.DATABASE_PW,
//     password: "V6YpJ9fuRAimvbTgDZ3JAke22WKKMUGX",
//     // database: process.env.DATABASE_DB,
//     database: "profile_store_s11h"
//   },
// });

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    host: "dpg-cqhhdaiju9rs738l69g0-a.oregon-postgres.render.com",
    port: 5432,
    user: "profile_store_database",
    password: "V6YpJ9fuRAimvbTgDZ3JAke22WKKMUGX",
    database: "profile_store_s11h"
  },
});

module.exports = db;