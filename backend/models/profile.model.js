const db = require("../config/db");

const getUserProfileModel = () => {
	return db.select("*").from("profile");
};

const updateUserProfileModel = (id, name, passion) => {
	return db("profile").where({ id }).update({ name, passion });
};

module.exports = {
	getUserProfileModel,
	updateUserProfileModel,
};
