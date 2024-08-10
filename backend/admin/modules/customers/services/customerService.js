const Customers = require("models/customers");
const { sign, signRefreshToken } = require("utils/jwtUtils");
const bcrypt = require("bcryptjs");

module.exports = {
  list: async () => {
    const customers = await Customers.find({}).populate("wishlist");
    return customers;
  },
  createCustomer: async (customer) => {
    customer.password = await bcrypt.hash(customer.password, 10);
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
  deleteCustomer: async (ids) => {
    await Customers.deleteMany({ _id: { $in: ids } });
  },
  login: async (account) => {
    const user = await Customers.findOne({ email: account.email });
    // const isPasswordValid = await bcrypt.compare(
    //   account.password,
    //   user.password
    // );

    // if (!isPasswordValid) throw new Error("Invalid password");

    const result = await Customers.findOne({
      email: account.email,
      password: user.password,
    });

    const access_token = sign(result._id, "user");
    const rerfresh_token = signRefreshToken(result._id, "user");

    return {
      user: result,
      access_token: access_token,
      refresh_token: rerfresh_token,
    };
  },
  customer: async (id) => {
    const customer = await Customers.findOne(id).populate("wishlist");
    return customer;
  },
  addWishList: async (body) => {
    const customer = await Customers.findOne({ _id: body.uid });
    const productIndex = customer.wishlist.findIndex(
      (item) => item == body.pid
    );
    if (productIndex === -1) {
      customer.wishlist.push(body.pid);
      await customer.save();
      return { customer, msg: "Added WishList Success" };
    } else {
      customer.wishlist.splice(productIndex, 1);
      await customer.save();
      return { customer, msg: "Removed WishList Success" };
    }
  },
};
