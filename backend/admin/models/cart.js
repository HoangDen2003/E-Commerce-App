const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({});

module.exports = mongoose.Schema("Cart", CartSchema);
