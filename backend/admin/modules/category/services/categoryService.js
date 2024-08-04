const Category = require("models/category");

module.exports = {
  list: async () => {
    const categories = await Category.find();
    return categories;
  },
  createCategory: async (ctg) => {
    const category = await Category.create(ctg);
    return category;
  },
  updateCategory: async (id, ctg) => {
    const category = await Category.updateOne({ _id: id }, ctg);
    return category;
  },
  deleteCategory: async (ids) => {
    await Category.deleteMany({ _id: { $in: ids } });
  },
};
