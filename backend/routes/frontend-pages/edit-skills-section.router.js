const express = require("express");
const path = require("path");
const editSkillsSectionRouter = express.Router();

// Serve the edit-skills-section.html file
editSkillsSectionRouter.get("/", (req, res) => {
  const filePath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "frontend",
    "edit-skills-section.html",
  );
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`Error sending file: ${err}`);
      res.status(500).send("An error occurred while serving the file.");
    }
  });
});

module.exports = editSkillsSectionRouter;
