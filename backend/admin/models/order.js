const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    customerID: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    productsID: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    quantity: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    payment: {
      type: String,
      require: true,
    },
    method: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
