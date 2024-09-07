const db = require("../config/db");

const getUsersModel = () => {
	db.select("*").from("users");
};

const updateUsersModel = () => {
	db("users").where({ id }).update({ name });
};

const deleteUsersModel = () => {
	db("users").where({ id }).del();
};

const getUsersIdModel = () => {
	db.select("*").from("users").where({ id: id });
};

const getUsersSkills = () => {
	db.select("*").from("users").where({ id: id });
};

const postUserSectionModel = () => {
	db("users").returning("*").insert({ id: id, name: name });
};

module.exports = {
	getUsersModel,
	updateUsersModel,
	deleteUsersModel,
	getUsersIdModel,
	getUsersSkills,
	postUserSectionModel,
};
