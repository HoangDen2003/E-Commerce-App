const Cart = require("models/cart");
const Customer = require("models/customers");

module.exports = {
  index: async () => {
    const carts = await Cart.find()
      .populate("product.productID")
      .populate("userID");
    return carts;
  },
  create: async (userID, productID, quantity) => {
    const cart = await Cart.findOne({ userID: userID });
    const body = {
      productID: productID,
      quantity: quantity,
    };
    if (cart) {
      const productIndex = cart.product.findIndex(
        (item) => item.productID.toString() === productID.toString()
      );

      if (productIndex !== -1) {
        // If the product exists in the cart, update the quantity
        cart.product[productIndex].quantity += quantity;
        await cart.save();
      } else {
        // If the product does not exist in the cart, add it
        cart.product.push(body);
        await cart.save();
      }
      return cart;
    } else {
      const cart = await Cart.create({ userID, product: [body] });
      return cart;
    }
  },
  update: async (id, userID, productID, quantity) => {
    const cart = await Cart.findByIdAndUpdate(id, {
      userID,
      productID,
      quantity,
    });
    return cart;
  },
  delete: async (id) => {
    const cart = await Cart.findByIdAndDelete(id);
    return cart;
  },
  deleteProductCart: async (uid, upd) => {
    const cart = await Cart.findOne({ userID: uid });
    if (!cart) return;
    const productIndex = cart.product.findIndex(
      (item) => item._id.toString() === upd.toString()
    );
    cart.product.splice(productIndex, 1);
    await cart.save();
    return cart;
  },
  cart: async (uid) => {
    const cart = await Cart.findOne({ userID: uid }).populate(
      "product.productID"
    );
    return cart;
  },
};
