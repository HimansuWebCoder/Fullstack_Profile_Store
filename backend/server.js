const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const db = require("./models/db");
const upload = require("./config/multerConfig");
const bcrypt = require("bcrypt-nodejs");
const session = require("express-session");

const register = require("./controllers/login/register");
const signin = require("./controllers/login/signin");

// Backend API Routes
const profileRouter = require("./routes/profile.router");
const usersRouter = require("./routes/users.router");
const addSectionRouter = require("./routes/add-section.router");
const uploadRouter = require("./routes/upload.router");
const debugSessionRouter = require("./routes/debug-session.router");

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

// const { updateUserProfileModel } = require("./models/profile.model");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(cors());
app.use(
	cors({
		origin: [
			"http://localhost:3000",
			"https://fullstack-profile-store-2.onrender.com/",
		],
	}),
);

app.use("/uploads", express.static("uploads"));

// Setting up session middleware
app.use(
	session({
		secret: "Himansu@9861", // Change this to a secure key
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false }, // Set to true if using HTTPS
	}),
);

// Logging middleware
app.use((req, res, next) => {
	const start = Date.now();
	next();
	const delta = Date.now() - start;
	console.log(
		`${req.method} ${req.baseUrl} ${req.params} ${req.url} ${delta}ms`,
	);
});

// Static files
app.use("/script", express.static(path.join(__dirname, "../frontend/script")));
app.use("/styles", express.static(path.join(__dirname, "../frontend/styles")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

app.use("/submit-file", upload.single("avatar"), uploadRouter);
app.use("/", uploadRouter);

app.post("/signin", signin.handleSignin(db, bcrypt));
app.post("/register", (req, res) => {
	console.log("Request body:", req.body);
	register.handleRegister(req, res, db, bcrypt);
});

app.get("/debug-session", debugSessionRouter);

app.post("/profile/:profileId/skills", async (req, res) => {
	const { profileId } = req.params;
	const { skill } = req.body;
	try {
		const userExists = await db("profile").where({ id: profileId }).first();
		if (!userExists) {
			return res.status(404).json({ error: "User not found" });
		}

		const [newSkill] = await db("skills")
			.insert({ profile_id: profileId, skill })
			.returning("*");
		res.status(201).json(newSkill);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

app.get("/profile/:profileId/skills", async (req, res) => {
	const { profileId } = req.params;
	console.log(profileId);
	try {
		const userExists = await db("profile").where({ id: profileId }).first();
		console.log(userExists);
		if (!userExists) {
			return res.status(404).json({ error: "User not found" });
		}

		const skills = await db("skills")
			.where({ profile_id: profileId })
			.select("*");
		res.status(200).json(skills);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

app.delete("/profile/:profileId/skills/:skillId", async (req, res) => {
	const { profileId, skillId } = req.params;
	try {
		const [deletedSkill] = await db("skills")
			.where({ id: skillId, profile_id: profileId })
			.del()
			.returning("*");
		if (!deletedSkill) {
			return res.status(404).send("Skill not found");
		}
		res.status(200).json({ message: "Skill deleted" });
	} catch (err) {
		res.status(500).send(err.message);
	}
});

// Start server
app.listen(process.env.PORT || 3000, () => {
	console.log(
		`Your website hosted at http://localhost:${process.env.PORT || 3000}`,
	);
});
