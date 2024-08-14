const express  = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const db = require("./models/db");

const multer = require('multer');
// const path = require('path');

const fs = require('fs');
const uploadsDir = path.join(__dirname, './uploads/');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('Uploads directory created:', uploadsDir);
} else {
  console.log('Uploads directory exists:', uploadsDir);
}




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




// let's try using database
app.post('/submit-file', upload.single('avatar'), (req, res) => {
  // if (!req.file) {
  //   return res.status(400).json({ error: 'No file uploaded' });
  // }

   console.log('File uploaded:', req.file);
  console.log('Request body:', req.body);
  
  // const imagePath = `/uploads/${req.file.filename}`;
  const images = {
    image: `uploads/${req.file.filename}`
  }

  db('images')
  .returning('*')
  .insert(images)
  .then(data => {
    console.log('Inserted data:', data);
    res.status(200).send('Image path stored in database');
  })
  .catch(error => {
    console.error('Database insert error:', error);
    res.status(500).send('Failed to store image path in database');
  });
});


// Start server
app.listen(process.env.PORT || 3000, () => {
	console.log(`Your website hosted at ${process.env.PORT || 3000}`);
});

  