const mongoose = require('mongoose');
const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    importance: {
        type: String,
        required: true
    },
    dueDate: {
        type: String
    },
    dueDateDay: {
        type: String
    },
    dueDateMonth: {
        type: String
    },
    dueDateYear: {
        type: String
    },
    created: {
        type: String
    },
    done: {
        type: Boolean
    }
});
module.exports = mongoose.model('Tasks', taskSchema)