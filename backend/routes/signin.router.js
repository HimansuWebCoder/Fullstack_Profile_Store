const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const { handleSignin } = require("../controllers/login/signin");
const db = require("../config/db");
const userSigninRouter = express.Router();

// (POST) User_Signin
userSigninRouter.post("/", handleSignin(db, bcrypt));

module.exports = userSigninRouter;
