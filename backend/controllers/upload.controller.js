const path = require("path");

function uploadPost (req, res, db) {
  // if (!req.file) {
  //   return res.status(400).json({ error: 'No file uploaded' });
  // }

   console.log('File uploaded:', req.file);
  console.log('Request body:', req.body);
  
  // const imagePath = `/uploads/${req.file.filename}`;
  const images = {
    image: `./uploads/${req.file.filename}`
  }

  db('images')
  .returning('*')
  .insert(images)
  .then(data => {
    console.log('Inserted data:', data);
    // res.status(200).send('Image path stored in database');
    // res.status(500).sendFile(path.join(__dirname, '../frontend/profile-admin.html'));
    res.status(500).sendFile(path.join(__dirname, '..', '..', 'frontend', 'profile-admin.html'));
  })
  .catch(error => {
    console.error('Database insert error:', error);
    res.status(500).send('Failed to store image path in database');
  });
}

function viewImgPost(req, res, db) {
  db.select('*').from('images')
   .then(photos => {
    res.send(photos);
   })
   .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
}

module.exports = {
  uploadPost,
  viewImgPost,
}
