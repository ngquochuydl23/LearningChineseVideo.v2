const { httpOk, http201 } = require('../httpResponse');
const { AppException } = require('../exceptions/AppException');
const _ = require('lodash');
const videoModel = require('../nosql-models/video.model');

exports.getVideos = async (req, res, next) => {
    const { level, search, sort } = req.query;
    const limit = parseInt(req.query.limit) || undefined;
    const offset = parseInt(req.query.offset) || undefined;

    try {
        const whereObj = {
            ...(level && { level: level }),
            ...(search && {
                $or: [
                    { title: { $regex: search } },
                    { description: { $regex: search } },
                    {
                        topic: { $elemMatch: { $regex: search } }
                    }
                ]
            })
        }

        const count = await videoModel
            .find(whereObj)
            .count();

        const documents = await videoModel
            .find(whereObj)
            .limit(limit)
            .skip(offset)
            .sort({
                ...(sort === 'desc-popular' && {
                    viewerCount: -1,
                    likeCount: -1,
                    commentCount: -1
                }),
                createdAt: -1,
            });

        return httpOkAsCollection(res, documents, count, limit, offset);
    } catch (error) {
        next(error);
    }
}


exports.getVideo = async (req, res, next) => {
    const { videoId } = req.params;

    try {
        const video = await videoModel.findById(videoId);
        if (!video) {
            throw new AppException("Video does not exist");
        }

        return httpOk(res, video)
    } catch (error) {
        next(error);
    }
}

exports.delVideo = async (req, res, next) => {
    const { videoId } = req.params;

    try {
        const video = await videoModel.findById(videoId);
        if (!video) {
            throw new AppException("Video does not exist");
        }

        video.isDeleted = true;
        await video.save();

        return httpOk(res, null, "Deleted video successfully.");
    } catch (error) {
        next(error);
    }
}

exports.addVideo = async (req, res, next) => {
    const {
        title,
        description,
        videoUrl,
        thumbnail,
        duration,
        mimeType,
        level,
        subtitles,
        topics,
    } = req.body;

    try {
        const video = await videoModel.findOne({ title: title });
        if (video) {
            throw new AppException("Video is already created");
        }

        const newVideo = await videoModel({
            title,
            description,
            videoUrl,
            thumbnail,
            duration,
            mimeType: 'video/mp4',
            level,
            subtitles,
            topics,
            commentCount: 0,
            likeCount: 0,
            viewerCount: 0
        });
        await newVideo.save();
        return http201(res, newVideo, "Add video successfully.");
    } catch (error) {
        next(error);
    }
}

exports.viewVideo = async (req, res, next) => {
    const { videoId } = req.params;

    try {
        const video = await videoModel.findById(videoId);
        if (!video) {
            throw new AppException("Video does not exist");
        }

        video.viewerCount = video.viewerCount + 1;
        await video.save();

        return httpOk(res, null, "Viewed video successfully.");
    } catch (error) {
        next(error);
    }
}

exports.editVideo = async (req, res, next) => {
    const { videoId } = req.params;
    const { title, description, topics, subtitles, level } = req.body;

    try {
        const video = await videoModel.findById(videoId);
        if (!video) {
            throw new AppException("Video does not exist");
        }

        video.viewerCount = video.viewerCount + 1;
        video.title = title;
        video.description = description;
        video.topics = topics;
        video.subtitles = subtitles;
        video.level = level;

        await video.save();

        return httpOk(res, null, "Updated video successfully.");
    } catch (error) {
        next(error);
    }
}