const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
//     Hashing:

// Hashing is a one-way process that transforms plain text (like a password) into a fixed-length string of characters.
// A good hash function ensures that it's computationally infeasible to reverse the process and obtain the original password.
// Common hash functions include bcrypt, SHA-256, and SHA-3.
// Salting:

// Salting involves adding a unique, random value (salt) to each password before hashing it.
// The salt is then stored along with the hashed password in the database.
// This prevents attackers from using precomputed tables (rainbow tables) to crack passwords since each password has a unique salt.

             //check if username exists
// const Userexists= await User.exists({username:username});
// if(Userexists){ 
//     return res.status(400).send('Email already exists.');
// }


    const user = new User({
      username,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    // console.error(error.code);
    if(error.code==11000) 
    return res.status(400).send({Error : 'Email already exists.'});
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username: user.username }, config.secretKey, {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// router.post('/validate',)
module.exports = router;
