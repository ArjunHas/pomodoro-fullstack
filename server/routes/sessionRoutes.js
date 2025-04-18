const express = require("express");
const router = express.Router();
const { createSession, getSessions, createUser } = require("../controllers/sessionController");

router.post("/user", createUser);
router.get("/", getSessions);

module.exports = router;

