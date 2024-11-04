const { read_file, write_file } = require("../Api/api");
const { v4 } = require("uuid");
const BaseError = require("../utils/baseError");

const getProduct = (req, res, next) => {
  try {
    const product = read_file("market.json");
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const addProduct = (req, res, next) => {
  try {
    const product = read_file("market.json");
    product.push({
      id: v4(),
      ...req.body,
    });
    write_file("market.json", product);
    res.json({
      message: "Product added",
    });
  } catch (err) {
    next(err);
  }
};

const get_one = (req, res, next) => {
  try {
    const { id } = req.params;
    const product = read_file("market.json");

    const foundedProduct = product.find((item) => item.id === id);

    if (!foundedProduct) {
      throw BaseError.BadRequest("Product not found");
    }

    res.json(foundedProduct);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = (req, res, next) => {
  try {
    const { id } = req.params;
    const product = read_file("market.json");

    const foundedProduct = product.find((item) => item.id === id);

    if (!foundedProduct) {
      throw BaseError.BadRequest("Product not found");
    }

    product.forEach((item, idx) => {
      if (item.id === id) {
        product.splice(idx, 1);
      }
    });
    write_file("market.json", product);
    res.json({
      message: "Product deleted",
    });
  } catch (err) {
    next(err);
  }
};

const updateProduct = (req, res, next) => {
  try {
    const { id } = req.params;
    const product = read_file("market.json");
    const { title, price, model, guarantee } = req.body;

    const foundedProduct = product.find((item) => item.id === id);

    if (!foundedProduct) {
      throw BaseError.BadRequest("Product not found");
    }

    product.forEach((item) => {
      if (item.id === id) {
        item.title = title ? title : item.title;
        item.price = price ? price : item.price;
        item.model = model ? model : item.model;
        item.guarantee = guarantee ? guarantee : item.guarantee;
      }
    });
    write_file("market.json", product);
    res.json({
      message: "Product updated",
    });
  } catch (err) {
    next(err);
  }
};

const git = (req, res, next) => {
  try {
    res.json({message: "Server is working!"});
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProduct,
  addProduct,
  deleteProduct,
  updateProduct,
  get_one,
  git
};
