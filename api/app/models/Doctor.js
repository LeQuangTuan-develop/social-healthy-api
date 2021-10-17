const mongoose = require('mongoose');
let mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const Doctor = new Schema(
    {
        _id: {
            type: Number,
        },
        email: { 
            type: String
        },
        password: { 
            type: String
        },
        name: {
            type: String,
            required: true,
        },
        followers: {
            type: Array,
            default: [],
        },
        followings: {
            type: Array,
            default: [],
        },
        starAveraged: {
            type: Number,
            default : 0,
        },
        starNum: {
            type: Number,
            default : 0,
        },
        exp: {
            type: Number,
        },
        img: {
            type: String,
        },
        imgName: {
            type: String,
        },
        online: {
            type: Boolean,
            default: false,
        },
        cate_id: {
            type: String,
            required: true,
        },
        introduce: {
            type: String
        },
        skill: {
            type: String,
        }
    },
    {   
        _id: false,
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

Doctor.plugin(AutoIncrement);

Doctor.plugin(mongooseDelete,{
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Doctor', Doctor)