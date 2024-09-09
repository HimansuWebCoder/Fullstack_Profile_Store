const db = require("../config/db");

const uploadImageModel = (images) => {
	return db("images").returning("*").insert(images);
};

const viewImageModel = () => {
	returndb.select("*").from("images");
};

module.exports = {
	uploadImageModel,
	viewImageModel,
};
