const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    productID: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    rating: {
      type: Number,
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", ReviewSchema);
