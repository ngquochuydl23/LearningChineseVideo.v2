const mongoose = require('mongoose');
const { BaseSchema, whereNotDeleted } = require('./share.models');

const schema = BaseSchema("Vocabulary.Collection", {
    originWord: {
        type: String,
        text: true,
        required: [true, 'originWord must not be null']
    },
    vietnameseMean: {
        type: String,
        text: true,
        required: [false, 'vietnameseMean must not be null']
    },
    wordType: {
        type: String,
        text: true,
        required: [false]
    },
    pinyin: {
        type: String,
        text: true,
        required: [false]
    },
    similiarMeaning: {
        type: String,
        text: true,
        required: [false]
    },
    oppositeMeaning: {
        type: String,
        text: true,
        required: [false]
    },
    example: {
        type: String,
        text: true,
        required: [false]
    },
    sinoVietnamese: {
        type: String,
        text: true,
        required: [false]
    },
    level: {
        type: Number,
        default: 1
    }
})

schema.pre('find', whereNotDeleted);
schema.pre('findOne', whereNotDeleted);
schema.pre('updateOne', whereNotDeleted);

module.exports = mongoose.model("Vocabulary.Model", schema); 