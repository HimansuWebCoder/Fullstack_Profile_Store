const upload = require("../config/multerConfig");
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

    getUserProfileModel()
        .then((users) => {
            if (users.length > 0) {
                res.json(users[0]);
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
    const { id, name, passion, image } = req.body;
    updateUserProfileModel(id, name, passion).then((user) => {
        res.json(user);
    });
};

module.exports = {
    getProfile,
    updateProfile,
};
