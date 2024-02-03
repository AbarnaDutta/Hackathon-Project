const mongoose = require('mongoose');

const TasksSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true
    },
    columnId: {
        type: String,
        required: true,
        trim: true
    },
    content: {
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

module.exports = mongoose.model('Tasks', TasksSchema);