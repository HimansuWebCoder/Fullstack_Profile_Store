const express = require('express');
const path = require("path");
const skillEditRouter = express.Router();

skillEditRouter.get("/:id/edit", (req, res) => {
	res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'skill_edit.html'));
	console.log(req.params);
})

module.exports = skillEditRouter;


