const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const Auth = require('../models/Auth'); // Ensure this path is correct for your Auth model
const router = express.Router();

// Initialize multer for form data handling
const upload = multer(); // Use .single('fieldname') if you have specific fields

// Signup route
router.post('/signup', upload.none(), async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // Check if the user already exists
        const userExists = await Auth.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Auth({ username, email, password: hashedPassword, role });

        // Save the new user
        await newUser.save();

        // Generate a token
        const token = jwt.sign({ _id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        // Respond with the token
        res.json({ token });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await Auth.findOne({ email });
      if (!user) {
          console.log('No user found');
          return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check password (if you want to enable this section)
      // const isMatch = await bcrypt.compare(password, user.password);
      // if (!isMatch) {
      //     console.log('Invalid password');
      //     return res.status(400).json({ message: 'Invalid credentials' });
      // }

      // Generate a token
      const tokenPayload = { _id: user._id, role: user.role };
      console.log('Token Payload:', tokenPayload);

      const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
          expiresIn: '1h',
      });

      // Decode and log the token for debugging
      const decodedToken = jwt.decode(token);
      console.log('Decoded Token:', decodedToken);

      res.json({ token });
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
