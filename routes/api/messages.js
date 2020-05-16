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

module.exports = router;
