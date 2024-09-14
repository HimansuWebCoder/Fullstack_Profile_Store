const upload = require("../config/multerConfig");
const path = require("path");

const {
    getUserProfileModel,
    updateUserProfileModel,
    postProfileSkillsModel,
    getProfileSkillsModel,
} = require("../models/profile.model");

const {
    postSkillsModel,
    getSkillsModel,
    deleteSkillsModel,
} = require("../models/skills.model");

// GET user profile
const getProfile = (req, res) => {
    if (!req.session.user || !req.session.user.email) {
        return res.status(401).json("Please log in to view your profile");
    }

    const userEmail = req.session.user.email;

    getUserProfileModel(userEmail)
        .then((users) => {
            if (users.length > 0) {
                res.json(users[0]);
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

// PUT user profile
const updateProfile = (req, res) => {
    if (!req.session.profileId) {
        return res.status(401).json("Unauthorized");
    }

    const userProfileId = req.session.profileId;
    console.log("User ID:", userProfileId);

    const userEmail = req.session.user.email;
    console.log(userEmail);

    const { name, passion } = req.body;
    console.log("Request Body:", { name, passion });
    console.log(req.session.profileId);

    // if (!name || !passion) {
    //     return res.status(400).json("incorrect form submission");
    // }

    updateUserProfileModel(userEmail, name, passion)
        .then((updatedProfile) => {
            console.log("Update successful:", updatedProfile);
            res.json(updatedProfile[0]);
        })
        .catch((err) => {
            console.error("Error in updateUserProfileModel:", err);
            res.status(400).json({ error: "unable to update profile" });
        });
};

// POST skills
// Async method
// const postProfileSkills = async (req, res) => {
//     const { profileId } = req.params;
//     const { skill } = req.body;
//     try {
//         const userExists = await postProfileSkillsModel(profileId);
//         console.log("user is Exist:", userExists);
//         if (!userExists) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         const [newSkill] = await postSkillsModel(profileId, skill);
//         console.log(newSkill);
//         res.status(201).json(newSkill);
//     } catch (err) {
//         // res.status(500).send(err.message);
//         console.error("Error in postProfileSkills:", err.stack || err); // Log full error
//         res.status(500).json({ error: err.message });
//     }
// };

// sync method
// POST profile-skills
const postProfileSkills = (req, res) => {
    const { profileId } = req.params;
    const { skill } = req.body;

    postProfileSkillsModel(profileId)
        .then((userExists) => {
            console.log("user is Exist:", userExists);
            if (!userExists) {
                return res.status(404).json({ error: "User not found" });
            }
            return postSkillsModel(profileId, skill);
        })
        .then((newSkill) => {
            console.log(newSkill);
            res.status(201).json(newSkill);
        })
        .catch((err) => {
            console.error("Error in postProfileSkills:", err.message || err);
            res.status(500).json({ error: err.message });
        });
};

// GET profile-skills
const getProfileSkills = async (req, res) => {
    const { profileId } = req.params;
    console.log(profileId);
    try {
        const userExists = await getProfileSkillsModel(profileId);
        console.log(userExists);
        if (!userExists) {
            return res.status(404).json({ error: "User not found" });
        }

        const skills = await getSkillsModel(profileId);
        res.status(200).json(skills);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// DELETE profile-skills
const deleteProfileSkills = async (req, res) => {
    const { profileId, skillId } = req.params;
    try {
        const [deletedSkill] = await deleteSkillsModel(skillId, profileId);
        if (!deletedSkill) {
            return res.status(404).send("Skill not found");
        }
        res.status(200).json({ message: "Skill deleted" });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    getProfile,
    updateProfile,
    getProfileSkills,
    deleteProfileSkills,
    postProfileSkills,
};
