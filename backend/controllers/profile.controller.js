const upload = require("../config/multerConfig");
const path = require("path");

const {
    getUserProfileModel,
    updateUserProfileModel,
} = require("../models/profile.model");

// get user profile
const getProfile = (req, res) => {
    if (!req.session.user || !req.session.user.email) {
        return res.status(401).json("Please log in to view your profile");
    }

    const userEmail = req.session.user.email;

    getUserProfileModel(userEmail)
        .then((users) => {
            if (users.length > 0) {
                // res.json(users[0]);
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

// update user profile
const updateProfile = (req, res) => {
    if (!req.session.profileId) {
        return res.status(401).json("Unauthorized");
    }

    const userProfileId = req.session.profileId;
    console.log("User ID:", userProfileId);

    const { name, passion } = req.body;
    console.log("Request Body:", { name, passion });

    if (!name || !passion) {
        return res.status(400).json("incorrect form submission");
    }

    updateUserProfileModel(profileId, name, passion)
        .then((updatedProfile) => {
            if (updatedProfile.length > 0) {
                console.log("Updated Profile:", updatedProfile[0]);
                res.json(updatedProfile[0]);
            } else {
                res.status(404).json({ error: "Profile not found" });
            }
        })
        .catch((err) => {
            console.log("Error Updating Profile:", err);
            res.status(400).json({ error: "unable to update profile" });
        });
};

module.exports = {
    getProfile,
    updateProfile,
};
