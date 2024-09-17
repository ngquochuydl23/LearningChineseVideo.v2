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
                        topic: { $elemMatch: { $regex: [search] } }
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
        description,
        videoUrl,
        thumbnail,
        duration,
        mimeType,
        level,
        subtitles,
        topics,
        title
    } = req.body;

    const processedTitle = removeVI(req.body.title, { replaceSpecialCharacters: false });
    const transaction = await sequelize.transaction();

    try {
        const video = await models.Video.findOne({
            where: {
                IsDeleted: false,
                Title: sequelize.where(sequelize.fn('LOWER', sequelize.fn('unaccent', sequelize.col('Title'))), 'LIKE', '%' + processedTitle + '%')
            },
            logging: console.log
        });

        if (video) {
            throw new AppException("Video is already created");
        }

        const videoId = uuidv4();

        // insert Video
        const newVideo = await models.Video.create({
            Id: videoId,
            Description: description,
            VideoUrl: videoUrl,
            Thumbnail: thumbnail,
            Duration: duration,
            MimeType: mimeType,
            Level: level,
            Subtitles: subtitles,
            Topics: topics,
            Title: title,
            ViewerCount: 0,
            CommentCount: 0,
            IsDeleted: false,
            LastUpdated: moment(),
            CreatedAt: moment()
        }, { transaction });

        // insert VideoSubtitle
        _.forEach(subtitles, async (subtitle) => {
            await models.VideoSubtitle.create({
                VideoId: videoId,
                Url: subtitle.url,
                SrcLang: subtitle.srcLang,
                IsDefault: subtitle.isDefault,
                FileName: subtitle.fileName,
                LastUpdated: moment(),
                CreatedAt: moment(),
                IsDeleted: false
            }, { transaction });
        });

        // insert Video
        _.forEach(topics, async (item) => {

            var topic = await models.Topic.findOne({
                where: {
                    IsDeleted: false,
                    Title: item
                }
            });

            // insert topic
            if (!topic) {
                topic = await models.Topic.create({
                    Id: uuidv4(),
                    Title: item,
                    LastUpdated: moment(),
                    CreatedAt: moment(),
                    IsDeleted: false
                }, { transaction });
                logger.info('Created topic.');

            } else {
                logger.info('Topic is already created.');
            }

            var topicVideo = await models.TopicVideo.findOne({
                where: {
                    IsDeleted: false,
                    VideoId: videoId,
                    TopicId: topic.Id
                }
            });

            // insert topicVideo
            if (!topicVideo) {
                topicVideo = await models.TopicVideo.create({
                    VideoId: videoId,
                    TopicId: topic.Id,
                    LastUpdated: moment(),
                    CreatedAt: moment(),
                    IsDeleted: false
                }, { transaction });
                logger.info('Created TopicVideo.');

            } else {
                logger.info('TopicVideo is already created.');
            }
        });

        newVideo.PlainTextWithTopic = topics.join(",");
        await newVideo.save({ transaction });

        await transaction.commit();
        return http201(res, newVideo, "Add video successfully.");
    } catch (error) {

        await transaction.rollback();
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