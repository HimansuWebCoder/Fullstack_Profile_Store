const express = require("express");
const {
	getUserSkills,
	getUserSkillId,
	updateUserSkill,
	deleteUserSkill,
	getUserSkill,
} = require("../controllers/users.controller");
const db = require("../config/db");
const usersRouter = express.Router();

// GET User_Skills
usersRouter.get("/", (req, res) => {
	getUserSkills(req, res, db);
});

// GET One_User_Skill_Id
usersRouter.get("/:id", (req, res) => {
	getUserSkillId(req, res, db);
});

// GET One_User_Skill
usersRouter.get("/edit/:id", (req, res) => {
	getUserSkill(req, res, db);
});

// PUT User_Skill
usersRouter.put("/:id", (req, res) => {
	updateUserSkill(req, res, db);
});

// DELETE User_Skill
usersRouter.delete("/:id", (req, res) => {
	deleteUserSkill(req, res, db);
});

module.exports = usersRouter;
