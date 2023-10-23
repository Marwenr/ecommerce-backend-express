const Cart = require("../models/cart");

exports.create = (data) => {
  return Cart.create({ userId: data.userId, products: data.products });
};

exports.update = (id, data) => {
  return Cart.findByIdAndUpdate(id, {
    userId: data.userId,
    products: data.products,
    updated_at: Date.now(),
  });
};

exports.findAll = () => {
  return Cart.find();
};

exports.findById = (id) => {
  return Cart.findById(id);
};

exports.findByDate = (year, month, day) => {
  const date = new Date(`${year}-${month}-${day}T00:00:00.000Z`)
  return Cart.find({
    created_at: {
      $gte: date,
      $lt: new Date(date.getTime() + 60 * 60 * 24 * 1000),
    },
  });
};

exports.deleteC = (id) => {
  return Cart.deleteOne({ _id: id });
};
