const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    deadline: {
        type: Date,
    },
    status: {
        type: String,
        required: true,
        enum: ['uncompleted', 'completed'],
        default: 'uncompleted'
    },
    priority: {
        type: String,
        required: true,
        enum: ['very low', 'low', 'medium', 'high', 'very high'],
        default: 'medium'
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Task', TaskSchema);