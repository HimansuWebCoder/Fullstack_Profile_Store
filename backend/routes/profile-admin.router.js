const express = require('express');
const path = require("path");
const profileAdminRouter = express.Router();


profileAdminRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'frontend', 'profile-admin.html'));
});

module.exports = profileAdminRouter;

