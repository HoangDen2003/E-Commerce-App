const orderService = require("modules/order/services/orderService");
const responseUtils = require("utils/responseUtils");

module.exports = {
  index: async (req, res) => {
    const orders = await orderService.list();
    return responseUtils.ok(res, orders);
  },
  create: async (req, res) => {
    const result = await orderService.createOrder(req.body);
    return responseUtils.ok(res, result);
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
  orderByUserID: async (req, res) => {
    const { uid } = req.query;
    const result = await orderService.orderByUserID(uid);
    return responseUtils.ok(res, result);
  },
  orderByID: async (req, res) => {
    const result = await orderService.orderByID(req.query);
    return responseUtils.ok(res, result);
  },
};
