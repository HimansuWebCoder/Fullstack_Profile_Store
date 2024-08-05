const express = require('express');
const profile = require("../controllers/profile.controller"); 
const db = require("../models/db");
const profileRouter = express.Router();

profileRouter.use((req, res, next) => {
	console.log(`ip address: ${req.ip}`);
	next();
})

profileRouter.get("/", (req, res) => { profile.getProfile(req, res, db)});
profileRouter.put("/", (req, res) => { profile.updateProfile(req, res, db)});

module.exports = profileRouter;