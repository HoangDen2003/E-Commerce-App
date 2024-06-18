const orderService = require("modules/order/services/orderService");
const responseUtils = require("utils/responseUtils");

module.exports = {
  index: async (req, res) => {
    const orders = await orderService.list();
    return responseUtils.ok(res, { orders: orders });
  },
  create: async (req, res) => {
    const order = req.body;
    const result = await orderService.createOrder(order);
    return responseUtils.ok(res, { order: result });
  },
  update: async (req, res) => {
    const { id } = req.params;
    const order = req.body;
    const result = await orderService.updateOrder(id, order);
    return responseUtils.ok(res, { order: order });
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const result = await orderService.deleteOrder(id);
    return responseUtils.ok(res, { "Order deleted": result });
  },
};
