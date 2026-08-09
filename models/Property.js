// models/Property.js — ekta property listing-er structure/schema
const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  loc: { type: String, required: true },       // e.g. "Mirpur", "Dhanmondi"
  type: { type: String, required: true },       // e.g. "Apartment", "Shop"
  rent: { type: Number, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  facilities: { type: [String], default: [] },  // e.g. ["WiFi", "Generator"]
  verified: { type: Boolean, default: false },
  details: { type: mongoose.Schema.Types.Mixed, default: {} }, // category-specific fields
  photo: { type: String, default: null },        // URL (Cloudinary etc.)
  video: { type: String, default: null },
  whatsapp: { type: String, default: null }
}, { timestamps: true }); // createdAt / updatedAt auto add hobe

module.exports = mongoose.model('Property', propertySchema);
