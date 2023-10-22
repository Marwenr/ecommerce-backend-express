const User = require("../models/user");
const { verifyJwt } = require("../util/jwt");
require("dotenv").config();

const ACCESS_TOKEN_PRIVATE_KEY = process.env.ACCESS_TOKEN_PRIVATE_KEY;

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      message: "Please login to access this route",
    });
  }

  const decoded = verifyJwt(token, ACCESS_TOKEN_PRIVATE_KEY);
  const currentUser = await User.findById(decoded._id);
  if (!currentUser) {
    return res.status(401).json({
      message: "The user of this token does no exist",
    });
  }

  req.user = currentUser;
  next();
};

exports.allowedTo =
  (...roles) =>
  async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        message: "You are not allowed to access this route",
      });
    }
    next();
  };
