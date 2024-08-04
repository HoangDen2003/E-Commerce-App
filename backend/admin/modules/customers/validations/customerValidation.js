const {
  BodyWithLocale,
  QueryWithLocale,
  ParamWithLocale,
} = require("kernels/rules/index");

const CustomerModel = require("models/customers");

const optionsPassWord = {
  min: 8,
};

const optionsPhone = {
  min: 9,
  max: 10,
};

module.exports = {
  index: [],
  update: [
    // new ParamWithLocale("id").exist(CustomerModel, "_id"),
    // new BodyWithLocale("fullname").isString(),
    // new BodyWithLocale("email").isEmail().isString().notEmpty(),
    // new BodyWithLocale("password")
    //   .isString()
    //   .notEmpty()
    //   .isLength(optionsPassWord),
    // new BodyWithLocale("avatar").isString(),
    // new BodyWithLocale("phone").notEmpty().isString().isLength(optionsPhone),
    // new BodyWithLocale("status").notEmpty().isString(),
  ],
  create: [
    // new BodyWithLocale("fullname").isString(),
    // new BodyWithLocale("email")
    //   .unique(CustomerModel, "email")
    //   .isEmail()
    //   .isString()
    //   .notEmpty(),
    // new BodyWithLocale("password")
    //   .isString()
    //   .notEmpty()
    //   .isLength(optionsPassWord),
    // new BodyWithLocale("avatar").isString(),
    // new BodyWithLocale("phone").notEmpty().isString().isLength(optionsPhone),
    // new BodyWithLocale("status").notEmpty().isString(),
  ],
  delete: [],
};
