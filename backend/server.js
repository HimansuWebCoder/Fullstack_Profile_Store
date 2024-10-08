const express = require("express");
const bodyParser = require("body-parser");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");
const app = express();
// const upload = require("./config/multerConfig");
const bcrypt = require("bcrypt-nodejs");
const session = require("express-session");
// const pgSession = require("connect-pg-simple")(session);
// const { Pool } = require("pg");
require("dotenv").config();
const db = require("./config/db");

const server = createServer(app);
const io = new Server(server);

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

// const sessionPool = new Pool({
// 	connectionString: process.env.DATABASE_URL,
// 	ssl: { rejectUnauthorized: false },
// });

console.log("Database URL", process.env.DATABASE_URL);

app.use(
	session({
		// store: new pgSession({
		// 	pool: sessionPool,
		// 	tableName: "session",
		// }),
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
	res.status(401).json({ err: "Unauthorized" });
};

// Static files
app.use("/script", express.static(path.join(__dirname, "../frontend/script")));
app.use("/styles", express.static(path.join(__dirname, "../frontend/styles")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/public", express.static(path.join(__dirname, "public")));

// Frontend Serve Routes
// app.use("/", indexRouter);
app.use("/all-profiles-feeds", indexRouter);
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
// app.get("/profile-feed", isAuthenticated, (req, res) => {
// 	const userId = req.session.user.id;
// 	const userName = req.session.user.name;
// 	db.select("*")
// 		.from("profile")
// 		.where("user_id", userId)
// 		.then((profiles) => {
// 			console.log(profiles);
// 			res.json({ profiles, userName });
// 		})
// 		.catch((err) => res.status(500).json("Error fetching profiles"));
// });

app.get("/all-profiles", isAuthenticated, (req, res) => {
	const userName = req.session.user.name;
	const userImage = req.session.user.image;

	if (!userName || !userImage) {
		return res.status(401).json("Please log in to view all-profiles-feeds");
	}
	db.select("id", "name", "passion", "image")
		.from("profile")
		.then((profiles) => {
			console.log(profiles);
			res.json({ profiles, userName, userImage });
		})
		.catch((err) => res.status(500).json("Error fetching profiles"));
});

app.get("/user-chat", (req, res) => {
	res.sendFile(join(__dirname, "../frontend/user-chat.html"));
});

const getProfile = (req, res) => {
	if (!req.session.user || !req.session.user.email) {
		return res.status(401).json("Please log in to view your profile");
	}

	const userEmail = req.session.user.email;

	getUserProfileModel(userEmail)
		.then((users) => {
			if (users.length > 0) {
				res.json(users[0]);
				res.sendFile(
					path.join(
						__dirname,
						"..",
						"..",
						"frontend",
						"profile-admin.html",
					),
				);
			} else {
				res.status(404).json("Profile not found");
			}
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({ error: "Internal Server Error" });
		});
};

// Without using DB
// io.on("connection", (socket) => {
// 	console.log("A user connected");

// 	socket.on("chat message", (msg) => {
// 		io.emit("chat message", msg);
// 	});
// });

// Using DB
io.on("connection", async (socket) => {
	console.log("A user connected");
	// Fetching all chat messages from db and send to client
	try {
		const chatMsgs = await db("chat_messages")
			.select("*")
			.orderBy("created_at", "desc");
		socket.emit("previous messages", chatMsgs);
	} catch (err) {
		console.error("Error fetching chat data from DB:", err);
	}

	// socket.on("chat message", async (msg) => {
	// 	try {
	// 		const result = await db("chat_messages")
	// 			.insert({
	// 				message: msg,
	// 				created_at: new Date(),
	// 			})
	// 			.returning("*");

	// 		console.log("Messages:", result);

	// 		io.emit("chat message", msg, result);
	// 	} catch (err) {
	// 		console.error("Error inserting chat msg into db:", err);
	// 	}
	// });
	socket.on("chat message", async (msg) => {
		try {
			const [insertedMessage] = await db("chat_messages")
				.insert({
					message: msg,
					created_at: new Date(),
				})
				.returning(["message", "created_at"]); // Return specific fields

			console.log("Messages:", insertedMessage.created_at);

			io.emit("chat message", insertedMessage);
		} catch (err) {
			console.error("Error inserting chat msg into db:", err);
		}
	});
});
// Start server
server.listen(process.env.PORT || 3000, () => {
	console.log(
		`Your website hosted at http://localhost:${process.env.PORT || 3000}`,
	);
});
