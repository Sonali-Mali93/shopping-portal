const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const router = require("./route/route");

app.use(express.json());
app.use("/", router);

try {
  mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB!");
} catch (error) {
  console.error("Error connecting to MongoDB:", error.message);
}

app.listen(3000, (err) => {
  if (err) throw err;
  console.log("Server running on port", 3000);
});