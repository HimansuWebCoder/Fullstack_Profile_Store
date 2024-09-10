const express = require("express");
const path = require("path");
const profileAdminRouter = express.Router();

profileAdminRouter.get("/", (req, res) => {
  console.log("Profile Admin Route Hit");
  console.log("Session data:", req.session);

  if (!req.session.user || !req.session.user.email) {
    return res.status(401).send("Please log in to view your profile");
  }
  res.sendFile(
    path.join(__dirname, "..", "..", "..", "frontend", "profile-admin.html"),
  );
});

module.exports = profileAdminRouter;
