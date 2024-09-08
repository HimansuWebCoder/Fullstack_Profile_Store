const { postUserSectionModel } = require("../models/users.model");

// post skill section
function postSkillSection(req, res) {
	const { id, name } = req.body;
	postUserSectionModel(id, name).then((response) => {
		res.status(201).json(response);
	});
}

module.exports = {
	postSkillSection,
};
