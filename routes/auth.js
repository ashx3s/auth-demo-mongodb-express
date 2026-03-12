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
    const newUser = new User({ username, password: hashedPassword, role });
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
router.post("/login", async (req, res) => {
  try {
    // get the data from the request username and password
    const { username, password } = req.body;

    // see if the user is in the database
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ message: `${username} not found` });

    // if they are in the db, verify the password with argon2
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    // Gen JWT to and use to verify user roles
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // if successful... say so :)
    res.status(200).json({ message: `${username} Login Successful`, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export our router
module.exports = router;
