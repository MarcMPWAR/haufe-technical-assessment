const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authRouter = express.Router();

authRouter.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ email, password });
    await newUser.save();

    // Generate a JWT and send it to the client upon successful registration
    const token = generateToken(newUser);
    return res.json({ message: 'Registration successful', token });
  } catch (error) {
    
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login route
authRouter.post('/login', async (req, res, next) => {
  try {
    console.log("Login request received:", req.body); // Log the request body

    const { email, password } = req.body;
    console.log("email: ", email);
    console.log("password: ", password);

    req.body = { username: email, password }; 

    passport.authenticate('local', { session: false }, (err, user, info) => {
      console.log("Passport authentication result:", err, user, info); // Log passport results

      if (err) {
        return next(err);
      }

      if (!user) {
        // Return a 401 status code for authentication failure
        return res.status(401).json({ message: 'Authentication failed' });
      }

      // Generate a JWT and send it to the client upon successful login
      const token = generateToken(user);
      return res.json({ message: 'Login successful', token });
    })(req, res, next, { email, password }); // Pass email and password explicitly

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Function to generate a JWT
function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email, // Add other user information if needed
  };

  const options = {
    expiresIn: '1h', // Set the expiration time as needed
  };

  return jwt.sign(payload, "51d5cb5a9f2f237f5c8d2c1f7d68e2887d7d9f4d1dd5bc7e24f7e75d697f6872", options);
}

module.exports = authRouter;
