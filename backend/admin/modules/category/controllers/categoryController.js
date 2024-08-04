const responseUntils = require("utils/responseUtils");
const categoryService = require("modules/category/services/categoryService");

module.exports = {
  index: async (req, res) => {
    const categories = await categoryService.list();
    return responseUntils.ok(res, categories);
  },
  create: async (req, res) => {
    const category = req.body;
    const result = await categoryService.createCategory(category);
    return responseUntils.ok(res, result);
  },
  update: async (req, res) => {
    const { id } = req.params;
    const category = req.body;
    const result = await categoryService.updateCategory(id, category);
    return responseUntils.ok(res, { category: result });
  },
  delete: async (req, res) => {
    const category = await categoryService.deleteCategory(req.body.ids);
    return responseUntils.ok(res, category);
  },
};
