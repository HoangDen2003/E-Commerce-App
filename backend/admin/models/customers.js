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
    //   address: [
    //     {
    //       type: Schema.Types.ObjectId,
    //       ref: "Address",
    //     },
    //   ],
    //   cart: {
    //     type: Array,
    //     default: [],
    //   },
    //   wishlist: [
    //     {
    //       type: Schema.Types.ObjectId,
    //       ref: "Product",
    //     },
    //   ],
    status: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", CustomerSchema);
