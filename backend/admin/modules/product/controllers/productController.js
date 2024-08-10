const responseUtils = require("utils/responseUtils");
const productService = require("modules/product/services/productService");

module.exports = {
  index: async (req, res) => {
    const products = await productService.list(req.query);
    return responseUtils.ok(res, products);
  },
  create: async (req, res) => {
    const product = req.body;
    product.image = req.file.filename
      ? `http://localhost:5000/${req.file.filename}`
      : "";
    product.price = parseFloat(product.price);
    product.quantity = parseInt(product.quantity);
    product.stock = product.stock ? true : false;
    const result = await productService.createProduct(product);
    return responseUtils.ok(res, result);
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
  getproduct: async (req, res) => {
    const product = await productService.getProduct(req.body.id);
    return responseUtils.ok(res, product);
  },
};
