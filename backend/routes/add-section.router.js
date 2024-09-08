const express = require("express");
const { postSkillSection } = require("../controllers/section.controller");
const db = require("../config/db");
const addSectionRouter = express.Router();

addSectionRouter.post("/", (req, res) => {
	postSkillSection(req, res, db);
});

module.exports = addSectionRouter;
