const db = require("../config/db");

const getUsersModel = () => {
	return db.select("*").from("users");
};

const updateUsersModel = (id, name) => {
	return db("users").where({ id }).update({ name });
};

const deleteUsersModel = (id) => {
	return db("users").where({ id }).del();
};

const getUsersIdModel = (id) => {
	return db.select("*").from("users").where({ id: id });
};

const getUserSkillsModel = (id) => {
	return db.select("*").from("users").where({ id: id });
};

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
