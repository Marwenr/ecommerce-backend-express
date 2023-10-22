const {
  createUser,
  validatePassword,
  findAllUser,
  findUser,
  deleteUser,
  updateUser,
} = require("../services/user.service");
require("dotenv").config();
const { signJwt } = require("../util/jwt");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, address, phone } = req.body;
    if (await findUser({ email }))
      return res.status(400).json({ message: "Email already exists" });
    const user = await createUser({
      name,
      email,
      password,
      address,
      phone,
    });
    if (user) {
      delete user.password;
      delete user.email;
      return res.status(201).json({ user, token: signJwt(user) });
    } else return res.status(400).json({ message: "Failed to add User" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await validatePassword(req.body);
    if (!user)
      return res.status(400).json({ message: "Email or Password is invalid" });
    delete user.password;
    delete user.email;
    return res.status(200).json({ user, token: signJwt(user) });
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await findAllUser();
    const users = [];
    allUsers.forEach((user) => users.push(user._id));
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await findUser({ _id: req.params.id });
    if (!user) return res.status(400).json({ message: "User is invalid" });
    delete user._doc.password;
    delete user._doc.email;
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.deleteUserById = async (req, res, next) => {
  try {
    const user = await deleteUser({ _id: req.params.id });
    if (user.deletedCount === 1)
      return res.status(200).json({ message: "User deleted successfully" });
    if (user.deletedCount === 0)
      return res.status(400).json({ message: "The user has not been deleted" });
  } catch (err) {
    next(err);
  }
};

exports.changeUserPassword = async (req, res, next) => {
  try {
    const oldUser = await findUser({ _id: req.params.id });
    if (!oldUser)
      return res
        .status(400)
        .json({ message: `No user for this id ${req.params.id}` });

    comparePw = await bcrypt.compare(req.body.oldPassword, oldUser.password);
    if (!comparePw)
      return res.status(400).json({ message: "Old password is invalid" });

    const user = await updateUser(req.params.id, {
      password: await bcrypt.hash(req.body.password, 11),
      passwordChangedAt: Date.now(),
    });
    if (!user)
      return res
        .status(400)
        .json({ message: `No user for this id ${req.params.id}` });
    res.status(201).json({ message: "Password changed successfully" });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await updateUser(req.params.id, {
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
    });
    if (!user)
      return res
        .status(400)
        .json({ message: `No user for this id ${req.params.id}` });
    res.status(201).json({ message: "User updated successfully" });
  } catch (err) {
    next(err);
  }
};
