// config/database.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected  hey taskplanet !`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error(`Full error object:`, error);
    process.exit(1);
  }
};

module.exports = connectDB;