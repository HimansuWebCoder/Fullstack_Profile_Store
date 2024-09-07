const express = require("express");
const users = require("../controllers/users.controller");
const db = require("../config/db");
const usersRouter = express.Router();

usersRouter.get("/", (req, res) => {
	users.getUsers(req, res, db);
});
usersRouter.get("/:id", (req, res) => {
	users.getUsersId(req, res, db);
});
usersRouter.put("/:id", (req, res) => {
	users.updateUser(req, res, db);
});
usersRouter.get("/edit/:id", (req, res) => {
	users.getUserSkill(req, res, db);
});
usersRouter.delete("/:id", (req, res) => {
	users.deleteUser(req, res, db);
});

module.exports = usersRouter;
