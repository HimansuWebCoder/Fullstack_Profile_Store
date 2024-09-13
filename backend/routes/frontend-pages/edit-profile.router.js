const express = require("express");
const path = require("path");
const editProfileRouter = express.Router();

// GET edit-profile.html
editProfileRouter.get("/", (req, res) => {
	res.sendFile(
		path.join(__dirname, "..", "..", "..", "frontend", "edit-profile.html"),
	);
});

module.exports = editProfileRouter;
