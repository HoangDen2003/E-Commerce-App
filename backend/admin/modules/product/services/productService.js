const Product = require("models/product");
const slugify = require("slugify");

module.exports = {
  list: async () => {
    const products = await Product.find();
    return products;
  },
  createProduct: async (product) => {
    const slug = slugify(product.name, {
      lower: true,
      strict: true,
    });
    product.slug = slug;
    const result = await Product.create(product);
    return result;
  },
  updateProduct: async (id, product) => {
    const result = await Product.updateOne({ _id: id }, { $set: product });
    return result;
  },
  deleteProduct: async (id) => {
    const result = await Product.findByIdAndDelete({ _id: id });
    return result;
  },
};
