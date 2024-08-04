require("express-router-group");
const express = require("express");
const { validate } = require("kernels/validations");
const middlewares = require("kernels/middlewares");
const router = express.Router({ mergeParams: true });
const customerController = require("modules/customers/controllers/customerController");
const customerValidation = require("modules/customers/validations/customerValidation");
const categoryController = require("modules/category/controllers/categoryController");
const categoryValidation = require("modules/category/validations/categoryValidation");
const productController = require("modules/product/controllers/productController");
const productValidation = require("modules/product/validations/productValidation");
const orderController = require("modules/order/controllers/orderController");
const orderValidation = require("modules/order/validations/orderValidation");
const authController = require("modules/auth/controllers/authController");
const authValidation = require("modules/auth/validations/authValidation");
const cartController = require("modules/cart/controllers/cartController");
const { admin } = require("middlewares/authVerify");
const { uploads } = require("middlewares/multer");

router.group("/auth", (router) => {
  router.post("/sign-in", authController.login);
});

// admin
router.group("/users", admin, (router) => {
  router.delete(
    "/delete/:id",
    validate([authValidation.delete]),
    authController.delete
  );
  router.put(
    "/update",
    validate([authValidation.update]),
    authController.update
  );
  router.post(
    "/create",
    validate([authValidation.create]),
    authController.create
  );
  router.get("/", authController.index);
});

router.group("/customers", admin, (router) => {
  router.delete(
    "/delete",
    validate([customerValidation.delete]),
    customerController.delete
  );
  router.put(
    "/update/:id",
    validate([customerValidation.update]),
    customerController.update
  );
  router.post(
    "/create",
    uploads.single("avatar"),
    validate([customerValidation.create]),
    customerController.create
  );
  router.get("/", customerController.index);
});

router.group("/categories", (router) => {
  router.delete(
    "/delete",
    validate([categoryValidation.delete]),
    categoryController.delete
  );
  router.put(
    "/update/:id",
    validate([categoryValidation.update]),
    categoryController.update
  );
  router.post(
    "/create",
    uploads.single("image"),
    validate([categoryValidation.create]),
    categoryController.create
  );

  router.get("/", categoryController.index);
});

router.group("/products", (router) => {
  router.delete(
    "/delete/:id",
    validate([productValidation.delete]),
    productController.delete
  );
  router.put(
    "/update/:id",
    validate([productValidation.update]),
    productController.update
  );
  router.post(
    "/create",
    validate([productValidation.create]),
    uploads.single("image"),
    productController.create
  );
  router.post("/get", productController.getproduct);
  router.get("/", productController.index);
});

router.group("/orders", admin, (router) => {
  router.put(
    "/update/:id",
    validate([orderValidation.update]),
    orderController.update
  );
  router.delete(
    "/delete/:id",
    validate([orderValidation.delete]),
    orderController.delete
  );
  router.post(
    "/create",
    validate([orderValidation.create]),
    orderController.create
  );
  router.get("/", orderController.index);
});

router.group("/carts", (router) => {
  router.put("/delete-product-cart", cartController.deleteProductCart);
  router.delete("/delete/:id", cartController.delete);
  router.put("/update/:id", cartController.update);
  router.post("/create", cartController.create);
  router.get("/cart", cartController.cart);
  router.get("/", cartController.index);
});

// login customer
router.post("/customer/login", customerController.login);
router.get("/get-user/:_id", customerController.customer);

module.exports = router;
