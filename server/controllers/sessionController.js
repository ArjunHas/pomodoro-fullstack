const Session = require("../models/Session");
const bcrypt = require('bcrypt');
const User = require("../models/User");
console.log("🚨 Session model:", Session);

const createSession = async (req, res) => {
    try {
      const newSession = new Session(req.body);
      const saved = await newSession.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const createUser = async (req, res) => {
    const {username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password);
    await User.create({username, hashedPassword});
    res.status(200).send("User created");

  }
  
  const getSessions = async (req, res) => {
    try {
      const sessions = await Session.find().sort({ createdAt: -1 });
      res.json(sessions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

module.exports = { createSession, getSessions, createUser};
