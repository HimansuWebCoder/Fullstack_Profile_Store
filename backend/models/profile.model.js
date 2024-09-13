const db = require("../config/db");

// GET User_Profile_Model
const getUserProfileModel = (userEmail) => {
	return db.select("*").from("profile").where("email", "=", userEmail);
};

// PUT User_Profile_Model
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

// Async way
// const postProfileSkillsModel = async (profileId) => {
// 	try {
// 		const result = await db("profile").where({ id: profileId }).first();
// 		console.log("Result from postProfileSkillsModel:", result);
// 		return result; // Ensure this is returning the correct value
// 	} catch (error) {
// 		console.error("Error in postProfileSkillsModel:", error);
// 		throw error; // Ensure errors are propagated
// 	}
// };

// Sync way
// POST Profile_Skills_Model
const postProfileSkillsModel = (profileId) => {
	return db("profile")
		.where({ id: profileId })
		.first()
		.then((result) => {
			console.log("Result from postProfileSkillsModel:", result);
			return result;
		})
		.catch((error) => {
			console.error(
				"Error in postProfileSkillsModel:",
				error.message || error,
			);
			throw error;
		});
};

// GET Profile_Skills_Model
const getProfileSkillsModel = (profileId) => {
	return db("profile").where({ id: profileId }).first();
};

module.exports = {
	getUserProfileModel,
	updateUserProfileModel,
	getProfileSkillsModel,
	postProfileSkillsModel,
};
