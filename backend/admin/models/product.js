const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  slug: {
    type: String,
  },
  picture: {
    type: String,
    default: "picture_1.png",
  },
  price: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    require: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
