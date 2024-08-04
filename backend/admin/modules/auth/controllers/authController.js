const authService = require("modules/auth/services/authService");
const responseUtils = require("utils/responseUtils");

module.exports = {
  index: async (req, res) => {
    const { limit, currentPage } = req.query;
    const result = await authService.list(limit, currentPage);
    return responseUtils.ok(res, result);
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
    try {
      const account = req.body;
      const result = await authService.login(account);
      return responseUtils.ok(res, result);
    } catch (error) {
      return responseUtils.error(res, error);
    }
  },
  logout: async (req, res) => {},
};
