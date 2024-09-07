const upload = require("../config/multerConfig");
const {
    getUserProfileModel,
    updateUserProfileModel,
} = require("../models/profile.model");

// get user profile
const getProfile = (req, res) => {
    getUserProfileModel()
        .then((users) => {
            res.json(users);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        });
};

// update user profile
const updateProfile = (req, res) => {
    const { id, name, passion, image } = req.body;
    updateUserProfileModel().then((user) => {
        res.json(user);
    });
};

module.exports = {
    getProfile,
    updateProfile,
};
