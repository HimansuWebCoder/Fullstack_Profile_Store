const db = require("../config/db");

// UPLOAD Image_Model
const uploadImageModel = (images) => {
	return db("images").returning("*").insert(images);
};

// VIEW Image_Model
const viewImageModel = () => {
	return db.select("*").from("images");
};

module.exports = {
	uploadImageModel,
	viewImageModel,
};
