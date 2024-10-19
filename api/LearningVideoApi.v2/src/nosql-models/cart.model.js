const mongoose = require('mongoose');
const { BaseSchema, whereNotDeleted } = require('./share.models');

const schema = BaseSchema("Cart.Collection", {
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
    isBought: {
        type: Boolean,
        default: false
    }
})

schema.pre('find', whereNotDeleted);
schema.pre('findById', whereNotDeleted);
schema.pre('findOne', whereNotDeleted);
schema.pre('updateOne', whereNotDeleted);


module.exports = mongoose.model("Cart.Model", schema); 