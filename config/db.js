// config/db.js — MongoDB Atlas-er sathe connect korar function
const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // connect na hole server-i shuru na hok
  }
}

module.exports = connectDB;
