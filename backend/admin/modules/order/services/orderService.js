const Order = require("models/order");

module.exports = {
  list: async () => {
    const orders = await Order.find({}).populate("uid").populate("products");
    return orders;
  },
  createOrder: async (order) => {
    // console.log(order.products);
    const newOrder = await Order.create(order);
    return newOrder;
  },
  updateOrder: async (id, order) => {
    const result = await Order.updateOne({ _id }, { $set: order });
    return result;
  },
  deleteOrder: async (id) => {
    const result = await Order.findByIdAndDelete({ _id: id });
    return result;
  },
  orderByUserID: async (uid) => {
    const order = await Order.find({ uid: uid })
      .populate("products")
      .populate("uid");
    return order;
  },
  orderByID: async (id) => {
    const order = await Order.findById(id)
      .populate("products.productID")
      .populate("uid");
    return order;
  },
};
