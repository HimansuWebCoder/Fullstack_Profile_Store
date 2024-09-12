const db = require("../../models/db");

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
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("profile")
          .returning("*")
          .insert({
            email: loginEmail[0].email,
            name: name,
            passion: passion,
          })
          .then((user) => {
            // Store profileId in session after successful registration
            req.session.profileId = user[0].id; // Assuming 'id' is the primary key for the profile
            console.log("Session profileId:", req.session.profileId); // Debugging

            // Send back the newly created user
            res.json(user[0]);
          });
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
