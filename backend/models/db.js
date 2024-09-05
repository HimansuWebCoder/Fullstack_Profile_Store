const knex = require("knex");

// const db = knex({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: { rejectUnauthorized: false },
//     host: process.env.DATABASE_HOST,
//     port: 5432,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PW,
//     database: process.env.DATABASE_DB,
//   },
// });

const db = knex({
  client: "pg",
  connection: {
    // connectionString: process.env.DATABASE_URL,
    connectionString:
      "postgresql://profile_store_mjnf_user:gb55MyCeJYTxCJZY3rBxuSPrDy6mi1EB@dpg-cr9jjot6l47c73convmg-a.oregon-postgres.render.com/profile_store_mjnf",
    ssl: { rejectUnauthorized: false },
    // host: "dpg-cqhhdaiju9rs738l69g0-a.oregon-postgres.render.com",
    host: "dpg-cr9jjot6l47c73convmg-a.oregon-postgres.render.com",
    port: 5432,
    // user: "profile_store_database",
    user: "profile_store_mjnf_user",
    // password: "V6YpJ9fuRAimvbTgDZ3JAke22WKKMUGX",
    password: "gb55MyCeJYTxCJZY3rBxuSPrDy6mi1EB",
    // database: "profile_store_s11h"
    database: "profile_store_mjnf",
  },
});

module.exports = db;

// postgresql://profile_store_mjnf_user:gb55MyCeJYTxCJZY3rBxuSPrDy6mi1EB@dpg-cr9jjot6l47c73convmg-a.oregon-postgres.render.com/profile_store_mjnf
