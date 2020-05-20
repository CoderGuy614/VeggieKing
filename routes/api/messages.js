const express = require("express");
const router = require("express").Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Message = require("../../models/Message");

// Get all messages
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find();
    if (messages.length > 0) {
      return res.json(messages);
    }
    return res.send("No Messages Found");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Post a new message
// Private Route
router.post(
  "/",
  [
    auth,
    [
      check("to", "Recipient is required").not().isEmpty(),
      check("textContent", "Message Text Must Not be Empty").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      req.body.from = req.user.id;
      const message = await Message.create(req.body);
      return res.json(message);
    } catch (error) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route PUT /api/messages/seen/userId
// @ desc Update the seen property for all of the a users messages
// @ access Private

router.put("/seen", auth, async (req, res) => {
  try {
    let messages = await Message.find({ to: req.user.id });
    if (messages) {
      updated = await Message.updateMany(
        { to: req.user.id },
        { seen: true },
        { new: true }
      );
      return res.json(updated);
    }
    return res.send("Messages not found");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route PUT /api/messages/seen/admin/userId
// @ desc Update the seen property of messages to an admin from specified user
// @ access Private

router.put("/seen/admin/:userId", auth, async (req, res) => {
  try {
    let messages = await Message.find({
      to: req.user.id,
      from: req.params.userId,
    });
    if (messages) {
      updated = await Message.updateMany(
        { to: req.user.id, from: req.params.userId },
        { seen: true },
        { new: true }
      );
      return res.json(updated);
    }
    return res.send("Messages not found");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
