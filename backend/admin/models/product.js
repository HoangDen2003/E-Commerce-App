const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  slug: {
    type: String,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  stock: {
    type: Boolean,
  },
  stars: {
    type: Number,
  },
  tags: {
    type: String,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
