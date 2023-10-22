const jwt = require("jsonwebtoken");
require("dotenv").config();

const ACCESS_TOKEN_PRIVATE_KEY = process.env.ACCESS_TOKEN_PRIVATE_KEY;

exports.signJwt = ({ _id, name, role }) => {
  return jwt.sign({ _id, name, role }, ACCESS_TOKEN_PRIVATE_KEY, {
    expiresIn: "10y",
  });
};

exports.verifyJwt = ( token, ACCESS_TOKEN_PRIVATE_KEY ) => {
  return jwt.verify(token, ACCESS_TOKEN_PRIVATE_KEY);
}
