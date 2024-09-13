const db = require("../config/db");

// User_Register_Model
const userRegisterModel = (email, hash, name, passion, trx) => {
	return trx
		.insert({
			hash: hash,
			email: email,
		})
		.into("login")
		.returning("email")
		.then((loginEmail) => {
			return trx("profile").returning("*").insert({
				email: loginEmail[0].email,
				name: name,
				passion: passion,
			});
		});
};

// User_Login_Model
const userLoginModel = (email) => {
	db.select("id", "email", "hash")
		.from("login")
		.where("email", "=", email)
		.then((result) => {
			console.log("userLogin data:", result);
		});
};

// User_Login_Model2
const userLoginModel2 = (email) => {
	db.select("*")
		.from("profile")
		.where("email", "=", email)
		.then((result) => {
			console.log("userLoginModel2 data:", result);
		});
};

module.exports = {
	userRegisterModel,
	userLoginModel,
	userLoginModel2,
};
