const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route POST api/users
// @desc Register a user
// @access Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, isAdmin } = req.body;

    try {
      let user = await User.findOne({ email });

      // See if the user exists already
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
        // .json({ errors: [{ msg: "User already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
        isAdmin,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route GET api/users
// @desc Get all registered users
// @access Public

router.get("/", async (req, res) => {
  try {
    let users = await User.find();
    if (users.length === 0 || !users) {
      return res.status(400).json({ errors: [{ msg: "No Users Found" }] });
    } else {
      return res.status(200).json(users);
    }
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route GET ADMIN api/users
// @desc Get all registered users
// @access Public

router.get("/admins", async (req, res) => {
  try {
    let admins = await User.find({ isAdmin: true });
    if (admins.length === 0 || !admins) {
      return res.status(400).json({ errors: [{ msg: "No admins Found" }] });
    } else {
      adminIds = admins.map((el) => el._id);
      return res.status(200).json(adminIds);
    }
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
