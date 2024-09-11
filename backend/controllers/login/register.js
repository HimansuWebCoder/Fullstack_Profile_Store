const db = require("../../models/db");

const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  const passion = "Web Development";
  const image =
    "https://res.cloudinary.com/dtiasevyl/image/upload/v1725802853/IMG_20240814_191245.jpg";
  console.log(req.body);
  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }
  const hash = bcrypt.hashSync(password);
  console.log(hash);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx
          .select("id") // Assuming you need to select the image ID
          .from("images")
          .where({ image: image })
          .limit(1); // Limit to 1 image
      })
      .then((images) => {
        if (!images || images.length === 0) {
          throw new Error("Image not found");
        }
        const imageId = images[0].id;
        return trx("profile").returning("*").insert({
          email: loginEmail[0].email,
          name: name,
          passion: passion,
          image: imageId, // Add the image ID to the profile
        });
      })
      .then((profile) => {
        return trx
          .commit() // Commit should be returned to properly handle the promise
          .then(() => {
            res.json(profile[0]); // Send response after commit
          });
      })
      .catch((err) => {
        console.log("transaction failed", err);
        trx.rollback();
      });
  }).catch((err) => res.status(400).json("unable to register"));
};

module.exports = {
  handleRegister,
};
