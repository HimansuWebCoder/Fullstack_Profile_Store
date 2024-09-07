const { postUserSectionModel } = require("../models/users.model");

// post skill section
function postSection(req, res, db) {
	const { id, name } = req.body;
	postUserSectionModel().then((response) => {
		res.status(201).json(response);
	});
}

module.exports = {
	postSection,
};
