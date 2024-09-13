const express = require("express");
const debugSessionRouter = express.Router();

// GET DEBUG_SESSION ROUTE and MONITORING
debugSessionRouter.get("/", (req, res) => {
	if (req.session.profileId) {
		console.log("Session ID:", req.sessionID);
		console.log("Session Data:", req.session);
		res.json({
			message: "Session is active",
			// sessionID: req.sessionID,
			sessionID: req.session.userId,
			sessionData: req.session,
		});
	} else {
		res.status(401).send("No active session");
	}
});

module.exports = debugSessionRouter;
