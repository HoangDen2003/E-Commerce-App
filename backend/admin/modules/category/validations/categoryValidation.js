const {
  BodyWithLocale,
  ParamWithLocale,
  QueryWithLocale,
} = require("kernels/rules");

const Category = require("models/category");

const categoryValidation = {
  index: [],
  create: [
    // new BodyWithLocale("name").notEmpty().isString().unique(Category, "name"),
    // new BodyWithLocale("description").isString(),
    // new BodyWithLocale("slug").notEmpty().isString(),
    // new BodyWithLocale("totalproducts").notEmpty().isNumberic(),
    // new BodyWithLocale("status").notEmpty().isString(),
  ],
  delete: [
    // new ParamWithLocale("id").exist(Category, "_id")
  ],
  update: [
    // new ParamWithLocale("id").exist(Category, "_id"),
    // new BodyWithLocale("name").notEmpty().isString().exist(Category, "name"),
    // new BodyWithLocale("description").isString(),
    // new BodyWithLocale("slug").notEmpty().isString(),
    // new BodyWithLocale("totalproducts").notEmpty().isNumberic(),
    // new BodyWithLocale("status").notEmpty().isString(),
  ],
};

module.exports = categoryValidation;
