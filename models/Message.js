const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  textContent: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  file: {
    type: String,
  },
});

module.exports = Profile = mongoose.model("message", ProfileSchema);
