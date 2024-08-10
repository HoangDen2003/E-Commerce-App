const responseUtils = require("utils/responseUtils");
const cartService = require("../services/cartService");
const cart = require("models/cart");

module.exports = {
  index: async (req, res) => {
    const carts = await cartService.index();
    return responseUtils.ok(res, carts);
  },
  create: async (req, res) => {
    const { userID, productID, quantity } = req.body;
    const result = await cartService.create(userID, productID, quantity);
    return responseUtils.ok(res, result);
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { userID, productID, quantity } = req.body;
    const cart = await cartService.update(id, userID, productID, quantity);
    return responseUtils.ok(res, cart);
  },
  delete: async (req, res) => {
    const cart = await cartService.delete(req.query);
    return responseUtils.ok(res, cart);
  },
  deleteProductCart: async (req, res) => {
    const { uid, upd } = req.body;
    const cart = await cartService.deleteProductCart(uid, upd);
    return responseUtils.ok(res, cart);
  },
  cart: async (req, res) => {
    const { uid } = req.query;
    try {
      const cart = await cartService.cart(uid);
      return responseUtils.ok(res, cart);
    } catch (error) {
      return responseUtils.error(res, error);
    }
  },
};
