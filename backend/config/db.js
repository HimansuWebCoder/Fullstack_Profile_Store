const knex = require("knex");
require("dotenv").config(); // taking environmentabl variable from .env fil

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    //   host: process.env.DATABASE_HOST,
    //   port: process.env.DATABASE_PORT,
    //   user: process.env.DATABASE_USER,
    //   password: process.env.DATABASE_PASSWORD,
    //   database: process.env.DATABASE_DB,
  },
});

console.log(process.env.DATABASE_URL);
module.exports = db;
