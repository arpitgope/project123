const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({
  temperature: Number,
  humidity: Number,
  soil: Number,
  water: Number,
  rain: Number,
  light: Number,
  pesticide: Number,
  pest: Number,
  acc_x: Number,
  acc_y: Number,
  acc_z: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Sensor", sensorSchema);
