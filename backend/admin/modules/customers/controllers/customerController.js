const customerService = require("modules/customers/services/customerService");
const responseUtils = require("utils/responseUtils");

module.exports = {
  index: async (req, res) => {
    const customers = await customerService.list();
    return responseUtils.ok(res, { customers: customers });
  },
  create: async (req, res) => {
    const customer = req.body;
    customer.avatar = req.file
      ? `http://localhost:5000/${req.file.filename}`
      : "";
    const result = await customerService.createCustomer(customer);
    return responseUtils.ok(res, { customer: result });
  },
  update: async (req, res) => {
    const { id } = req.params;
    const customer = req.body;
    const result = await customerService.updateCustomer(id, customer);
    return responseUtils.ok(res, { customer: result });
  },
  delete: async (req, res) => {
    const { ids } = req.body;
    const result = await customerService.deleteCustomer(ids);
    return responseUtils.ok(res, { "Customer deleted": result });
  },
  login: async (req, res) => {
    const account = req.body;
    const result = await customerService.login(account);
    return responseUtils.ok(res, result);
  },
  customer: async (req, res) => {
    const result = await customerService.customer(req.params);
    return responseUtils.ok(res, result);
  },
};
