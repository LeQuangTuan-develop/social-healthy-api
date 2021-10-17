const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Category = new Schema(
    {
        categoryname: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        color: {
            type: String,
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Category', Category)