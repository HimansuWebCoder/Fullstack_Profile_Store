const express = require("express");
const {
	getProfile,
	updateProfile,
	postProfileSkills,
	getProfileSkills,
	deleteProfileSkills,
} = require("../controllers/profile.controller");
const db = require("../config/db");
const profileRouter = express.Router();

profileRouter.get("/", (req, res) => {
	getProfile(req, res, db);
});

profileRouter.put("/:id", (req, res) => {
	console.log("Session:", req.session);
	updateProfile(req, res, db);
});

profileRouter.get("/:profileId/skills", (req, res) => {
	getProfileSkills(req, res, db);
});

profileRouter.post("/:profileId/skills", (req, res) => {
	postProfileSkills(req, res, db);
});

profileRouter.delete("/:profileId/skills/:skillId", (req, res) => {
	deleteProfileSkills(req, res, db);
});

module.exports = profileRouter;
