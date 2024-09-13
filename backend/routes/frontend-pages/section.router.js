const express = require("express");
const path = require("path");
const sectionRouter = express.Router();

// GET add-section.html
sectionRouter.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "..", "frontend", "add-section.html"),
  );
});

module.exports = sectionRouter;
