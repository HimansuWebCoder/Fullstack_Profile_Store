const express  = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

const multer = require('multer');
// const path = require('path');



// Import routes
const profileRouter = require("./routes/profile.router");
const usersRouter = require("./routes/users.router");
const addSectionRouter = require("./routes/add-section.router");
const indexRouter = require("./routes/index.router");
const editProfileRouter = require("./routes/edit-profile.router");
const editSkillsSectionRouter = require("./routes/edit-skills-section.router");
const profileAdminRouter = require("./routes/profile-admin.router");
const sectionRouter = require("./routes/section.router");

const imageUploadRouter = require("./routes/imageUpload.router");

const skillDeleteRouter = require("./routes/skill-delete.router");
const skillEditRouter = require("./routes/skill-edit.router");

const db = require("./models/db");


// Middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cors())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, './uploads/'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.original + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

module.exports = upload;

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

// app.get('/skill-edit/:id/delete', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/skill_edit.html'));
// });

app.use('/skill_delete', skillDeleteRouter);
app.use('/skill_edit', skillEditRouter);

app.post('/profile', upload.single('avatar'), function (req, res, next) {
   const profileData = {
    image: `/uploads/${req.file.originalname}`
  };
  
  console.log(req.file);
  // Assuming you want to update an existing profile, you might have an ID or some identifier
  // const profileId = req.body.id; // Replace 'id' with the actual identifier you use

  // // Update the profile table with the new image path
  // db('profile')
  //   .returning('*') // Returns the inserted row(s)
  //   .update(profileData)
  //   .then(newProfile => {
  //     res.status(201).json({ message: 'Profile created successfully', data: newProfile[0] });
  //   })
  //   .catch(err => {
  //     console.error('Error inserting profile into database:', err);
  //     res.status(500).json({ error: 'Failed to create profile in database' });
  //   });
});

// db('profile').select('*')
//   .then(profiles => console.log(profiles))
//   .catch(err => console.error('Database connection issue:', err));





// Start server
app.listen(process.env.PORT || 3000, () => {
	console.log(`Your website hosted at ${process.env.PORT || 3000}`);
});

  