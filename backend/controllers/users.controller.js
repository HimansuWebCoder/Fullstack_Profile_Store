const {
    getUsersModel,
    updateUsersModel,
    deleteUsersModel,
    getUsersIdModel,
    getUserSkillsModel,
} = require("../models/users.model");

// GET userSkills
function getUserSkills(req, res) {
    getUsersModel()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        });
}

// GET usersSkill Id
function getUserSkillId(req, res) {
    const { id } = req.params;
    getUsersIdModel(id).then((user) => {
        res.status(200).json(user);
    });
}

// PUT userSkill
function updateUserSkill(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    updateUsersModel(id, name).then((user) => {
        res.status(201).json(user);
    });
}

// DELETE userSkill
function deleteUserSkill(req, res) {
    const id = req.params.id;
    deleteUsersModel(id)
        .then(() => res.status(200).send("User deleted successfully"))
        .catch((error) => res.status(500).json({ error }));
}

// GET user skill
function getUserSkill(req, res) {
    const { id } = req.params;
    getUserSkillsModel(id).then((user) => {
        res.status(200).json(user);
    });
}

module.exports = {
    getUserSkills,
    getUserSkillId,
    updateUserSkill,
    deleteUserSkill,
    getUserSkill,
};
