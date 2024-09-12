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

// const postProfileSkillsModel = (profileId) => {
// 	return db("profile")
// 		.where({ id: profileId })
// 		.first()
// 		.then((result) => {
// 			console.log(result);
// 		});
// };

// const postProfileSkillsModel = (profileId) => {
// 	return db("profile")
// 		.where({ id: profileId })
// 		.first()
// 		.then((result) => {
// 			if (result) {
// 				console.log(result);
// 			} else {
// 				console.log(`No profile found with id ${profileId}`);
// 			}
// 		})
// 		.catch((error) => {
// 			console.error("Error querying the database:", error);
// 		});
// };

const postProfileSkillsModel = async (profileId) => {
	try {
		const result = await db("profile").where({ id: profileId }).first();
		console.log("Result from postProfileSkillsModel:", result);
		return result; // Ensure this is returning the correct value
	} catch (error) {
		console.error("Error in postProfileSkillsModel:", error);
		throw error; // Ensure errors are propagated
	}
};

const getProfileSkillsModel = (profileId) => {
	return db("profile").where({ id: profileId }).first();
};

module.exports = {
	getUserProfileModel,
	updateUserProfileModel,
	getProfileSkillsModel,
	postProfileSkillsModel,
};
