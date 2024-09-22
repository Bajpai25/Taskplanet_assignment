// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  socialMediaHandle: {
    type: String,
    required: true,
    trim: true
  },
  images: [{
    type: String,
    required: true
  }]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;