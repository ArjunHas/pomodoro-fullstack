const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({

    mode: {
        type: String,
        enum: ["focus", "break"],
        required: true,
    },
    duration: {
        type: Number, 
        required: true,
    }, 
    createdAt: {
        type: Date, 
        default: Date.now,
    }
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;