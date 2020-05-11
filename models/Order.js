const mongoose = require("mongoose");

module.exports = mongoose.model("orders", {
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  phone: {
    type: String,
    required: [true, "phone is required"],
  },
  location: {
    type: String,
    required: [true, "location is required"],
  },
  message: {
    type: String,
  },
  totalPrice: {
    type: Number,
  },
  data: {
    type: Array,
  },
});
