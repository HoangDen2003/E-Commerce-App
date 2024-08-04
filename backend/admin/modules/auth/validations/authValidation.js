const {
  BodyWithLocale,
  ParamWithLocale,
  QueryWithLocale,
} = require("kernels/rules");

const options = {
  min: 8,
  max: 16,
};

const Auth = require("models/auth");

const authValidation = {
  index: [],
  create: [
    // new BodyWithLocale("fullname").isString(),
    // new BodyWithLocale("email").isEmail().notEmpty().unique(Auth, "email"),
    // new BodyWithLocale("password").notEmpty().isLength(options),
    // new BodyWithLocale("status").notEmpty().isString(),
  ],
  delete: [],
  update: [
    // new ParamWithLocale("id").exist(Auth, "_id"),
    // new BodyWithLocale("fullname").isString(),
    // new BodyWithLocale("email").isEmail().notEmpty(),
    // new BodyWithLocale("password").notEmpty().isLength(options),
    // new BodyWithLocale("status").notEmpty().isString(),
  ],
};

module.exports = authValidation;
