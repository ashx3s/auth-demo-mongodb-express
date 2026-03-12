"use strict";
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const pageRoutes = require("./routes/pages");
// import our router
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// set up the router
app.use("/api/auth", authRoutes);
app.use("/", pageRoutes);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MONGO CONNECTION ERROR: ", error);
    process.exit(1);
  }
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
