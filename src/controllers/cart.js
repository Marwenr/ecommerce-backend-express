const {
  create,
  findAll,
  deleteC,
  update,
  findById,
  findByDate,
} = require("../services/cart.service");

exports.createCart = async (req, res, next) => {
  try {
    const cart = await create(req.body);
    if (!cart) return res.status(400).json({ message: "Failed to add cart" });
    return res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

exports.getAllCarts = async (req, res, next) => {
  try {
    const allCarts = await findAll();
    if (!allCarts)
      return res.status(400).json({ message: "failed to get carts" });
    return res.status(200).json(allCarts);
  } catch (err) {
    next(err);
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const cart = await findById(req.params.id);
    if (!cart) return res.status(400).json({ message: "failed to get cart" });
    return res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

exports.getCartByDate = async (req, res, next) => {
  try {
    const year = req.query.year
    const month = req.query.month
    const day = req.query.day
    const cart = await findByDate(year, month, day);
    if (!cart) return res.status(400).json({ message: "failed to get cart" });
    return res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const cart = await deleteC(req.params.id);
    if (cart.deletedCount === 1)
      return res.status(200).json({ message: "Cart deleted successfully" });
    if (cart.deletedCount === 0)
      return res.status(400).json({ message: "Cart has not been deleted" });
  } catch (err) {
    next(err);
  }
};

exports.updateCart = async (req, res, next) => {
  try {
    const cart = await update(req.params.id, req.body);
    if (!cart)
      return res.status(400).json({ message: "Failed to update cart" });
    return res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};
