const mongoose = require('mongoose');
const { BaseSchema, whereNotDeleted } = require('./share.models');

const schema = BaseSchema("Video.Collection", {
    title: {
        type: String,
        text: true,
        required: [true, 'title must not be null'],
        minlength: [3, 'title must be at least 3 characters long'],
    },
    description: {
        type: String,
        text: true,
        required: [false]
    },
    viewerCount: {
        type: Number,
        default: 0,
        required: [true, 'viewerCount must not be null'],
        min: [0, 'viewerCount cannot be negative'],
    },
    commentCount: {
        type: Number,
        required: [true, 'commentCount must not be null'],
        min: [0, 'commentCount cannot be negative'],
    },
    likeCount: {
        type: Number,
        default: 0,
        required: [true, 'likeCount must not be null'],
        min: [0, 'likeCount cannot be negative'],
    },
    videoUrl: {
        type: String,
        text: true,
        required: [true, 'videoUrl must not be null'],
    },
    thumbnail: {
        type: String,
        text: true,
        required: [true, 'thumbnail must not be null']
    },
    duration: {
        type: Number,
        default: 0,
        required: [true, 'duration must not be null'],
        min: [0, 'duration cannot be negative'],
    },
    mimeType: {
        type: String,
        text: true,
        required: [true, 'mimeType must not be null']
    },
    level: {
        type: String,
        required: [true, 'level must not be null'],
        enum: ['1', '2', '3', '4', '5'],
    },
    subtitles: {
        type: [{
            url: {
                type: String,
                required: [true, 'Subtitle URL is required'],
            },
            srcLang: {
                type: String,
                required: [true, 'Source language is required'],
                enum: ['zh', 'pinyin', 'vn'],
            },
            isDefault: {
                type: Boolean,
                default: false,
            },
        }],
        _id: false,
        default: undefined
    },
    comments: {
        type: [String],
        default: [],
    },
    topics: {
        type: [String],
        required: [true, 'At least one topic is required'],
    },
})

schema.pre('find', whereNotDeleted);
schema.pre('findOne', whereNotDeleted);
schema.pre('updateOne', whereNotDeleted);


module.exports = mongoose.model("Video.Model", schema); 