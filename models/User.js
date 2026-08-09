// models/User.js — ekjon user-er structure/schema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true }, // hash kora thakbe, plain text na
  role: { type: String, enum: ['tenant', 'owner', 'admin'], default: 'tenant' }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
