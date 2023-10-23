function validateProduct(req, res, next) {
  const { title, description, image, category, price, purchasePrice } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title of product is required." });
  }
  if (!description) {
    return res.status(400).json({ message: "Description is required." });
  }
  if (!image) {
    return res.status(400).json({ message: "Image is required." });
  }

  if (!category) {
    return res.status(400).json({ message: "Category is required." });
  }

  if (!price) {
    return res.status(400).json({ message: "Price is required." });
  }

  next();
}

module.exports = validateProduct;
