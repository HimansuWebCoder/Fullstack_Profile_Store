const { postUserSectionModel } = require("../models/users.model");

// post skill section
function postSkillSection(req, res) {
	const { id, name } = req.body;
	postUserSectionModel(id, name).then((response) => {
		if (name !== name) {
			res.status(201).json(response);
		} else {
			res.json({ isExist: `${name} is already exist` });
		}
	});
}

module.exports = {
	postSkillSection,
};
