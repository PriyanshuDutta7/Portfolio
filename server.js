const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Import routes
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ✅ CORS FIX (Allow both local + deployed frontend)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://frontend-hvjaro6d-priyanshu-duttas-projects.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

app.get("/", (req, res) => {
  res.send("Portfolio Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});