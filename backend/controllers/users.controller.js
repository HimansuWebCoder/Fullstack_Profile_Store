const {
    getUsersModel,
    updateUsersModel,
    deleteUsersModel,
    getUsersIdModel,
    getUsersSkills,
} = require("../models/users.model");

// get users
function getUsers(req, res, db) {
    getUsersModel()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        });
}

// get users id
function getUsersId(req, res, db) {
    const { id } = req.params;
    getUsersIdModel().then((user) => {
        res.status(200).json(user);
    });
}

// update users
function updateUser(req, res, db) {
    const { id } = req.params;
    const { name } = req.body;
    updateUsersModel().then((user) => {
        res.status(201).json(user);
    });
}

// delete users
function deleteUser(req, res, db) {
    // const { id } = req.params // this works because req.params is an object {id: "123"} like this and destructuring use
    // const { id } = req.params.id // Incorrect,because req.params.id is a string not an object req.params.id = "123"
    // const { id } = Number(req.params.id) // this also works because if you want number id instead of string id
    // const id = Number(req.params.id) // correct
    // const { id } = req.params;
    // const { id } = req.body; // this is incorrect because when user set id and send request then this is correct so ..
    const id = req.params.id;
    deleteUsersModel()
        .then(() => res.status(200).send("User deleted successfully"))
        .catch((error) => res.status(500).json({ error }));
}

// get users skill
function getUserSkill(req, res, db) {
    const { id } = req.params;
    getUsersSkills().then((user) => {
        res.status(200).json(user);
    });
}

module.exports = {
    getUsers,
    getUsersId,
    updateUser,
    deleteUser,
    getUserSkill,
};
