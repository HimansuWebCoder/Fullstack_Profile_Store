const express  = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

// Import routes
const profileRouter = require("./routes/profile.router");
const usersRouter = require("./routes/users.router");
const addSectionRouter = require("./routes/add-section.router");
const indexRouter = require("./routes/index.router");
const editProfileRouter = require("./routes/edit-profile.router");
const editSkillsSectionRouter = require("./routes/edit-skills-section.router");
const profileAdminRouter = require("./routes/profile-admin.router");
const sectionRouter = require("./routes/section.router");

// Middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors())

// Logging middleware
app.use((req, res, next) => {
   const start = Date.now();
   next();
   const delta = Date.now() - start; 
   console.log(`${req.method} ${req.baseUrl} ${req.url} ${delta}ms`);
}) 

// Static files
app.use('/script', express.static(path.join(__dirname, '../frontend/script')));
app.use('/styles', express.static(path.join(__dirname, '../frontend/styles')));

// Routes
app.use('/', indexRouter);
app.use('/profile-admin', profileAdminRouter);
app.use('/edit-profile', editProfileRouter);
app.use('/add-section', sectionRouter);
app.use('/edit-skills-section', editSkillsSectionRouter);

app.use('/users', usersRouter);
app.use('/add-section', addSectionRouter);
app.use('/profile', profileRouter);

// Start server
app.listen(process.env.PORT || 3000, () => {
	console.log(`Your website hosted at ${process.env.PORT || 3000}`);
});