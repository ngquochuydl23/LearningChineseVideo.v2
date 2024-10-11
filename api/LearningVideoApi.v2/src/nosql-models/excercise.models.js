const mongoose = require('mongoose');
const { BaseSchema, whereNotDeleted } = require('./share.models');

const schema = BaseSchema("Excercise.Collection", {
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User.Model',
        required: true
    },
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson.Model',
        required: true
    },
    type: {
        type: String,
        required: [true, 'type must not be null']
    },
    fillInBlank: {
        type: {
            question: {
                type: String,
                required: [true, 'question is required'],
            },
            answers: {
                type: [String],
                required: [true, 'answers is required'],
            },
            rightAwswerPosition: {
                type: Number,
                default: 0
            }
        },
        _id: false,
        required: false
    },
    imageQuestion: {
        type: {
            question: {
                type: String,
                required: [true, 'question is required'],
            },
            imageUrl: {
                type: String,
                required: [true, 'imageUrl is required'],
            },
            answers: {
                type: [String],
                required: [true, 'answers is required'],
            },
            rightAwswerPosition: {
                type: Number,
                default: 0
            }
        },
        _id: false,
        required: false
    },
    audioQuestion: {
        type: {
            question: {
                type: String,
                required: [true, 'question is required'],
            },
            audioUrl: {
                type: String,
                required: [true, 'audioUrl is required'],
            },
            answers: {
                type: [String],
                required: [true, 'answers is required'],
            },
            rightAwswerPosition: {
                type: Number,
                default: 0
            }
        },
        _id: false,
        required: false
    },
    sentenceOrderQuestion: {
        type: {
            sentenceParts: [{ type: String, required: true }],
            correctOrder: [{ type: String, required: true }]
        },
        _id: false,
        required: false
    },
    synonymAntonymQuestion: {
        type: {
            question: {
                type: String,
                required: [true, 'question is required'],
            },
            answers: {
                type: [String],
                required: [true, 'answers is required'],
            },
            rightAwswerPosition: {
                type: Number,
                default: 0
            }
        },
        _id: false,
        required: false
    },
    grammaQuestion: {
        type: {
            question: {
                type: String,
                required: [true, 'question is required'],
            },
            answers: {
                type: [String],
                required: [true, 'answers is required'],
            },
            rightAwswerPosition: {
                type: Number,
                default: 0
            }
        },
        _id: false,
        required: false
    }
})

schema.pre('find', whereNotDeleted);
schema.pre('findOne', whereNotDeleted);
schema.pre('updateOne', whereNotDeleted);


module.exports = mongoose.model("Excercise.Model", schema); 