const {
  BodyWithLocale,
  ParamWithLocale,
  QueryWithLocale,
} = require("kernels/rules/index");

const Order = require("models/order");
const Customer = require("models/customers");

module.exports = {
  index: [],
  create: [
    // new BodyWithLocale("customerID").notEmpty().exist(Customer, "_id"),
    // new BodyWithLocale("quantity").notEmpty().isNumberic(),
    // new BodyWithLocale("price").notEmpty().isNumberic(),
    // new BodyWithLocale("payment").notEmpty().isString(),
    // new BodyWithLocale("status").notEmpty().isString(),
  ],
  update: [
    new ParamWithLocale("id").exist(Order, "_id"), // check id order
    new BodyWithLocale("customerID").notEmpty().exist(Customer, "_id"),
    new BodyWithLocale("quantity").notEmpty().isNumberic(),
    new BodyWithLocale("price").notEmpty().isNumberic(),
    new BodyWithLocale("payment").notEmpty().isString(),
    new BodyWithLocale("status").notEmpty().isString(),
  ],
  delete: [
    new ParamWithLocale("id").exist(Order, "_id"), // check id exist
  ],
};
