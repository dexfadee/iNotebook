const mongoose = require('mongoose');

// Template for storing notes
const notesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: String,
        default: Date.now
    }
  });

module.exports = mongoose.model('notes', notesSchema);