const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: { type: String, require: true },
  resnumber: { type: String, require: true },
  amount: { type: Number, require: true },
  payment: { type: Boolean, default: false },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
