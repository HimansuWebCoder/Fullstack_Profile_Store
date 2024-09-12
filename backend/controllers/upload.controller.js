const path = require("path");
const cloudinary = require("cloudinary").v2;
const { uploadImageModel, viewImageModel } = require("../models/images.model");
const db = require("../models/db");

// cloudinary.config({
//   secure: true,
// });

cloudinary.config({
  cloud_name: "dtiasevyl",
  api_key: "411418114532979",
  api_secret: "Y4GRLW3VVy2_RwrO9TV5YMfHKFI",
  secure: true,
});

// Log the configuration
// console.log(cloudinary.config());
async function uploadPost(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });

    const images = {
      image: result.secure_url, // Store the Cloudinary URL
    };

    // const email = "Rinku@gmail.com"; // In real-world, get this from session or req.user after login
    const email = req.session.user ? req.session.user.email : null;

    // Start a database transaction
    db.transaction(async (trx) => {
      try {
        // Check if the email exists (since this is for a logged-in user, it should)
        const existingProfile = await trx("profile")
          .where({ email: email })
          .first();

        if (!existingProfile) {
          return res.status(404).json({ error: "Profile not found" });
        }

        // Update the image for the logged-in user
        await trx("profile").where({ email: email }).update({
          image: images.image, // Update the image field with Cloudinary URL
        });

        console.log("Profile image updated for email:", email);

        res
          .status(200)
          .sendFile(
            path.join(__dirname, "..", "..", "frontend", "profile-admin.html"),
          );
      } catch (err) {
        console.error("Database update error:", err);
        res.status(500).send("Failed to update image in the database");
      }
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).send("Failed to upload image");
  }
}

function viewImgPost(req, res, db) {
  viewImageModel()
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
