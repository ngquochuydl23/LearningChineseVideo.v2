const { httpOk, http201 } = require('../httpResponse');
const { AppException } = require('../exceptions/AppException');
const _ = require('lodash');
const toObjectId = require('../utils/toObjectId');
const courseModel = require('../nosql-models/course.model');
const cartModel = require('../nosql-models/cart.model');

exports.addToCart = async (req, res, next) => {
    const { courseId } = req.body;
    const loggingUserId = req.loggingUserId;
    try {
        if (_.isEmpty(req.body)) {
            throw new AppException("Invalid body. Request body is empty");
        }

        if (!courseId) {
            throw new AppException("Invalid body. Missing courseId");
        }

        const course = await courseModel.findById(courseId);

        if (!course) {
            throw new AppException("Course not found");
        }

        const availableCart = await cartModel.findOne({
            courseId: course._id,
            userId: loggingUserId,
            isBought: false
        });

        if (availableCart) {
            throw new AppException("You've already add to cart");
        }

        const cart = new cartModel({ userId: loggingUserId, courseId: course._id, isBought: false });
        await cart.save();
        return httpOk(res, cart);
    } catch (error) {
        next(error);
    }
}



exports.getCarts = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;
    try {


        const carts = await cartModel
            .aggregate([
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
                    $unwind: '$course'
                },
            ])
        return httpOk(res, carts);
    } catch (error) {
        next(error);
    }
}

exports.removeCart = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;
    const cartId = req.params.cartId;

    try {
        const cart = await cartModel.findOne({
            _id: toObjectId(cartId),
            userId: toObjectId(loggingUserId)
        });
        if (!cart) {
            throw new AppException("Cart not found");
        }

        cart.isDeleted = true;
        await cart.save();

        return httpOk(res, null, "Deleted cart successfully");
    } catch (error) {
        next(error);
    }
}
