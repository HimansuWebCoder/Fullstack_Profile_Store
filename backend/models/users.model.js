const db = require("../config/db");

const getUsersModel = () => {
	return db.select("*").from("users");
};

const updateUsersModel = () => {
	return db("users").where({ id }).update({ name });
};

const deleteUsersModel = () => {
	return db("users").where({ id }).del();
};

const getUsersIdModel = () => {
	return db.select("*").from("users").where({ id: id });
};

const getUsersSkills = () => {
	return db.select("*").from("users").where({ id: id });
};

const postUserSectionModel = () => {
	return db("users").returning("*").insert({ id: id, name: name });
};

module.exports = {
	getUsersModel,
	updateUsersModel,
	deleteUsersModel,
	getUsersIdModel,
	getUsersSkills,
	postUserSectionModel,
};
