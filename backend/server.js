const express  = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const db = require("./models/db");

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
    // cb(null, file.originalname + '-' + uniqueSuffix)
    cb(null, file.originalname)
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


console.log('Database Password:', process.env.DB_PASSWORD); // Ensure this is a string


// let's try using database
app.post('/profile', upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

   console.log('File uploaded:', req.file);
  console.log('Request body:', req.body);
  
  const imagePath = `/uploads/${req.file.filename}`;
  
  db('profiles')
  .insert({ image: imagePath })
  .onConflict('image') // Replace with your unique column
  .merge() // Update the existing entry if there's a conflict
  .returning('image')
  .then(newProfile => {
    res.status(200).json({ message: 'Profile updated successfully', image: newProfile[0] });
  })
  .catch(err => {
    console.error('Error upserting profile in database:', err.message);
    res.status(500).json({ error: 'Failed to upsert profile in database', details: err.message });
  });

});


// app.get('/profile/:id', (req, res) => {
//   const profileId = req.params.id;

//   db('profiles')
//     .where({ id: profileId })
//     .first() // Fetch only the first matching profile
//     .then(profile => {
//       if (!profile) {
//         return res.status(404).json({ error: 'Profile not found' });
//       }
//       res.json(profile); // Send the profile data including the image path
//     })
//     .catch(err => {
//       console.error('Error fetching profile from database:', err);
//       res.status(500).json({ error: 'Failed to fetch profile from database' });
//     });
// });



// Start server
app.listen(process.env.PORT || 3000, () => {
	console.log(`Your website hosted at ${process.env.PORT || 3000}`);
});

  