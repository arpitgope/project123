// seed.js

require('dotenv').config();
const mongoose = require('mongoose');
const SensorData = require('./Sensor.js');

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ Connected to MongoDB");
  seedData(); // Start seeding after connection
}).catch(err => {
  console.error("❌ MongoDB connection error:", err);
});

function getRandomFloat(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

// ✅ Generate 100 random sensor records
async function seedData() {
  try {
    const entries = [];

    for (let i = 0; i < 100; i++) {
      entries.push({
        temperature: getRandomFloat(20, 40),
        humidity: getRandomFloat(30, 90),
        soil: getRandomFloat(300, 800),
        water: getRandomFloat(0, 1),
        rain: getRandomFloat(0, 1),
        light: getRandomFloat(100, 1000),
        pesticide: getRandomFloat(0, 1),
        pest: getRandomFloat(0, 1),
        acc_x: getRandomFloat(-10, 10),
        acc_y: getRandomFloat(-10, 10),
        acc_z: getRandomFloat(-10, 10),
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 100000000)) // Random past time
      });
    }

    await SensorData.insertMany(entries);
    console.log("🌾 Inserted 100 random sensor entries!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}
