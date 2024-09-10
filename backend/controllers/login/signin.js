const db = require("../../models/db");

const handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }
  db.select("id", "email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      console.log("Login data:", data); // Debugging statement
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("profile")
          .where("email", "=", email)
          .then((profile) => {
            // Store the user's profile in the session
            req.session.userId = data[0].id;
            req.session.user = {
              name: profile[0].name,
              passion: profile[0].passion,
              email: profile[0].email,
            };
            // res.json(profile[0]);
            res.json({
              message: "Login successfully",
              profile: profile[0],
            });
            console.log("Session data set:", req.session);
            // res.redirect("/profile-admin");
          })
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch((err) => res.status(400).json("wrong credentials"));
};

module.exports = {
  handleSignin,
};
