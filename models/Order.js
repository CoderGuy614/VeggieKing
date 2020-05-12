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
  date: {
    type: Date,
    default: Date.now,
  },
});
