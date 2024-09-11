const db = require("../config/db");

const getUserProfileModel = (userEmail) => {
	return db.select("*").from("profile").where("email", "=", userEmail);
};

const updateUserProfileModel = (userId, name, passion) => {
	return db("profile")
		.where({ id: userId })
		.update({ name, passion })
		.returning("*");
};

module.exports = {
	getUserProfileModel,
	updateUserProfileModel,
};
