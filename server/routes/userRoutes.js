const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const cloudinary = require('../utils/Cloudinary');
const User = require('../models/User');

// POST: Create a new user with multiple images
router.post('/upload', upload.array('images', 5), async function (req, res) {
  try {
    const { name, socialMediaHandle } = req.body;

    // Check if required fields are provided
    if (!name || !socialMediaHandle) {
      return res.status(400).json({ status: false, message: 'Name and social media handle are required' });
    }

    // Upload images to Cloudinary
    const uploadPromises = req.files.map((file) => cloudinary.uploader.upload(file.path));
    const uploadResults = await Promise.all(uploadPromises);

    // Extract Cloudinary URLs from upload results
    const imageUrls = uploadResults.map((result) => result.secure_url);

    // Create new user with uploaded image URLs
    const newUser = new User({
      name,
      socialMediaHandle,
      images: imageUrls,
    });

    // Save user to database
    await newUser.save();

    // Emit real-time event to notify about new user
    const io = req.app.get('io'); // Get the `io` instance from `app.js`
    io.emit('new-user', newUser); // Emit the 'new-user' event with the new user's data

    // Respond with success
    res.status(201).json({
      success: true,
      message: 'User created and images uploaded successfully',
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Error processing request' });
  }
});

// GET: Retrieve all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
