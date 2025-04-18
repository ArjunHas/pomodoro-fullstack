const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();
const SECRET = "yourSecretKey"; // store in .env for real use


router.post("/register", async (req, res) => {

    const {email, password} = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email in use" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({email, password: hashed});
    await user.save();
    res.json({ message: "User registered" });

});

//Login 
router.post("/login", async (req, res) => {

    const {email, password} = req.body;
    const user = await User.findOne({email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: "Invalid credentials"});
    }

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "2h" });
    res.json({ token });
});

module.exports = router; 



