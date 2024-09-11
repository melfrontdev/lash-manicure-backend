// routes/auth.js
const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcrypt');

// Register endpoint
router.post('/register', async (req, res) => {
  const { nome, email, telefone, senha, cep, street, number, neighborhood, reference, city } = req.body;
  
  try {
    const user = new User({ nome, email, telefone, senha, cep, street, number, neighborhood, reference, city });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('User not found');

    const isMatch = await user.comparePassword(senha);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Forgot Password endpoint (optional, for implementing password reset functionality)
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  // Add logic to handle password reset here
  res.send('Password reset link sent');
});

module.exports = router;
