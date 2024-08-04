const {
  BodyWithLocale,
  ParamWithLocale,
  QueryWithLocale,
} = require("kernels/rules/index");

const Product = require("models/product");

module.exports = {
  index: [],
  create: [
    // new BodyWithLocale("name").notEmpty().isString(),
    // new BodyWithLocale("description").notEmpty().isString(),
    // new BodyWithLocale("price").notEmpty(),
    // new BodyWithLocale("quantity").notEmpty(),
  ],
  update: [
    // new ParamWithLocale("id").exist(Product, "_id"), // check id exist
    // new BodyWithLocale("name").notEmpty().isString(),
    // new BodyWithLocale("price").notEmpty().isNumberic(),
    // new BodyWithLocale("quantity").notEmpty().isNumberic(),
  ],
  delete: [
    // new ParamWithLocale("id").exist(Product, "_id"), // check id exist
  ],
};
