// app.post("/add-section", (req, res) => {
// 	const { id, name } = req.body;
// 	// let isDone = false;

// 	// users.forEach(user => {
// 	// 	isDone = true;
// 	// 	db('users').insert({id: id, name: name})
// 	// 	.then(console.log)
// 	// 	user.skills.push({id, name});
// 	// 	res.json(users);
// 	// })
// 	db('users')
//     .returning('*')
// 	.insert({id: id, name: name})
// 	.then(response => {
// 		res.json(response)
// 	})
// })

const handleSection = (req, res, db) => {
	const { id, name } = req.body;
	db('users')
    .returning('*')
	.insert({id: id, name: name})
	.then(response => {
		res.json(response)
	})
}

module.exports = {
   handleSection
}