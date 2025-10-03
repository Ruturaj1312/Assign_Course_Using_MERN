let express = require("express");
let router = express.Router();
let User = require("../models/userSchma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secreteKey = "#^@##^%^$rjg$^$43poper2309**?";

// <---------------Register----------------->
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ status: false, message: "All filds are require" });

    //if existingUser is already present in db
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res
        .status(400)
        .json({ status: false, message: "Email already register..." });

    //if new user
    //for the password don't show / 10 is hast number
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashPassword });
    await newUser.save();

    return res
      .status(201)
      .json({ status: true, message: "Register successful" });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, message: "Server error", error: error.message });
  }
});

//<----------------Login---------------------->

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ status: false, message: "All filds are require" });

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid credential..." });
    }
    //jwt token for user

    const token = jwt.sign({ id: user._id, email: user.email }, secreteKey, {
      expiresIn: "1hr",
    });

    return res
      .status(201)
      .json({ status: true, message: "Login successful", token: token });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, message: "Server error", error: error.message });
  }
});

//<----------------Profile-------------------->

router.post("/profile", async (req, res) => {
  try {
    let token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(400).json({ status: false, message: "Access Denide" });
    }

    jwt.verify(token, secreteKey, async (err, decode) => {
      const user = await User.findById(decode?.id);

      //  If user is not present ------->
      if (!user) {
        return res.status(400).json({
          status: false,
          message: "Invalid token",
        });
      }

      //User data pass using userData obj---------->
      const userData = {
        id: user?.id,
        name: user?.name,
        email: user?.email,
      };

      return res
        .status(201)
        .json({ status: true, message: "Profile data", data: userData });
    });
  } catch (error) {
    return res
      .status(400)
      .json({ status: false, message: "Server error", error: error.message });
  }
});

module.exports = router;
