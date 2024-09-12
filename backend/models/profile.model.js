const db = require("../config/db");

const getUserProfileModel = (userEmail) => {
	return db.select("*").from("profile").where("email", "=", userEmail);
};

const updateUserProfileModel = (email, name, passion) => {
	console.log(
		"Updating profile with ID",
		email,
		"Name:",
		name,
		"Passion:",
		passion,
	);
	return db("profile")
		.where({ email: email })
		.update({ name, passion })
		.returning("*")
		.then((result) => {
			console.log("Update result:", result);
			return result;
		})
		.catch((err) => {
			console.error("Database query error:", err);
			throw err;
		});
};

module.exports = {
	getUserProfileModel,
	updateUserProfileModel,
};
