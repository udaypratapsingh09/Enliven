const User = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  console.log("user verification attempted");
  const token = req.cookies.token;
  if (!token) {
    console.log("token not found");
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, data) => {
    if (err) {
      console.log("verification failed");
      console.log(err);
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);
      console.log("token verified");
      if (user) return res.json({ status: true, user: user.name });
      else return res.json({ status: false });
    }
  });
};
