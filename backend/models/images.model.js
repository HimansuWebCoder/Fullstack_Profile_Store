const db = require("../config/db");

const uploadImageModel = () => {
	db("images").returning("*").insert(images);
};

module.exports = {
	uploadImageModel,
};
