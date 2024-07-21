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
	  	// skills: ["html", "css", "react.js", "next.js", "node.js"]
	  	skills: [{id: "1", name: "html"}]
	  }
];


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
	const { id, name } = req.body;
	let isDone = false;

	users.forEach(user => {
		user.skills.push({id, name});
		res.json(users);
		isDone = true;
	})
})


app.put("/edit-skills-section", (req, res) => {
	const { id, name } = req.body;

    if (!id || !name) {
        res.status(400).json({ message: "Invalid request body" });
        return;
    }

	let isDone = false;
	 console.log("Request Body:", req.body);
	
	for (let i = 0; i < users.length; i++) {
		for (let j = 0; j < users[i].skills.length; j++) { // Correctly iterate through skills array
			if (users[i].skills[j].id === id) {
				users[i].skills[j].name = name;
				console.log("skills found and updated");
				isDone = true;
				break;
			}
		}
		if (isDone) break;
	}
	
	// if (isDone) {
	// 	res.json(users);
	// } else {
	// 	res.status(404).json({ message: "Skill not found" });
	// }
	if (isDone) {
        console.log("Users after update:", JSON.stringify(users, null, 2)); // Log the users after update
        res.json(users);
    } else {
        res.status(404).json({ message: "Skill not found" });
    }
});



// app.delete("/profile", (req, res) => {
// 	const { id, skill } = req.body;
// 	users.forEach(user => {
// 		if (user.id === id) {
// 			const indexSkill = user.skills.indexOf(skill)
// 			user.skills.splice(indexSkill, 1)
// 			res.json(users);
// 		}
// })

app.listen(port, () => {
	console.log(`Your website hosted at ${port}`);
});