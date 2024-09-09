const express = require("express");
const path = require("path");
const registerRouter = express.Router();

registerRouter.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "..", "frontend", "register-profile.html"),
  );
});

module.exports = registerRouter;
