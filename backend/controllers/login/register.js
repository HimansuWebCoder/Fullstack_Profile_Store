const db = require("../../config/db");
const { userRegisterModel } = require("../../models/login.model");

const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  const passion = "Add your passion here";
  console.log(req.body);
  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }
  const hash = bcrypt.hashSync(password);
  console.log(hash);
  db.transaction((trx) => {
    userRegisterModel(email, hash, name, passion, trx)
      .then((user) => {
        // Storing session profileId
        req.session.profileId = user[0].id;
        console.log("Session profileId:", req.session.profileId);
        res.json(user[0]);
      })
      .then(trx.commit)
      .catch((err) => {
        console.log("transaction failed", err);
        trx.rollback();
      });
  }).catch((err) => res.status(400).json("unable to register"));
};

module.exports = {
  handleRegister,
};
