const { httpOk, http201 } = require('../httpResponse');
const { AppException } = require('../exceptions/AppException');
const _ = require('lodash');
const toObjectId = require('../utils/toObjectId');
const courseModel = require('../nosql-models/course.model');
const cartModel = require('../nosql-models/cart.model');
const orderModel = require('../nosql-models/order.model');
const { logger } = require('../logger');
const teacherEarningModel = require('../nosql-models/teacherEarning.model');
const adminCommissionModel = require('../nosql-models/adminCommission.model');

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
                    'course.price': 1,
                    'course.authorId': 1
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

        if (cartInfo.length <= 0 || cartInfo[0].lineItems.length <= 0) {
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
        logger.info('Update Cart to bought');

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

        const teacherEarnings = _.map(cartInfo[0].lineItems, lineItem => {
            lineItem.course
            return {
                amount: lineItem.course.price * 70 / 100,
                courseId: lineItem.course._id,
                teacherId: lineItem.course.authorId
            }
        });

        await teacherEarningModel.insertMany(teacherEarnings);

        const adminCommissions = _.map(cartInfo[0].lineItems, lineItem => {
            lineItem.course
            return {
                amount: lineItem.course.price * 30 / 100,
                courseId: lineItem.course._id,
                userId: lineItem.course.authorId
            }
        });

        await adminCommissionModel.insertMany(adminCommissions);
        await order.save();


        return http201(res, order, "Checked out!");
    } catch (error) {
        next(error);
    }
}


exports.getUserOrders = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;
    try {
        const orders = await orderModel.aggregate([
            {
                $match: {
                    isDeleted: false,
                    userId: toObjectId(loggingUserId)
                }
            },
            {
                $lookup: {
                    from: "Course.Collection", // Collection courses
                    localField: "lineItems.courseId", // Trường trong mảng cần join
                    foreignField: "_id", // Trường khóa chính ở collection courses
                    as: "courseDetails", // Tên mảng sau khi join,
                    pipeline: [
                        {
                            $lookup: {
                                from: 'User.Collection',
                                localField: 'authorId',
                                foreignField: '_id',
                                as: 'author'
                            },
                        },
                        { $unwind: '$author' },
                        {
                            $lookup: {
                                from: 'CourseLesson.Collection',
                                let: { courseId: '$_id' },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ['$courseId', '$$courseId'] },
                                                    { $eq: ['$isDeleted', false] }
                                                ]
                                            }
                                        }
                                    },
                                    {
                                        $sort: {
                                            position: 1
                                        }
                                    }
                                ],
                                as: 'lessons'
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                title: 1,
                                subtitle: 1,
                                level: 1,
                                rating: 1,
                                rateCount: 1,
                                studentCount: 1,
                                authorId: 1,
                                lessonCount: 1,
                                totalDuration: 1,
                                price: 1,
                                level: 1,
                                createdAt: 1,
                                lastUpdated: 1,
                                firstLesson: { $arrayElemAt: ["$lessons", 0] },
                                'author._id': 1,
                                'author.fullName': 1,
                                'author.avatar': 1,
                                'author.gender': 1,
                                'author.experience': 1,
                                'author.bio': 1,
                                'author.allowTeaching': 1,
                            }
                        }
                    ]
                }
            },
            {
                $addFields: {
                    lineItems: {
                        $map: {
                            input: "$lineItems", // Duyệt qua từng phần tử trong lineItems
                            as: "item",
                            in: {
                                $mergeObjects: [
                                    "$$item", // Giữ nguyên thông tin từ lineItems
                                    {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$courseDetails", // Duyệt qua courseDetails
                                                    as: "course",
                                                    cond: {
                                                        $eq: ["$$course._id", "$$item.courseId"]
                                                    }
                                                }
                                            },
                                            0
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    courseDetails: 0,
                    'lineItems._id': 0,
                    'lineItems.subtitle': 0,
                    'lineItems.description': 0,
                    'lineItems.studentCount': 0,
                    'lineItems.totalDuration': 0,
                    'lineItems.lessonCount': 0,
                    'lineItems.targets': 0,
                    'lineItems.rateCount': 0,
                    'lineItems.rating': 0,
                    'lineItems.requirements': 0,
                    'lineItems.topics': 0
                }
            },
            {
                $sort: {
                    date: -1
                }
            }
        ]);

        return httpOk(res, orders);
    } catch (error) {
        next(error);
    }
}

exports.getOrderById = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;
    const orderId = req.params.orderId;

    try {
        const orders = await orderModel.aggregate([
            {
                $match: {
                    isDeleted: false,
                    _id: toObjectId(orderId),
                    userId: toObjectId(loggingUserId)
                }
            },
            {
                $lookup: {
                    from: "Course.Collection", // Collection courses
                    localField: "lineItems.courseId", // Trường trong mảng cần join
                    foreignField: "_id", // Trường khóa chính ở collection courses
                    as: "courseDetails", // Tên mảng sau khi join,
                    pipeline: [
                        {
                            $lookup: {
                                from: 'User.Collection',
                                localField: 'authorId',
                                foreignField: '_id',
                                as: 'author'
                            },
                        },
                        { $unwind: '$author' },
                        {
                            $lookup: {
                                from: 'CourseLesson.Collection',
                                let: { courseId: '$_id' },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ['$courseId', '$$courseId'] },
                                                    { $eq: ['$isDeleted', false] }
                                                ]
                                            }
                                        }
                                    },
                                    {
                                        $sort: {
                                            position: 1
                                        }
                                    }
                                ],
                                as: 'lessons'
                            }
                        },
                        {
                            $project: {
                                _id: 1,
                                title: 1,
                                subtitle: 1,
                                level: 1,
                                rating: 1,
                                rateCount: 1,
                                studentCount: 1,
                                authorId: 1,
                                lessonCount: 1,
                                totalDuration: 1,
                                price: 1,
                                level: 1,
                                createdAt: 1,
                                lastUpdated: 1,
                                firstLesson: { $arrayElemAt: ["$lessons", 0] },
                                'author._id': 1,
                                'author.fullName': 1,
                                'author.avatar': 1,
                                'author.gender': 1,
                                'author.experience': 1,
                                'author.bio': 1,
                                'author.allowTeaching': 1,
                            }
                        }
                    ]
                }
            },
            {
                $addFields: {
                    lineItems: {
                        $map: {
                            input: "$lineItems", // Duyệt qua từng phần tử trong lineItems
                            as: "item",
                            in: {
                                $mergeObjects: [
                                    "$$item", // Giữ nguyên thông tin từ lineItems
                                    {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$courseDetails", // Duyệt qua courseDetails
                                                    as: "course",
                                                    cond: {
                                                        $eq: ["$$course._id", "$$item.courseId"]
                                                    }
                                                }
                                            },
                                            0
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    courseDetails: 0,
                    'lineItems._id': 0,
                    'lineItems.subtitle': 0,
                    'lineItems.description': 0,
                    'lineItems.studentCount': 0,
                    'lineItems.totalDuration': 0,
                    'lineItems.lessonCount': 0,
                    'lineItems.targets': 0,
                    'lineItems.rateCount': 0,
                    'lineItems.rating': 0,
                    'lineItems.requirements': 0,
                    'lineItems.topics': 0
                }
            }
        ]);

        return httpOk(res, orders[0]);
    } catch (error) {
        next(error);
    }
}

