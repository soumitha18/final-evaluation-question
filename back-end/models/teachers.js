const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    school_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255,
    },
    gender: {
        type: String,
        required: true,
        max: 8,
        min: 4,
    },
    age: {
        type: Number,
        required: true,
        min: 2
    },
    classes: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model('Teacher', teacherSchema)