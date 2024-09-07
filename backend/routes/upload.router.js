const express = require("express");
const uploadPost = require("../controllers/upload.controller");
const db = require("../config/db");
const uploadRouter = express.Router();

uploadRouter.post("/", (req, res) => {
	uploadPost.uploadPost(req, res, db);
});
uploadRouter.get("/view", (req, res) => {
	uploadPost.viewImgPost(req, res, db);
});

module.exports = uploadRouter;
