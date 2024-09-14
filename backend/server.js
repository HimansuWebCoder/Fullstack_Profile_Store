const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
// const upload = require("./config/multerConfig");
const bcrypt = require("bcrypt-nodejs");
const session = require("express-session");
require("dotenv").config();
const db = require("./config/db");

// Backend API Routes
const profileRouter = require("./routes/profile.router");
const usersRouter = require("./routes/users.router");
const addSectionRouter = require("./routes/add-section.router");
const uploadRouter = require("./routes/upload.router");
const debugSessionRouter = require("./routes/debug-session.router");
const userRegisterRouter = require("./routes/register.router");
const userSigninRouter = require("./routes/signin.router");

// Frontend sending files routes
const indexRouter = require("./routes/frontend-pages/index.router");
const editProfileRouter = require("./routes/frontend-pages/edit-profile.router");
const editSkillsSectionRouter = require("./routes/frontend-pages/edit-skills-section.router");
const profileAdminRouter = require("./routes/frontend-pages/profile-admin.router");
const sectionRouter = require("./routes/frontend-pages/section.router");
const imageUploadRouter = require("./routes/frontend-pages/imageUpload.router");
const skillDeleteRouter = require("./routes/frontend-pages/skill-delete.router");
const skillEditRouter = require("./routes/frontend-pages/skill-edit.router");
const registerRouter = require("./routes/frontend-pages/register.router");
const loginRouter = require("./routes/frontend-pages/login.router");

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(
	session({
		secret: process.env.SESSION_SECRET || "Himansu!@9861!$%#@",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false }, // Set to true if using HTTPS
	}),
);

app.use((req, res, next) => {
	console.log("Middleware Session:", req.session);
	next();
});

// Logging middleware
app.use((req, res, next) => {
	const start = Date.now();
	next();
	const delta = Date.now() - start;
	console.log(
		`${req.method} ${req.baseUrl} ${req.params} ${req.url} ${delta}ms`,
	);
});

const isAuthenticated = (req, res, next) => {
	if (req.session.user) {
		return next();
	}
	res.status(401).json("Unauthorized");
};

// Static files
app.use("/script", express.static(path.join(__dirname, "../frontend/script")));
app.use("/styles", express.static(path.join(__dirname, "../frontend/styles")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/public", express.static(path.join(__dirname, "public")));

// Frontend Serve Routes
// app.use("/", indexRouter);
app.use("/profile-feed", indexRouter);
app.use("/", registerRouter);
app.use("/profile-admin", profileAdminRouter);
app.use("/edit-profile", editProfileRouter);
app.use("/add-section", sectionRouter);
app.use("/edit-skills-section", editSkillsSectionRouter);
app.use("/imageUpload", imageUploadRouter);
app.use("/skill_delete", skillDeleteRouter);
app.use("/skill_edit", skillEditRouter);
app.use("/register-profile", registerRouter);
app.use("/login", loginRouter);

// Backend API Routes
app.use("/profile", profileRouter);
app.use("/users", usersRouter);
app.use("/add-section", addSectionRouter);
app.use("/debug-session", debugSessionRouter);
app.use("/register", userRegisterRouter);
app.use("/signin", userSigninRouter);
app.use("/submit-file", uploadRouter);
// app.use("/", uploadRouter);

app.get("/get-session", (req, res) => {
	res.json(req.session);
});

// Fetch profiles for the feed
app.get("/profile-feed", isAuthenticated, (req, res) => {
	db.select("*")
		.from("profile")
		.then((profiles) => {
			console.log(profiles);
			res.json(profiles);
		})
		.catch((err) => res.status(500).json("Error fetching profiles"));
});

// Start server
app.listen(process.env.PORT || 3000, () => {
	console.log(
		`Your website hosted at http://localhost:${process.env.PORT || 3000}`,
	);
});
