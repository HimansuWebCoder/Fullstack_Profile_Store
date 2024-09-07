const express = require("express");
const path = require("path");
const imageUploadRouter = express.Router();

imageUploadRouter.get("/", (req, res) => {
	res.sendFile(
		path.join(__dirname, "..", "..", "..", "frontend", "imageUpload.html"),
	);
	console.log(req.params);
});

module.exports = imageUploadRouter;
