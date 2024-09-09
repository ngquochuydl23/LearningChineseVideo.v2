const { sequelize } = require('../models');
const { initModels } = require('../models/init-models');
const { httpOk, http201 } = require('../httpResponse');
const { AppException } = require('../exceptions/AppException');
const { removeVI } = require('jsrmvi');
const { v4: uuidv4 } = require('uuid');
const { logger } = require('../logger');
const moment = require('moment');
const _ = require('lodash');
const videoModel = require('../nosql-models/video.model');
const models = initModels(sequelize);

exports.getVideos = async (req, res, next) => {
    const { level, search } = req.query;
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

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
            // .limit(limit)
            // .skip(offset)
            .sort({ createdAt: -1 });

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

        video.IsDeleted = true;
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
            mimeType,
            level,
            subtitles,
            topics
        });

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