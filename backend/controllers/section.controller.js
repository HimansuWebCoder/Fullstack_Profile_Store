// post skill section
const postSection = (req, res, db) => {
	const { id, name } = req.body;
	db('users')
    .returning('*')
	.insert({id: id, name: name})
	.then(response => {
		res.json(response)
	})
}

module.exports = {
   postSection: postSection
}