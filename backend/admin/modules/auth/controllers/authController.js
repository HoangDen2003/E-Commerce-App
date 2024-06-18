const authService = require("modules/auth/services/authService");
const responseUtils = require("utils/responseUtils");

module.exports = {
  index: async (req, res) => {
    const result = await authService.list();
    return responseUtils.ok(res, { admins: result });
  },
  create: async (req, res) => {
    const admin = req.body;
    const result = await authService.createAdmin(admin);
    return responseUtils.ok(res, { admin: result });
  },
  update: async (req, res) => {
    const { id } = req.params;
    const admin = req.body;
    const result = await authService.updateAdmin(id, admin);
    return responseUtils.ok(res, { admin: result });
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const result = await authService.deleteAdmin(id);
    return responseUtils.ok(res, { "Admin deleted": result });
  },
  // login and logout
  login: async (req, res) => {
    const account = req.body;
    const result = await authService.login(account);
    return responseUtils.ok(res, { account: result });
  },
  logout: async (req, res) => {},
};
