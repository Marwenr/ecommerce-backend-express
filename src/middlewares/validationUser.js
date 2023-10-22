const validator = require("validator");

function validateUser(req, res, next) {
  const { name, email, password, phone, address } = req.body;

  if (!name || name.length < 3) {
    return res.status(400).json({
      message: "Name is required and should be at least 3 characters.",
    });
  }

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({
      message: "Password is required and should be at least 6 characters.",
    });
  }

  if (!phone) {
    return res.status(400).json({ message: "Phone Number is required." });
  }

  if (!address.city || !address.street || !address.number || !address.zipcode) {
    return res.status(400).json({ message: "Address is required." });
  }

  next();
}

module.exports = validateUser;
