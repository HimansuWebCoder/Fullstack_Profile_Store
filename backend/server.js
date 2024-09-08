const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const upload = require("./config/multerConfig");

// Backend API Routes
const profileRouter = require("./routes/profile.router");
const usersRouter = require("./routes/users.router");
const addSectionRouter = require("./routes/add-section.router");
const uploadRouter = require("./routes/upload.router");

// Frontend sending files routes
const indexRouter = require("./routes/frontend-pages/index.router");
const editProfileRouter = require("./routes/frontend-pages/edit-profile.router");
const editSkillsSectionRouter = require("./routes/frontend-pages/edit-skills-section.router");
const profileAdminRouter = require("./routes/frontend-pages/profile-admin.router");
const sectionRouter = require("./routes/frontend-pages/section.router");
const imageUploadRouter = require("./routes/frontend-pages/imageUpload.router");
const skillDeleteRouter = require("./routes/frontend-pages/skill-delete.router");
const skillEditRouter = require("./routes/frontend-pages/skill-edit.router");

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// Logging middleware
// app.use((req, res, next) => {
//    const start = Date.now();
//    next();
//    const delta = Date.now() - start;
//    console.log(`${req.method} ${req.baseUrl} ${req.params} ${req.url} ${delta}ms`);
// })

// Static files
app.use("/script", express.static(path.join(__dirname, "../frontend/script")));
app.use("/styles", express.static(path.join(__dirname, "../frontend/styles")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/profile", profileRouter);
app.use("/", indexRouter);
app.use("/profile-admin", profileAdminRouter);
app.use("/edit-profile", editProfileRouter);
app.use("/add-section", sectionRouter);
app.use("/edit-skills-section", editSkillsSectionRouter);

app.use("/imageUpload", imageUploadRouter);

app.use("/users", usersRouter);
app.use("/add-section", addSectionRouter);

app.use("/skill_delete", skillDeleteRouter);
app.use("/skill_edit", skillEditRouter);

app.use("/submit-file", upload.single("avatar"), uploadRouter);
app.use("/", uploadRouter);

// Start server
app.listen(process.env.PORT || 3000, () => {
	console.log(`Your website hosted at ${process.env.PORT || 3000}`);
});
