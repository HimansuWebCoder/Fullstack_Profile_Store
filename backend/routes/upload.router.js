const express = require("express");
const { uploadPost, viewImgPost } = require("../controllers/upload.controller");
const db = require("../config/db");
const uploadRouter = express.Router();

uploadRouter.post("/", (req, res) => {
	uploadPost(req, res, db);
});
uploadRouter.get("/view", (req, res) => {
	viewImgPost(req, res, db);
});

module.exports = uploadRouter;
