const express  = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
const path = require("path");
const app = express();
const port = 3000;


const add_section = require('./controllers/section');
const users = require("./controllers/users");
const profile = require("./controllers/profile");

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'test',
    database: 'profile-store',
  },
});


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors())


app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
})

app.get("/edit-profile", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "frontend", "edit-profile.html"));
})

app.get("/add-section", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "frontend", "add-section.html"));
})

app.get("/edit-skills-section", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "frontend", "edit-skills-section.html"));
})


// post skills (post)
app.post("/add-section", (req, res) => { add_section.postSection(req, res, db) });
app.get("/users", (req, res) => { users.getUsers(req, res, db)});
app.get("/users/:id", (req, res) => { users.getUsersId(req, res, db)});
app.get("/users/edit/:id", (req, res) => { users.getUserSkill(req, res, db)});
app.put("/users", (req, res) => { users.updateUsers(req, res, db)});
app.delete("/users", (req, res) => { users.deleteUsers(req, res, db)});
app.get("/profile", (req, res) => { profile.getProfile(req, res, db)});
app.get("/profile", (req, res) => { profile.getProfile(req, res, db)});
app.put("/profile", (req, res) => { profile.updateProfile(req, res, db)});


app.listen(port, () => {
	console.log(`Your website hosted at ${port}`);
});