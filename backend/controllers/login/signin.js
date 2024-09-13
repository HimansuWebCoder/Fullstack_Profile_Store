const db = require("../../config/db");

const handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  console.log("Request Body:", req.body);
  console.log("Session:", req.session);
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }
  db.select("id", "email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      console.log("Login data:", data); // Debugging statement
      console.log("User ID:", data[0].id);
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("profile")
          .where("email", "=", email)
          .then((profile) => {
            // Storing profile in session
            req.session.profileId = data[0].id;
            console.log(req.session.profileId);
            req.session.user = {
              name: profile[0].name,
              passion: profile[0].passion,
              email: profile[0].email,
              image: profile[0].image,
            };

            console.log(req.session.user);
            // res.json(profile[0]);
            // res.json({
            //   message: "Login successfully",
            //   profile: profile[0],
            // });
            console.log("Session data set:", req.session);
            // res.redirect("/profile-admin");
            // Redirect after setting session

            if (!res.headersSent) {
              res.json({
                success: true,
                redirectTo: "/profile-admin",
              });
            } else {
              console.error("Headers already sent, cannot redirect.");
            }
          })
          .catch((err) => {
            console.error("Error fetching profile:", err);
            if (!res.headersSent) {
              res.status(400).json("unable to get user");
            }
          });
      } else {
        if (!res.headersSent) {
          res.status(400).json("wrong credentials");
        }
      }
    })
    .catch((err) => {
      console.error("Error querying login table:", err);
      if (!res.headersSent) {
        res.status(400).json("error querying login table");
      }
    });
};

module.exports = {
  handleSignin,
};
