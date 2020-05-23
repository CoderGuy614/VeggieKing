const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const request = require("request");
const config = require("config");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Order = require("../../models/Order");
const Message = require("../../models/Message");

// @route GET api/profile/me
// @desc Get current users profile
// @access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    });

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile.populate("user", ["name", "avatar"]));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/profile
// @desc Create or update a user profile
// @access Private

router.post(
  "/",
  [
    auth,
    [
      check("location", "Location is required").not().isEmpty(),
      check("phone", "Phone is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { location, phone, deliveryNotes } = req.body;
    const profileFields = {};
    profileFields.user = req.user.id;
    profileFields.location = location;
    profileFields.phone = phone;
    profileFields.deliveryNotes = deliveryNotes;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET api/profile/
// @desc Get all profiles
// @access Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user");
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & orders (currently logged in user)
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove the users orders
    await Order.deleteMany({ user: req.user.id });
    // Remove the users profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove the messages to and from the user
    await Message.deleteMany({
      $or: [{ to: req.user.id }, { from: req.user.id }],
    });
    // Remove the user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Put - Update a profile
// Private
router.put("/:profileId", auth, async (req, res) => {
  try {
    let profile = await Profile.findById(req.params.profileId);
    if (profile) {
      profile = await Profile.findByIdAndUpdate(
        { _id: req.params.profileId },
        req.body,
        {
          new: true,
        }
      );
      return res.json(profile);
    }
    return res.send("Profile not found");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
