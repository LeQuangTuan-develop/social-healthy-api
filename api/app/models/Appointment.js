const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Appointment = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        doctorId: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        status: {
            type: Number,
            enum: [1,2,3],
        },
        service: {
            type: Number,
            enum: [1,2,3],
        },
        rate: {
            type: Number,
        },
        comment: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Appointment', Appointment)