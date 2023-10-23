function validateCategory(req, res, next) {

  if (!req.body.title) {
    return res.status(400).json({
      message: "Title of category is required.",
    });
  }

  next();
}

module.exports = validateCategory;
