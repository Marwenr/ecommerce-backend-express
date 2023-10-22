const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  role: {
    type: String,
    enum: ["user", "manager", "admin"],
    default: "user",
  },
  passwordChangedAt: {
    type: Date,
    default: Date.now(),
  },
  address: {
    city: String,
    street: String,
    number: Number,
    zipcode: String
  },
  phone: {
    type: String,
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 11);
  next();
});

const User = mongoose.model("user", userSchema);

module.exports = User;
