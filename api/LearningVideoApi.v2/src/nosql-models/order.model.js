const mongoose = require('mongoose');
const { BaseSchema, whereNotDeleted } = require('./share.models');
const moment = require('moment');

const schema = BaseSchema("Order.Collection", {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User.Model',
        required: true
    },
    totalPrice: {
        type: Number,
        required: [true, 'totalPrice must not be null']
    },
    date: {
        type: Date,
        default: moment()
    },
    lineItems: {
        type: [{
            courseId: mongoose.ObjectId,
            cartId: mongoose.ObjectId,
            price: Number
        }],
    },
    status: {
        type: String,
        required: [true, 'status must not be null'],
        enum: ['Completed', 'Pending', 'Non-completed'],
    },
});

schema.pre('find', whereNotDeleted);
schema.pre('findById', whereNotDeleted);
schema.pre('findOne', whereNotDeleted);
schema.pre('updateOne', whereNotDeleted);


module.exports = mongoose.model("Order.Model", schema); 