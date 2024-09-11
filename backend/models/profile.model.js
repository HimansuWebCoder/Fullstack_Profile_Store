const db = require("../config/db");

const getUserProfileModel = (userEmail) => {
	return db.select("*").from("profile").where("email", "=", userEmail);
};

const updateUserProfileModel = (id, name, passion) => {
	return db("profile").where({ id }).update({ name, passion }).returning("*");
};

module.exports = {
	getUserProfileModel,
	updateUserProfileModel,
};
