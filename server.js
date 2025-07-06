const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Sensor = require("./Sensor");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB error:", err));

// POST sensor data
app.post("/api/data", async (req, res) => {
  try {
    const entry = new Sensor(req.body);
    await entry.save();
    res.status(201).json({ message: "Data saved!" });
  } catch (err) {
    res.status(500).json({ error: "Save failed" });
  }
});

// GET sensor data
app.get("/api/data", async (req, res) => {
  try {
    const data = await Sensor.find().sort({ timestamp: -1 }).limit(10);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

// Toggle device states
let deviceStates = {
  pump: false,
  light: false,
};
const runSeed = require("./seed");
app.get("/api/seed", async (req, res) => {
  try {
    await runSeed();
    res.send("✅ Seeded 100 entries!");
  } catch (e) {
    res.status(500).send("❌ Seeding failed");
  }
});

app.post("/api/control/:device", (req, res) => {
  const { device } = req.params;
  if (deviceStates.hasOwnProperty(device)) {
    deviceStates[device] = !deviceStates[device];
    res.json({ status: deviceStates[device] });
  } else {
    res.status(400).json({ error: "Unknown device" });
  }
});

app.get("/api/control", (req, res) => {
  res.json(deviceStates);
});

app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`));
