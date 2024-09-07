const db = require("../config/db");

const uploadImageModel = () => {
	return db("images").returning("*").insert(images);
};

module.exports = {
	uploadImageModel,
};
