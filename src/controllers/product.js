const {
  findAllCategories,
  createCategoryFn,
  createProductFn,
  updateProductFn,
  findAllProducts,
  findProductById,
  deleteCategoryFn,
  deleteProductFn,
  findCategoryById,
} = require("../services/product.service");

exports.createCategory = async (req, res, next) => {
  try {
    const category = await createCategoryFn(req.body);
    if (!category)
      return res.status(400).json({ message: "Failed to add category" });
    return res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

exports.getAllCategories = async (req, res, next) => {
  try {
    const allCategories = await findAllCategories();
    if (!allCategories)
      return res.status(400).json({ message: "failed to get categories" });
    return res.status(200).json(allCategories);
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await deleteCategoryFn(req.params.id);
    if (category.deletedCount === 1)
      return res.status(200).json({ message: "Category deleted successfully" });
    if (category.deletedCount === 0)
      return res.status(400).json({ message: "Category has not been deleted" });
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const product = await createProductFn(req.body);
    if (!product)
      return res.status(400).json({ message: "Failed to add product" });
    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await updateProductFn(req.params.id, req.body);
    if (!product)
      return res.status(400).json({ message: "Failed to update product" });
    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await findAllProducts();
    if (!allProducts)
      return res.status(400).json({ message: "failed to get products" });
    return res.status(200).json(allProducts);
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await findProductById(req.params.id);
    if (!product)
      return res.status(400).json({ message: "failed to get product" });
    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await deleteProductFn(req.params.id);
    if (product.deletedCount === 1)
      return res.status(200).json({ message: "Product deleted successfully" });
    if (product.deletedCount === 0)
      return res.status(400).json({ message: "Product has not been deleted" });
  } catch (err) {
    next(err);
  }
};

exports.getProductsSpecificCategory = async (req, res, next) => {
  try {
    const category = await findCategoryById(req.params.id);
    if (!category)
      return res.status(400).json({ message: "failed to get Category" });
    const allProducts = await findAllProducts();
    if (!allProducts)
      return res.status(400).json({ message: "failed to get products" });
    const products = allProducts.filter(
      (product) => product.category === category.title
    );
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
