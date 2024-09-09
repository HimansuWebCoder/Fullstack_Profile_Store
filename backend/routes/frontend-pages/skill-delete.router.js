const express = require("express");
const path = require("path");
const skillDeleteRouter = express.Router();

skillDeleteRouter.get("/:id/delete", (req, res) => {
	res.sendFile(
		path.join(__dirname, "..", "..", "..", "frontend", "skill_delete.html"),
	);
});

module.exports = skillDeleteRouter;
