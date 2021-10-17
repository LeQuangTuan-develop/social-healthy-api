const mongoose = require('mongoose');
let mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Post = new Schema(
    {
        userId: {
            type: String,
            default: null
        },
        doctorId: {
            type: String,
            default: null
        },
        title: {
            type: String,
            max: 500,
        },
        description: {
            type: String,
        },
        img: {
            type: String,
        },
        likes: {
            type: Array,
            default: [],
        },
        reply: {
            type: String,
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

Post.plugin(mongooseDelete,{
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Post', Post)