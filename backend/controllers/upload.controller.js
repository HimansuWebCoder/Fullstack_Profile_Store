// const path = require("path");

// function uploadPost (req, res, db) {
//   // if (!req.file) {
//   //   return res.status(400).json({ error: 'No file uploaded' });
//   // }

//    console.log('File uploaded:', req.file);
//   console.log('Request body:', req.body);

//   // const imagePath = `/uploads/${req.file.filename}`;
//   const images = {
//     image: `./uploads/${req.file.filename}`
//   }

//   db('images')
//   .returning('*')
//   .insert(images)
//   .then(data => {
//     console.log('Inserted data:', data);
//     // res.status(200).send('Image path stored in database');
//     // res.status(500).sendFile(path.join(__dirname, '../frontend/profile-admin.html'));
//     res.status(500).sendFile(path.join(__dirname, '..', '..', 'frontend', 'profile-admin.html'));
//   })
//   .catch(error => {
//     console.error('Database insert error:', error);
//     res.status(500).send('Failed to store image path in database');
//   });
// }

// function viewImgPost(req, res, db) {
//   db.select('*').from('images')
//    .then(photos => {
//     res.send(photos);
//    })
//    .catch(error => {
//             console.error(error);
//             res.status(500).json({ error: 'Internal Server Error' });
//         });
// }

// module.exports = {
//   uploadPost,
//   viewImgPost,
// }

const path = require("path");
const cloudinary = require("cloudinary").v2;
const { uploadImageModel } = require("../models/images.model");

// cloudinary.config({
//   secure: true,
// });

cloudinary.config({
  cloud_name: "dtiasevyl", // Replace with your Cloudinary cloud name
  api_key: "411418114532979", // Replace with your Cloudinary API key
  api_secret: "Y4GRLW3VVy2_RwrO9TV5YMfHKFI", // Replace with your Cloudinary API secret
  secure: true, // Use HTTPS URLs
});

// Log the configuration
console.log(cloudinary.config());

async function uploadPost(req, res) {
  try {
    // If no file is uploaded, return an error
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("File uploaded:", req.file);
    console.log("Request body:", req.body);

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });
    // Save the Cloudinary URL to the database
    const images = {
      image: result.secure_url, // Store the Cloudinary URL
    };
    console.log(images.image);

    // Insert the image URL into the database
    uploadImageModel()
      .then((data) => {
        console.log("Inserted data:", data);
        res
          .status(200)
          .sendFile(
            path.join(__dirname, "..", "..", "frontend", "profile-admin.html"),
          );
      })
      .catch((error) => {
        console.error("Database insert error:", error);
        res.status(500).send("Failed to store image path in the database");
      });
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    res.status(500).json({ error: "Failed to upload image to Cloudinary" });
  }
}

function viewImgPost(req, res, db) {
  db.select("*")
    .from("images")
    .then((photos) => {
      res.send(photos);
    })
    .catch((error) => {
      console.error("Database select error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
}

module.exports = {
  uploadPost,
  viewImgPost,
};
