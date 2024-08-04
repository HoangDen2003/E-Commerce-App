const Product = require("models/product");
const slugify = require("slugify");

module.exports = {
  list: async (query) => {
    let products;
    console.log(query);
    if (query.tag) {
      products = await Product.find({ tags: query.tag })
        .populate("category")
        .exec();
    } else {
      products = await Product.find().populate("category").exec();
    }

    // pagination
    const startIndex = (query.currentPage - 1) * query.limit;
    const endIndex = query.currentPage * query.limit;
    const pages = Math.ceil(products.length / query.limit);
    const data = products.slice(startIndex, endIndex);

    if (data) return { data, pages };
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
  getProduct: async (id) => {
    const product = await Product.findById(id).populate("category").exec();
    return product;
  },
};
