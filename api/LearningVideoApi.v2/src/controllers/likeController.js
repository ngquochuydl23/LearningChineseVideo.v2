const { httpOk, http201 } = require('../httpResponse');
const { AppException } = require('../exceptions/AppException');
const _ = require('lodash');
const toObjectId = require('../utils/toObjectId');
const videoModel = require('../nosql-models/video.model');
const likeModel = require('../nosql-models/like.model');


exports.getLikedVideos = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;

    try {
        const likes = await likeModel
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

        return httpOk(res, likes);
    } catch (error) {
        next(error);
    }
}

exports.getLikesByVideoId = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;

    try {
        const likes = await likeModel
            .aggregate([
                {
                    $match: {
                        creatorId: toObjectId(loggingUserId),
                        isDeleted: false
                    }
                },
                {
                    $lookup: {
                        from: 'Video.Collection',
                        localField: 'videoId',
                        foreignField: '_id',
                        as: 'video'
                    }
                },
                { $unwind: '$video' },
                {
                    $project: {
                        _id: 1,
                        creatorId: 1,
                        videoId: 1,
                        createdAt: 1,
                        owned: 1,
                        'video._id': 1,
                        'video.title': 1,
                        'video.description': 1,
                        'video.thumbnail': 1,
                        'video.mimeType': 1,
                        'video.level': 1,
                        'video.topics': 1,
                        'video.viewerCount': 1,
                        'video.commentCount': 1,
                        'video.likeCount': 1,
                    }
                },
                {
                    $sort: {
                        createdAt: -1,
                    }
                }
            ])

        return httpOk(res, likes);
    } catch (error) {
        next(error);
    }
}

exports.addLike = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;
    const { videoId } = req.body;
    try {

        const video = await videoModel.findById(videoId);
        if (!video) {
            throw new AppException("Video not found");
        }

        var like = await likeModel.findOne({
            creatorId: toObjectId(loggingUserId),
            videoId: toObjectId(videoId)
        });


        if (like) {
            throw new AppException("You've already like this video");
        }

        like = new likeModel({
            creatorId: toObjectId(loggingUserId),
            videoId: toObjectId(videoId)
        });

        await like.save();

        video.likeCount = video.likeCount + 1;
        await video.save();

        return http201(res, undefined, 'Created like successfully');
    } catch (error) {
        next(error);
    }
}

exports.delLike = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;

    try {
        const like = await likeModel.findOne({
            creatorId: toObjectId(loggingUserId),
            likeId: toObjectId(req.params.likeId)
        });

        if (!like) {
            throw new AppException("Like not found");
        }

        const video = await videoModel.findById(like.videoId);
        if (!video) {
            throw new AppException("Like not found");
        }

        if (video.likeCount > 0) {
            video.likeCount = video.likeCount - 1;
            await video.save();
        }

        like.isDeleted = true;
        await like.save();

        return httpOk(res, null, 'Deleted like successfully');
    } catch (error) {
        next(error);
    }
}


exports.getLike = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;

    try {
        const like = await likeModel.findOne({
            creatorId: toObjectId(loggingUserId),
            videoId: toObjectId(req.params.videoId)
        });

        if (!like) {
            throw new AppException("Like not found");
        }

        return httpOk(res, like);
    } catch (error) {
        next(error);
    }
}

