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

usersRouter.get("/", (req, res) => {
	getUserSkills(req, res, db);
});
usersRouter.get("/:id", (req, res) => {
	getUserSkillId(req, res, db);
});
usersRouter.get("/edit/:id", (req, res) => {
	getUserSkill(req, res, db);
});
usersRouter.put("/:id", (req, res) => {
	updateUserSkill(req, res, db);
});
usersRouter.delete("/:id", (req, res) => {
	deleteUserSkill(req, res, db);
});

module.exports = usersRouter;
