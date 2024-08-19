const express  = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const db = require("./models/db");
const upload = require("./config/multerConfig");

// const multer = require('multer');

// Import routes
const profileRouter = require("./routes/profile.router");
const usersRouter = require("./routes/users.router");
const addSectionRouter = require("./routes/add-section.router");
const indexRouter = require("./routes/index.router");
const editProfileRouter = require("./routes/edit-profile.router");
const editSkillsSectionRouter = require("./routes/edit-skills-section.router");
const profileAdminRouter = require("./routes/profile-admin.router");
const sectionRouter = require("./routes/section.router");
const uploadRouter = require("./routes/upload.router");

const imageUploadRouter = require("./routes/imageUpload.router");

const skillDeleteRouter = require("./routes/skill-delete.router");
const skillEditRouter = require("./routes/skill-edit.router");



// Middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors())
app.use('/uploads', express.static('uploads'));

// Logging middleware
// app.use((req, res, next) => {
//    const start = Date.now();
//    next();
//    const delta = Date.now() - start; 
//    console.log(`${req.method} ${req.baseUrl} ${req.params} ${req.url} ${delta}ms`);
// }) 


// Static files
app.use('/script', express.static(path.join(__dirname, '../frontend/script')));
app.use('/styles', express.static(path.join(__dirname, '../frontend/styles')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/profile', profileRouter);
app.use('/', indexRouter);
app.use('/profile-admin', profileAdminRouter);
app.use('/edit-profile', editProfileRouter);
app.use('/add-section', sectionRouter);
app.use('/edit-skills-section', editSkillsSectionRouter);

app.use('/imageUpload', imageUploadRouter);

app.use('/users', usersRouter);
app.use('/add-section', addSectionRouter);

app.use('/skill_delete', skillDeleteRouter);
app.use('/skill_edit', skillEditRouter);


// let's try using database
app.use('/submit-file', upload.single('avatar'), uploadRouter);
app.use("/", uploadRouter)

// Start server
app.listen(process.env.PORT || 3000, () => {
	console.log(`Your website hosted at ${process.env.PORT || 3000}`);
});

  