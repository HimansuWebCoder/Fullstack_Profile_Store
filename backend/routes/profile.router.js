const express = require("express");
const profile = require("../controllers/profile.controller");
const db = require("../config/db");
const profileRouter = express.Router();

profileRouter.get("/", (req, res) => {
	profile.getProfile(req, res, db);
});

profileRouter.put("/:id", (req, res) => {
	console.log("Session:", req.session);
	profile.updateProfile(req, res, db);
});
module.exports = profileRouter;
