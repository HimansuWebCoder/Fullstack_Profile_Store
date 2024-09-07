const db = require("../config/db");

const getUserProfileModel = () => {
	return db.select("*").from("profile");
};

const updateUserProfileModel = () => {
	return db("profile").where({ id }).update({ name, passion, image });
};

module.exports = {
	getUserProfileModel,
	updateUserProfileModel,
};
