const express = require("express");
const path = require("path");
const skillEditRouter = express.Router();

// GET skill_edit.html
skillEditRouter.get("/:id/edit", (req, res) => {
	res.sendFile(
		path.join(__dirname, "..", "..", "..", "frontend", "skill_edit.html"),
	);
});

module.exports = skillEditRouter;
