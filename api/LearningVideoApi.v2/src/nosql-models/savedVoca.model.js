const mongoose = require('mongoose');
const { BaseSchema, whereNotDeleted } = require('./share.models');

const schema = BaseSchema("SavedVocabulary.Collection", {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User.Model',
        required: true
    },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video.Model',
        required: true
    },
    vocabularyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vocabulary.Model',
        required: true
    },
    showedTo: {
        type: Number,
        required: [true, 'showedTo must not be null'],
        min: [0, 'showedTo cannot be negative'],
    },
    showedFrom: {
        type: Number,
        required: [true, 'showedFrom must not be null'],
        min: [0, 'showedFrom cannot be negative'],
    },
    sentence: {
        type: String,
        text: true,
        required: [true, 'sentence must not be null'],
    }
})

schema.pre('find', whereNotDeleted);
schema.pre('findOne', whereNotDeleted);
schema.pre('updateOne', whereNotDeleted);


module.exports = mongoose.model("SavedVocabulary.Model", schema); 