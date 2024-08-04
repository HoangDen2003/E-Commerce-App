const Auth = require("models/auth");
const { sign, signRefreshToken } = require("utils/jwtUtils");
const bcrypt = require("bcryptjs");

module.exports = {
  list: async (limit, currentPage) => {
    const result = await Auth.find();

    const pages = Math.ceil(result.length / limit);
    const items = result.slice((currentPage - 1) * limit, currentPage * limit);

    return { pages, items };
  },
  createAdmin: async (admin) => {
    const newPassword = await bcrypt.hash(admin.password, 10);
    admin.password = newPassword;
    const newAdmin = await Auth.create(admin);
    return newAdmin;
  },
  updateAdmin: async (id, admin) => {
    const result = await Auth.updateOne({ _id: id }, { $set: admin });
    return result;
  },
  deleteAdmin: async (id) => {
    const result = await Auth.findByIdAndDelete({ _id: id });
    return result;
  },
  login: async (account) => {
    const user = await Auth.findOne({ email: account.email });
    const isPasswordValid = await bcrypt.compare(
      account.password,
      user.password
    );

    if (!isPasswordValid) throw new Error("Invalid password");

    const result = await Auth.findOne({
      email: account.email,
      password: user.password,
    });

    const access_token = sign(result._id, result.role);
    const rerfresh_token = signRefreshToken(result._id, result.role);

    return {
      user: result,
      access_token: access_token,
      refresh_token: rerfresh_token,
    };
  },
  logout: async () => {},
};
