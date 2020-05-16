const mongoose = require("mongoose");

module.exports = mongoose.model("orders", {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  message: {
    type: String,
  },
  data: {
    type: Array,
  },
  status: {
    type: String,
    default: "new",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
  },
});
