const validator = require("validator");

function validateCart(req, res, next) {
  const { userId, products } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "userId is required." });
  }
  if (!Array.isArray(products) || products.length === 0) {
    return res
      .status(400)
      .json({
        message: "products is required and should be a non-empty array.",
      });
  }

  for (const product of products) {
    if (!product.productId || !product.quantity) {
      return res
        .status(400)
        .json({
          message:
            "Each product in the 'products' array should have 'productId' and 'quantity'.",
        });
    }
  }

  next();
}

module.exports = validateCart;
