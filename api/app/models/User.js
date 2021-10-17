const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: {
            type: String,
            require: true,
            max: 100,
        },
        coverPicture: {
            type: String,
            default: ''
        },
        followers: {
            type: Array,
            default: [],
        },
        followings: {
            type: Array,
            default: [],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        description: {
            type: String,
            max: 50,
        },
        phone: {
            type: String,
            require: true,
            min: 10,
            max: 10,
        },
        email: {
            type: String,
            require: true,
            max: 50,
        },
        password: {
            type: String,
            require: true,
            min: 5,
        },
        gender: {
            type: Number,
            enum: [1, 2, 3],
        },
        birthday: {
            type: Date,
        },
        profilePicture: {
            type: String,
            default: '',
        },
        city: {
            type: String,
            max: 50,
        },
        from: {
            type: String,
            max: 50,
        },
        relationship: {
            type: Number,
            enum: [1, 2, 3],
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

module.exports = mongoose.model('User', User)