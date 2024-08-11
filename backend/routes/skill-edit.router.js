const express = require('express');
const path = require("path");
const skillEditRouter = express.Router();

skillEditRouter.get("/:id/delete", (req, res) => {
	res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'skill_edit.html'));
	console.log(req.params);
})

// (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/skill_edit.html'));
// }

module.exports = skillEditRouter;


