const express = require("express");
const path = require("path");
const skillDeleteRouter = express.Router();

// GET skills_delete.html
skillDeleteRouter.get("/:id/delete", (req, res) => {
	res.sendFile(
		path.join(__dirname, "..", "..", "..", "frontend", "skill_delete.html"),
	);
});

module.exports = skillDeleteRouter;
