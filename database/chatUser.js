var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatUser = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        lastSeen: { type: Date, default: Date()},
        numMessage: {
            type: Number
        },
        channel: {
            type: String,
            required: true
        },
        isWatching: {
            type: Boolean,
            default: false
        }
    }
);

module.exports = mongoose.model('ChatUser', chatUser);