const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
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
});

module.exports = mongoose.model("Category", CategorySchema);
