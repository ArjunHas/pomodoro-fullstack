const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

console.log("index.js is running...");

const sessionRoutes = require("./routes/sessionRoutes");
const authRoutes = require("./routes/authRoutes");


const app = express(); //
const session = require('express-session') 
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

//app.use(cors());
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/sessions", sessionRoutes);
app.use("/api", authRoutes);

const PORT = process.env.PORT;

console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error(" MongoDB connection error:", err);
});


app.listen(PORT, () => {console.log(`🚀 Server running on port ${PORT}`);});
