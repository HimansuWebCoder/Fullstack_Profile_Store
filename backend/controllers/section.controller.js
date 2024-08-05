// post skill section
function postSection(req, res, db) {
	const { id, name } = req.body;
	db('users')
    .returning('*')
	.insert({id: id, name: name})
	.then(response => {
		res.status(201).json(response)
	})
}

module.exports = {
   postSection,
};