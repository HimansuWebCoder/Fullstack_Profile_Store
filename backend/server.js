const express  = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors())

// Demo one user for now only play with without DATABASE now later we will add
const users = [
	  {
	  	id: "123",
	  	name: "Prashant",
	  	passion: "Coding",
	  	image: "",
	  	skills: []
	  }
];

// // for now I only add skills separately not connected with any particular users

// const skills = []

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "frontend", "index.html"));
})

app.get("/edit-profile", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "frontend", "profile-edit.html"));
})

app.get("/add-section", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "frontend", "section-edit.html"));
})

app.get("/edit-skills-section", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "frontend", "skills-section-edit.html"));
})

app.get("/", (req, res) => {
	res.json(users);
})

app.get("/profile", (req, res) => {
	res.json(users);
})

app.get("/edit-profile", (req, res) => {
	res.json(users);
})

app.put("/edit-profile", (req, res) => {
	const { id, name, passion, image } = req.body;
	users.forEach((user, i) => {
		if (user.id === id) {
			user.name = name;
			user.passion = passion;
			user.image = image;
		    res.json(users);
		}
	})
})

app.post("/add-section", (req, res) => {
	const { id, skill } = req.body;
	users.forEach((user, i) => {
		if (user.id === id) {
			user.skills.push(skill);
       	    res.json(users);
		}
	})
})

app.delete("/profile", (req, res) => {
	const { skill } = req.body;
})

app.listen(port, () => {
	console.log(`Your website hosted at ${port}`);
});