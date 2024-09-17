const mongoose = require('mongoose');
const { BaseSchema, whereNotDeleted } = require('./share.models');

const schema = BaseSchema("Comment.Collection", {
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User.Model',
        required: true
    },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video.Model',
        required: true
    },
    content: {
        type: String,
        required: [true, 'content must not be null'],
        trim: true
    }
})

schema.pre('find', whereNotDeleted);
schema.pre('findOne', whereNotDeleted);
schema.pre('updateOne', whereNotDeleted);


module.exports = mongoose.model("Comment.Model", schema); 