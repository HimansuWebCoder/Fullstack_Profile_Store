const express = require("express");
const { handleRegister } = require("../controllers/login/register");
const db = require("../config/db");
const registerRouter = express.Router();

// (POST) Register New User
registerRouter.post("/", (req, res) => {
	console.log("Request body:", req.body);
	handleRegister(req, res, db, bcrypt);
});

module.exports = registerRouter;
