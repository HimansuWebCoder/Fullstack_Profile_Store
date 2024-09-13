const express = require("express");
const path = require("path");
const imageUploadRouter = express.Router();

// GET imageUpload.html
imageUploadRouter.get("/", (req, res) => {
	res.sendFile(
		path.join(__dirname, "..", "..", "..", "frontend", "imageUpload.html"),
	);
});

module.exports = imageUploadRouter;
