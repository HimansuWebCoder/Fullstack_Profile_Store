const express = require('express');
const users = require("../controllers/users.controller");
const db = require("../models/db");
const usersRouter = express.Router();

usersRouter.use((req, res, next) => {
	console.log(`ip address: ${req.ip}`);
	next();
})

usersRouter.get("/", (req, res) => { users.getUsers(req, res, db)});
usersRouter.put("/", (req, res) => { users.updateUsers(req, res, db)});
usersRouter.get("/:id", (req, res) => { users.getUsersId(req, res, db)});
usersRouter.get("/edit/:id", (req, res) => { users.getUserSkill(req, res, db)});
usersRouter.delete("/", (req, res) => { users.deleteUsers(req, res, db)});

module.exports = usersRouter;