const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    birth_date: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['M', 'F'],
        default: 'F',
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Employee", employeeSchema);