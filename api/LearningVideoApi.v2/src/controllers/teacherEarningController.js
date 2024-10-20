const { httpOk, http201 } = require('../httpResponse');
const { AppException } = require('../exceptions/AppException');
const _ = require('lodash');
const toObjectId = require('../utils/toObjectId');
const courseModel = require('../nosql-models/course.model');
const cartModel = require('../nosql-models/cart.model');
const teacherEarningModel = require('../nosql-models/teacherEarning.model');

exports.getTeacherEarnings = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;
    try {
        const earnings = await teacherEarningModel.aggregate([
            {
                $match: {
                    isDeleted: false,
                    teacherId: toObjectId(loggingUserId)
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
            {
                $unwind: '$course'
            },
            {
                $project: {
                    'course.studentCount': 0,
                    'course.rateCount': 0,
                    'course.rating': 0,
                    'course.subtitle': 0,
                    'course.description': 0,
                    'course.targets': 0,
                    'course.topics': 0,
                    'course.requirements': 0,
                    'course.totalDuration': 0,
                    'course.level': 0
                }
            }
        ]);

        return httpOk(res, earnings)
    } catch (error) {
        next(error);
    }
}


exports.getStatistics = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;
    try {
        const earnings = await teacherEarningModel.aggregate([
            {
                $match: {
                    isDeleted: false,
                    teacherId: toObjectId(loggingUserId)
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
            {
                $unwind: '$course'
            },
            {
                $project: {
                    'course.studentCount': 0,
                    'course.rateCount': 0,
                    'course.rating': 0,
                    'course.subtitle': 0,
                    'course.description': 0,
                    'course.targets': 0,
                    'course.topics': 0,
                    'course.requirements': 0,
                    'course.totalDuration': 0,
                    'course.level': 0
                }
            }
        ]);

        return httpOk(res, earnings)
    } catch (error) {
        next(error);
    }
}