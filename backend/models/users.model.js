const db = require("../config/db");

// GET Users_Model
const getUsersModel = () => {
	return db.select("*").from("users");
};

// PUT Users_Model
const updateUsersModel = (id, name) => {
	return db("users").where({ id }).update({ name });
};

// DELETE Users_Model
const deleteUsersModel = (id) => {
	return db("users").where({ id }).del();
};

// GET Users_Model
const getUsersIdModel = (id) => {
	return db.select("*").from("users").where({ id: id });
};

// GET User_Skill_Model
const getUserSkillsModel = (id) => {
	return db.select("*").from("users").where({ id: id });
};

// POST User_Section_Model
const postUserSectionModel = (id, name) => {
	return db("users").returning("*").insert({ id: id, name: name });
};

module.exports = {
	getUsersModel,
	updateUsersModel,
	deleteUsersModel,
	getUsersIdModel,
	getUserSkillsModel,
	postUserSectionModel,
};
