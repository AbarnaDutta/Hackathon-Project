const mongoose = require('mongoose');

const ColumnsSchema = new mongoose.Schema({
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
    boardId: {
        type: String,
        required: true,
        trim: true
    },
    organisation: {
        type: String,
        required: true,
        trim: true
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tasks'
    }]
});

module.exports = mongoose.model('Columns', ColumnsSchema);