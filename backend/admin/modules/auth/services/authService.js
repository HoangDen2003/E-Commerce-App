const Auth = require("models/auth");
const { sign, signRefreshToken } = require("utils/jwtUtils");

module.exports = {
  list: async () => {
    const result = await Auth.find();
    return result;
  },
  createAdmin: async (admin) => {
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
    const result = await Auth.findOne({
      email: account.email,
      password: account.password,
    });
    const access_token = sign(result.id, result.role);
    const rerfresh_token = signRefreshToken(result.id, result.role);

    return {
      result,
      access_token: access_token,
      rerfresh_token: rerfresh_token,
    };
  },
  logout: async () => {},
};
