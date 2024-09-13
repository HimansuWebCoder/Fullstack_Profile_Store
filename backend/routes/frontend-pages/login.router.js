const express = require("express");
const path = require("path");
const loginRouter = express.Router();

// GET login.html
loginRouter.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "..", "frontend", "login.html"),
  );
});

module.exports = loginRouter;
