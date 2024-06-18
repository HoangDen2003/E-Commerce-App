const responseUtils = require("utils/responseUtils");
const productService = require("modules/product/services/productService");

module.exports = {
  index: async (req, res) => {
    const products = await productService.list();
    return responseUtils.ok(res, { products: products });
  },
  create: async (req, res) => {
    const product = req.body;
    const result = await productService.createProduct(product);
    return responseUtils.ok(res, { product: result });
  },
  update: async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    const result = await productService.updateProduct(id, product);
    return responseUtils.ok(res, { product: result });
  },
  delete: async (req, res) => {
    const { id } = req.params;
    const result = await productService.deleteProduct(id);
    return responseUtils.ok(res, { "Product deleted": result });
  },
};
