const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: String,
  species: String,
  breed: String,
  age: Number,
  status: { type: String, enum: ["available", "adopted"], default: "available" }
});

module.exports = mongoose.model("Pet", petSchema);
