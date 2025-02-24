const Order = require("models/order");

module.exports = {
  list: async () => {
    const orders = await Order.find();
    return orders;
  },
  createOrder: async (order) => {
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
};
