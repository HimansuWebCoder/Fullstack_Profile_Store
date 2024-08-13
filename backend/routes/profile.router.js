const express = require('express');
const profile = require("../controllers/profile.controller"); 
const db = require("../models/db");
const profileRouter = express.Router();
const upload = require('../config/multerConfig');



profileRouter.get("/", (req, res) => { profile.getProfile(req, res, db)});
// profileRouter.put("/", (req, res) => { profile.updateProfile(req, res, db)});
// profileRouter.put("/", upload.single('avatar'), (req, res, next) => { profile.updateProfile(req, res, db)});
profileRouter.post("/profile", upload.single('avatar'), (req, res, next) => { 
	console.log(req.file)
	profile.postProfile(req, res, db)
});



module.exports = profileRouter;