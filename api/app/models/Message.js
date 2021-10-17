const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Message = new Schema(
    {
        conversationId: {
            type: String,
            required: true,
        },
        senderId: {
            type: String,
        },
        text: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Message', Message)