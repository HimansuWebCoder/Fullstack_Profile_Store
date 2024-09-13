const db = require("../../config/db");
const { userLoginModel, userLoginModel2 } = require("../../models/login.model");

const handleSignin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  console.log("Request Body:", req.body);
  console.log("Request Session:", req.session);

  if (!email || !password) {
    return res.status(400).json("Incorrect form submission");
  }
  userLoginModel(email)
    .then((data) => {
      console.log("Login Data:", data);

      const isValid = bcrypt.compareSync(password, data[0].hash);

      if (isValid) {
        return userLoginModel2(email)
          .then((profile) => {
            // Storing profile in session
            req.session.profileId = data[0].id;
            // console.log(req.session.profileId);
            console.log("req.session profile Id:", req.session.profileId);
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
              console.error("Headers already sent, can't redirect.");
            }
          })
          .catch((err) => {
            console.error("Error fetching profile:", err);
            if (!res.headersSent) {
              res.status(400).json("Unable to get profile");
            }
          });
      } else {
        if (!res.headersSent) {
          res.status(400).json("Wrong credentials");
        }
      }
    })
    .catch((err) => {
      console.error("Error querying login table:", err);
      if (!res.headersSent) {
        res.status(400).json("Error querying login table");
      }
    });
};

module.exports = {
  handleSignin,
};
