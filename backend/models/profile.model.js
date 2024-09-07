const db = require("../config/db");

const getUserProfile = () => {
	return db.select("*").from("profile");
};

const updateUserProfile = () => {
	return db("profile").where({ id }).update({ name, passion, image });
};

module.exports = {
	getUserProfile,
	updateUserProfile,
};
