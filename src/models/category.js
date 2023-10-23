const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
