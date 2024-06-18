const customerService = require("modules/customers/services/customerService");
const responseUtils = require("utils/responseUtils");

module.exports = {
  index: async (req, res) => {
    const customers = await customerService.list();
    return responseUtils.ok(res, { customers: customers });
  },
  create: async (req, res) => {
    const customer = req.body;
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
    const { id } = req.params;
    const result = await customerService.deleteCustomer(id);
    return responseUtils.ok(res, { "Customer deleted": result });
  },
};
