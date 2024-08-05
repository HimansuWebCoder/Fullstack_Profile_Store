const express = require('express');
const add_section = require('../controllers/section.controller');
const db = require("../models/db");
const addSectionRouter = express.Router();


addSectionRouter.post("/", (req, res) => { add_section.postSection(req, res, db) });

module.exports = addSectionRouter;