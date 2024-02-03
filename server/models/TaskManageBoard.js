const mongoose = require('mongoose');

const TaskManageBoardSchema = new mongoose.Schema({
    organisation: {
        type: String,
        required: true,
        trim: true
    },
    columns: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Columns'
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tasks'
    }]
});

module.exports = mongoose.model('TaskManageBoard', TaskManageBoardSchema);