const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  pricePer: {
    type: String,
  },
});

module.exports = Item = mongoose.model("item", ItemSchema);
