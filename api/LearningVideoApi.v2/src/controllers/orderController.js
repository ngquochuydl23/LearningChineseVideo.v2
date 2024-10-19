const { httpOk, http201 } = require('../httpResponse');
const { AppException } = require('../exceptions/AppException');
const _ = require('lodash');
const toObjectId = require('../utils/toObjectId');
const courseModel = require('../nosql-models/course.model');
const cartModel = require('../nosql-models/cart.model');
const orderModel = require('../nosql-models/order.model');

exports.checkout = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;
    try {
        const cartInfo = await cartModel.aggregate([
            {
                $match: {
                    isDeleted: false,
                    userId: toObjectId(loggingUserId),
                    isBought: false
                }
            },
            {
                $lookup: {
                    from: 'Course.Collection',
                    localField: 'courseId',
                    foreignField: '_id',
                    as: 'course',
                }
            },
            { $unwind: '$course' },
            {
                $project: {
                    isDeleted: 1,
                    userId: 1,
                    isBought: 1,
                    'course._id': 1,
                    'course.price': 1
                }
            },
            {
                $group: {
                    _id: null,
                    totalPrice: {
                        $sum: '$course.price'
                    },
                    lineItems: {
                        $addToSet: '$$ROOT'
                    }
                }
            }
        ]);

        if (cartInfo[0].lineItems.length <= 0) {
            throw new AppException("Cart is empty");
        }

        await cartModel.updateMany({
            userId: loggingUserId,
            isBought: false,
            isDeleted: false
        }, {
            $set: {
                isBought: true
            }
        });

        const order = new orderModel({
            userId: toObjectId(loggingUserId),
            totalPrice: cartInfo[0].totalPrice,
            lineItems: _.map(cartInfo[0].lineItems, item => ({
                userId: toObjectId(loggingUserId),
                courseId: item.course._id,
                price: item.course.price
            })),
            status: 'Completed'
        });

        await order.save();
        return http201(res, order, "Checked out!");
    } catch (error) {
        next(error);
    }
}