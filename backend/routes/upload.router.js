const express = require("express");
const { uploadPost, viewImgPost } = require("../controllers/upload.controller");
const db = require("../config/db");
const uploadRouter = express.Router();

// UPLOAD POST
uploadRouter.post("/", (req, res) => {
	uploadPost(req, res, db);
});

// GET Uploaded_Image
uploadRouter.get("/view", (req, res) => {
	viewImgPost(req, res, db);
});

module.exports = uploadRouter;
