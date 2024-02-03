const mongoose = require('mongoose');

const organisationSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Organisation', organisationSchema);