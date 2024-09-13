const express = require("express");
const {
	getProfile,
	updateProfile,
	getProfileSkills,
	deleteProfileSkills,
	postProfileSkills,
} = require("../controllers/profile.controller");
const db = require("../config/db");
const profileRouter = express.Router();

// GET Profile
profileRouter.get("/", (req, res) => {
	getProfile(req, res, db);
});

// PUT Profile
profileRouter.put("/:id", (req, res) => {
	console.log("Session:", req.session);
	updateProfile(req, res, db);
});

// GET Profile_Skills
profileRouter.get("/:profileId/skills", (req, res) => {
	getProfileSkills(req, res, db);
});

// POST Profile_Skills
profileRouter.post("/:profileId/skills", (req, res) => {
	postProfileSkills(req, res, db);
});

// DELETE Profile_Skills
profileRouter.delete("/:profileId/skills/:skillId", (req, res) => {
	deleteProfileSkills(req, res, db);
});

module.exports = profileRouter;
