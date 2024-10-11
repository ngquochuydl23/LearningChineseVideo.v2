const { httpOk, http201 } = require('../httpResponse');
const { AppException } = require('../exceptions/AppException');
const _ = require('lodash');
const commentModel = require('../nosql-models/comment.model');
const toObjectId = require('../utils/toObjectId');
const courseModel = require('../nosql-models/course.model');
const courseLessonModel = require('../nosql-models/course-lesson.model');


exports.getCourses = async (req, res, next) => {
    const { level, search, sortby } = req.query;


    /**
     * sort
     *      - MostPopular
     *      - HighestRated
     *      - Newest
     */
    try {

        const courses = await courseModel
            .aggregate([
                {
                    $match: {
                      isDeleted: false,
                    }
                },
                {
                    $lookup: {
                        from: 'User.Collection',
                        localField: 'authorId',
                        foreignField: '_id',
                        as: 'author'
                    }
                },
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
                { $unwind: '$author' },
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
                        'author.allowTeaching': 1
                    }
                }
            ]);
        return httpOk(res, courses);
    } catch (error) {
        next(error);
    }
}

exports.addCourse = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;
    const {
        title,
        subtitle,
        description,
        targets,
        price,
        level,
        topics,
        requirements,
        lessons
    } = req.body;
    try {


        if (_.isEmpty(req.body)) {
            throw new AppException("Invalid body");
        }

        if (_.isEmpty(targets)) {
            throw new AppException("Course must have at least one target");
        }

        if (_.isEmpty(lessons)) {
            throw new AppException("Course lessons must have at least one item");
        }

        const course = new courseModel({
            title,
            subtitle,
            description,
            targets,
            price,
            authorId: loggingUserId,
            level,
            topics,
            requirements,
            lessonCount: lessons.length,
            totalDuration: _.sumBy(lessons, 'duration')
        });

        const result = await courseLessonModel.insertMany(_.map(lessons, (lesson, i) => ({
            ...lesson,
            position: i,
            courseId: course._id
        })));

        await course.save();

        return http201(res, {
            ...course.toObject(),
            lessons: result
        });
    } catch (error) {
        next(error);
    }
}

exports.editCourse = async (req, res, next) => {
    const courseId = req.params.courseId;
    const loggingUserId = req.loggingUserId;

    const {
        title,
        subtitle,
        description,
        targets,
        price,
        level,
        topics,
        requirements
    } = req.body;
    try {
        if (_.isEmpty(req.body)) {
            throw new AppException("Invalid body");
        }

        if (_.isEmpty(targets)) {
            throw new AppException("Course must have at least one target");
        }

        const course = await courseModel.findOne({
            _id: toObjectId(courseId),
            authorId: toObjectId(loggingUserId)
        });

        course.title = title;
        course.subtitle = subtitle;
        course.description = description;
        course.targets = targets;
        course.price = price;
        course.level = level;
        course.topics = topics;
        course.requirements = requirements;

        await course.save();
        return httpOk(res, course);
    } catch (error) {
        next(error);
    }
}

exports.delCourse = async (req, res, next) => {
    const courseId = req.params.courseId;
    const loggingUserId = req.loggingUserId;

    try {

        const course = await courseModel.findOne({ _id: toObjectId(courseId) });

        if (!course) {
            throw new AppException("Course not found")
        }
        course.isDeleted = true;

        await course.save();
        return httpOk(res, null, "Deleted successfully.");
    } catch (error) {
        next(error);
    }
}

exports.getCourse = async (req, res, next) => {
    const courseId = req.params.courseId;

    try {

        const course = await courseModel
            .aggregate([
                {
                    $match: {
                        _id: toObjectId(courseId)
                    }
                },
                {
                    $lookup: {
                        from: 'User.Collection',
                        localField: 'authorId',
                        foreignField: '_id',
                        as: 'author'
                    }
                },
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
                            }
                        ],
                        as: 'lessons'
                    }
                },
                { $unwind: '$author' },
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
                        targets: 1,
                        topics: 1,
                        subtitle: 1,
                        requirements: 1,
                        lessons: 1,
                        description: 1,
                        'author._id': 1,
                        'author.fullName': 1,
                        'author.avatar': 1,
                        'author.gender': 1,
                        'author.experience': 1,
                        'author.bio': 1,
                        'author.allowTeaching': 1
                    }
                }
            ])
        return httpOk(res, course);
    } catch (error) {
        next(error);
    }
}

exports.addLesson = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;
    const courseId = req.params.courseId;

    try {
        if (_.isEmpty(req.body)) {
            throw new AppException("Invalid body");
        }

        if (_.isEmpty(req.body.lesson)) {
            throw new AppException("Invalid lesson");
        }

        const course = await courseModel.findOne({
            _id: toObjectId(courseId),
            authorId: toObjectId(loggingUserId)
        });

        if (!course) {
            throw new AppException("Course not found")
        }

        const lesson = new courseLessonModel({
            ...req.body.lesson,
            position: course.lessonCount,
            courseId: course._id
        });
        await lesson.save();


        await courseModel.updateOne(
            { _id: course._id },
            {
                $inc: {
                    lessonCount: 1,
                    totalDuration: lesson.duration
                }
            }
        );

        return httpOk(res, null, 'Add lesson successfully');

    } catch (error) {
        next(error);
    }
}

exports.removeLesson = async (req, res, next) => {
    const courseId = req.params.courseId;
    const lessonId = req.params.lessonId;
    const loggingUserId = req.loggingUserId;

    try {
        const course = await courseModel.findOne({
            _id: toObjectId(courseId),
            authorId: toObjectId(loggingUserId)
        });

        if (!course) {
            throw new AppException("Course not found")
        }

        const lesson = await courseLessonModel.findOne({ _id: toObjectId(lessonId) });

        if (!lesson) {
            throw new AppException("Lesson not found");
        }

        if (!lesson.courseId.equals(course._id)) {
            throw new AppException("Lesson not in Course");
        }

        lesson.isDeleted = true;

        await lesson.save();
        await courseModel.updateOne(
            { _id: course._id },
            {
                $inc: {
                    lessonCount: -1,
                    totalDuration: -lesson.duration
                }
            }
        );

        return httpOk(res, null, 'Deleted successfully');

    } catch (error) {
        next(error);
    }
}
