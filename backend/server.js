const express  = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
const path = require("path");
const app = express();


const add_section = require('./controllers/section.controllers');
const users = require("./controllers/users.controllers");
const profile = require("./controllers/profile.controllers"); 


const db = knex({
  client: 'pg',
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


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors())

app.use('/script', express.static(path.join(__dirname, '../frontend/script')));
app.use('/styles', express.static(path.join(__dirname, '../frontend/styles')));


app.use('/script', express.static(path.join(__dirname, '../frontend/script')));

app.use('/styles', express.static(path.join(__dirname, '../frontend/styles')));


// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/index.html'));
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/profile-admin.html'));
});

app.get('/profile-admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/profile-admin.html'));
})

app.get("/edit-profile", (req, res) => {
	res.sendFile(path.join(__dirname, "../frontend/edit-profile.html"));
})

app.get("/add-section", (req, res) => {
	res.sendFile(path.join(__dirname,"../frontend/add-section.html"));
})

app.get("/edit-skills-section", (req, res) => {
	res.sendFile(path.join(__dirname, "../frontend/edit-skills-section.html"));
})

const usersRouter = express.Router();

usersRouter.get('/users', )


// post skills (post)
app.get("/users", (req, res) => { users.getUsers(req, res, db)});
app.put("/users", (req, res) => { users.updateUsers(req, res, db)});
app.get("/users/:id", (req, res) => { users.getUsersId(req, res, db)});
app.get("/users/edit/:id", (req, res) => { users.getUserSkill(req, res, db)});
app.delete("/users", (req, res) => { users.deleteUsers(req, res, db)});
app.get("/profile", (req, res) => { profile.getProfile(req, res, db)});
app.put("/profile", (req, res) => { profile.updateProfile(req, res, db)});
app.post("/add-section", (req, res) => { add_section.postSection(req, res, db) });

app.listen(process.env.PORT || 3000, () => {
	console.log(`Your website hosted at ${process.env.PORT || 3000}`);
});