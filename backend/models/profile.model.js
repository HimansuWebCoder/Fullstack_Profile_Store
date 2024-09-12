const db = require("../config/db");

const getUserProfileModel = (userEmail) => {
	return db.select("*").from("profile").where("email", "=", userEmail);
};

const updateUserProfileModel = (profileId, name, passion) => {
	console.log(
		"Updating profile with ID",
		profileId,
		"Name:",
		name,
		"Passion:",
		passion,
	);
	return db("profile")
		.where({ id: profileId })
		.update({ name, passion })
		.returning("*");
};

module.exports = {
	getUserProfileModel,
	updateUserProfileModel,
};
