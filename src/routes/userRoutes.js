const express = require("express");
const route = express.Router();
const userController = require("../controllers/user");
const validateUser = require("../middlewares/validationUser");
const { protect, allowedTo} = require("../middlewares/autorisation")

route.get("/users", protect, allowedTo('admin', 'manager'), userController.getAllUsers);
route.get("/user/:id", protect, allowedTo('admin', 'manager'), userController.getUser);
route.delete("/user/:id", protect, allowedTo('admin', 'manager'), userController.deleteUserById);
route.post("/register", validateUser, userController.register);
route.post("/login", userController.login);
route.post("/user/update/:id", protect, allowedTo('admin', 'manager', 'user'), userController.updateUser);
route.post("/user/updatepw/:id", protect, allowedTo('admin', 'manager', 'user'), userController.changeUserPassword);

module.exports = route;

