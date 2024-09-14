const express = require("express");
const path = require("path");
const indexRouter = express.Router();

// GET index.html
indexRouter.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "..", "frontend", "index.html"),
  );
});

indexRouter.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "..", "frontend", "profile-feeds.html"),
  );
});

module.exports = indexRouter;
