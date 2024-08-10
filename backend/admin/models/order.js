const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    uid: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    products: [
      {
        productID: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          require: true,
        },
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
      default: "pending",
    },
    method: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
      default: "undelivered",
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
