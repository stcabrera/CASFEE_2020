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
    created: {
        type: String
    }
});
module.exports = mongoose.model('Tasks', taskSchema)