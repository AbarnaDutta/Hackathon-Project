const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    organisation: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Board', boardSchema);