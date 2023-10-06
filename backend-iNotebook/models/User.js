const mongoose = require('mongoose');

// Schema for creating user (template)
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unqiue: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    }
  });

module.exports = mongoose.model('user', userSchema);