const validator = require("validator");

function validateLogin(req, res, next) {
  const { name, email, password, phone, address } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (!password) {
    return res.status(400).json({
      message: "Password is required.",
    });
  }

  next();
}

module.exports = validateLogin;
