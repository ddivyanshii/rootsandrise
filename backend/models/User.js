const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['buyer','seller'], required: true }, // buyer or seller
  name: { type: String },          // seller full name (optional for buyer)
  phone: { type: String },         // seller phone (optional for buyer)
  business: { type: String },      // seller business/artisan type (optional for buyer)
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);