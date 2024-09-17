const { httpOk, http201 } = require('../httpResponse');
const { AppException } = require('../exceptions/AppException');
const _ = require('lodash');
const commentModel = require('../nosql-models/comment.model');
const toObjectId = require('../utils/toObjectId');
const videoModel = require('../nosql-models/video.model');


exports.getLikesByVideoId = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;

    try {
        const comments = await commentModel
            .aggregate([
                {
                    $match: {
                        videoId: toObjectId(req.params.videoId),
                        isDeleted: false
                    }
                },
                {
                    $lookup: {
                        from: 'User.Collection',
                        localField: 'creatorId',
                        foreignField: '_id',
                        as: 'creator'
                    }
                },
                { $unwind: '$creator' },
                {
                    $addFields: {
                        owned: { $eq: ['$creatorId', toObjectId(loggingUserId)] }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        creatorId: 1,
                        videoId: 1,
                        content: 1,
                        createdAt: 1,
                        owned: 1,
                        'creator._id': 1,
                        'creator.fullName': 1,
                        'creator.avatar': 1,
                        'creator.gender': 1,
                    }
                },
                {
                    $sort: {
                        createdAt: -1,
                    }
                }
            ])

        return httpOk(res, comments);
    } catch (error) {
        next(error);
    }
}

exports.addLike = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;
    const {
        commentId,
        content,
        videoId,
    } = req.body;
    try {

        const video = await videoModel.findById(videoId);
        if (!video) {
            throw new AppException("Video not found");
        }

        const comment = new commentModel({
            content,
            creatorId: toObjectId(loggingUserId),
            videoId: toObjectId(videoId)
        });

        await comment.save();

        video.commentCount = video.commentCount + 1;
        await video.save();

        return http201(res, comment, 'Created comment successfully');
    } catch (error) {
        next(error);
    }
}

exports.delLike = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;

    try {
        const comment = await commentModel.findOne({
            creatorId: toObjectId(loggingUserId),
            _id: toObjectId(req.params.commentId)
        });

        if (!comment) {
            throw new AppException("Comment not found");
        }

        const video = await videoModel.findById(comment.videoId);
        if (!video) {
            throw new AppException("Video not found");
        }

        if (video.commentCount > 0) {
            video.commentCount = video.commentCount - 1;
            await video.save();
        }

        comment.isDeleted = true;
        await comment.save();

        return httpOk(res, null, 'Deleted comment successfully');
    } catch (error) {
        next(error);
    }
}

exports.getMyLikeVideo = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;

    try {

        const documents = await commentModel
            .aggregate([
                {
                    $match: {
                        _id: toObjectId(req.params.commentId),
                        isDeleted: false
                    }
                },
                {
                    $lookup: {
                        from: 'User.Collection',
                        localField: 'creatorId',
                        foreignField: '_id',
                        as: 'creator'
                    }
                },
                { $unwind: '$creator' },
                {
                    $addFields: {
                        owned: { $eq: ['$creatorId', toObjectId(loggingUserId)] }
                    }
                },
                {
                    $project: {
                        _id: 1,
                        creatorId: 1,
                        videoId: 1,
                        content: 1,
                        createdAt: 1,
                        owned: 1,
                        'creator._id': 1,
                        'creator.fullName': 1,
                        'creator.avatar': 1,
                        'creator.gender': 1,
                    }
                }
            ])


        if (_.isEmpty(documents)) {
            throw new AppException("Comment not found");
        }

        return httpOk(res, documents[0]);
    } catch (error) {
        next(error);
    }
}