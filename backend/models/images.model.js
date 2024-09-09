const db = require("../config/db");

const uploadImageModel = (images) => {
	return db("images").returning("*").insert(images);
};

const viewImageModel = () => {
	return db.select("*").from("images");
};

module.exports = {
	uploadImageModel,
	viewImageModel,
};
