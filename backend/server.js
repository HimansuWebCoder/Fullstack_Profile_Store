const express  = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");

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


const path = require("path");
const app = express();

const port = 3000;

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
app.post("/add-section", (req, res) => {
	const { id, name } = req.body;
	db('users')
    .returning('*')
	.insert({id: id, name: name})
	.then(response => {
		res.json(response)
	})
})

// get users (get)
app.get("/users", (req, res) => {
    db.select('*').from('users')
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

// get one user (get)
app.get("/users/:id", (req, res) => {
	const { id } = req.params;
	db.select('*').from('users').where({
		id: id
	})
	.then(user => {
		console.log(user);
		res.json(user);
	})
})

// get profile (get)
app.get("/profile", (req, res) => {
    db.select('*').from('profile')
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

// update profile (put)
app.put("/profile", (req, res) => {
	const { id, name, passion, image } = req.body;
	db('profile')
	   .where({ id })
	   .update({ name, passion, image })
	   .then(user => {
	   	res.json(user);
	   })
})

// update users (put)
app.put("/users", (req, res) => {
	const { id, name} = req.body;
	db('users')
	   .where({ id })
	   .update({ name })
	   .then(user => {
	   	res.json(user);
	   })
})


// delete users (delete)
app.delete("/users", (req, res) => {
	const { id } = req.body;
	db('users')
		.where({ id })
		.del()
		.then(() => res.status(200).send('User deleted successfully'))
		.catch(error => res.status(500).json({ error }));
});

// get one skill for edit
app.get("/users/edit/:id", (req, res) => {
	const { id } = req.params;
	db.select("*").from('users').where({
		id: id
	})
	.then(user => {
		console.log(user);
		res.json(user)
	})
})


app.listen(port, () => {
	console.log(`Your website hosted at ${port}`);
});