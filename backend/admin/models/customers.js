const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema(
  {
    fullname: {
      type: String,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    status: {
      type: String,
      require: true,
    },
    totalspend: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", CustomerSchema);
