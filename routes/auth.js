"use strict";
const express = require("express");
const argon2 = require("argon2");
const User = require("../models/User");

const router = express.Router();

// POST request so a user can send information to register
router.post("/register", async (req, res) => {
  try {
    // take a user name and password from the client
    const { username, password } = req.body;

    // hash the password with argon2
    const hashedPassword = await argon2.hash(password);

    //create a new user
    const newUser = new User({ username, password: hashedPassword });
    // save the user
    await newUser.save();

    // give a 201 message if it's cool
    res.status(201).json({ message: `New user created! ${username}` });
  } catch (error) {
    // if it goes wrong, log the error to he server
    res.status(500).json({ error: error.message });
  }
});

// POST request so a user can send information to login

// Export our router
module.exports = router;
