const Customers = require("models/customers");

module.exports = {
  list: async () => {
    const customers = await Customers.find({});
    return customers;
  },
  createCustomer: async (customer) => {
    const newCustomer = await Customers.create(customer);
    return newCustomer;
  },
  updateCustomer: async (id, customer) => {
    const newCustomer = await Customers.updateOne(
      { _id: id },
      { $set: customer }
    );
    return newCustomer;
  },
  deleteCustomer: async (id) => {
    const customer = await Customers.findOneAndDelete({ _id: id });
    return customer;
  },
};
