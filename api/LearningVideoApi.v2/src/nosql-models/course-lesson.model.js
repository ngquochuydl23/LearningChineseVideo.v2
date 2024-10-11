const mongoose = require('mongoose');
const { BaseSchema, whereNotDeleted } = require('./share.models');

const schema = BaseSchema("CourseLesson.Collection", {
    title: {
        type: String,
        required: [true, 'title must not be null'],
        trim: true
    },
    description: {
        type: String,
        required: [false],
        trim: true
    },
    thumbnail: {
        type: String,
        required: [true, 'thumbnail must not be null']
    },
    videoUrl: {
        type: String,
        required: [true, 'videoUrl must not be null']
    },
    duration: {
        type: Number,
        default: 0,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course.Model',
        required: true
    },
    position: {
        type: Number,
        required: [true, 'position must not be null']
    },
    excerciseCount: {
        type: Number,
        default: 0
    }
})

schema.pre('find', whereNotDeleted);
schema.pre('findOne', whereNotDeleted);
schema.pre('updateOne', whereNotDeleted);


module.exports = mongoose.model("CourseLesson.Model", schema); 