const mongoose = require('mongoose');
const { BaseSchema, whereNotDeleted } = require('./share.models');

const schema = BaseSchema("AdminCommission.Collection", {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User.Model',
        required: true
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course.Model',
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

schema.pre('find', whereNotDeleted);
schema.pre('findById', whereNotDeleted);
schema.pre('findOne', whereNotDeleted);
schema.pre('updateOne', whereNotDeleted);


module.exports = mongoose.model("AdminCommission.Model", schema); 