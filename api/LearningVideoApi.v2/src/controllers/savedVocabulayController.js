const { sequelize } = require('../models');
const { initModels } = require('../models/init-models');
const { httpOk, http201 } = require('../httpResponse');
const { Op, Sequelize } = require('sequelize');
const { AppException } = require('../exceptions/AppException');
const { removeVI } = require('jsrmvi');
const { v4: uuidv4 } = require('uuid');
const { logger } = require('../logger');
const moment = require('moment');
const _ = require('lodash');
const videoModel = require('../nosql-models/video.model');
const savedVocaModel = require('../nosql-models/savedVoca.model');
const vocabularyModel = require('../nosql-models/vocabulary.model');
const models = initModels(sequelize);
const toObjectId = require('../utils/toObjectId');

exports.getSavedByVideo = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;

    try {
        const groupSaved = await savedVocaModel.aggregate([
            {
                $match: {
                    isDeleted: false,
                    userId: toObjectId(loggingUserId)
                }
            },
            {
                $lookup: {
                    from: "Video.Collection",
                    localField: "videoId",
                    foreignField: "_id",
                    as: "video"
                }
            },
            { $unwind: '$video' },
            {
                $group: {
                    _id: '$video',
                    savedCount: { $sum: 1 },
                    lastUpdated: { $max: '$createdAt' }
                }
            },
            {
                $project: {
                    video: '$_id',
                    _id: 0, savedCount: 1, lastUpdated: 1
                }
            },
            {
                $sort: { lastUpdated: -1 }
            }
        ])

        return httpOk(res, groupSaved);
    } catch (error) {
        next(error);
    }
}



exports.saveVocabulary = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;
    const {
        originWord,
        videoId,
        showedFrom,
        showedTo,
        sentence
    } = req.body;

    try {

        if (showedFrom > showedTo) {
            throw new AppException("ShowedFrom must not be little than showedTo");
        }

        const video = await videoModel.findById(videoId);
        if (!video) {
            throw new AppException("Video not found");
        }

        const vocabulary = await vocabularyModel.findOne({ originWord: originWord })
        if (!vocabulary) {
            throw new AppException("Vocabulary not found");
        }

        var saved = await savedVocaModel.findOne({
            userId: toObjectId(loggingUserId),
            vocabularyId: vocabulary._id,
            videoId: video._id,
            showedFrom: showedFrom,
            showedTo: showedTo,
            sentence: sentence
        })

        if (saved) {
            throw new AppException("You've already saved this word");
        }

        saved = new savedVocaModel({
            userId: toObjectId(loggingUserId),
            vocabularyId: vocabulary._id,
            videoId: video._id,
            showedFrom: showedFrom,
            showedTo: showedTo,
            sentence: sentence
        });

        await saved.save();
        return http201(res, saved, "Saved successfully");
    } catch (error) {
        next(error);
    }
}

exports.checkSaved = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;
    const { videoId, showedFrom, showedTo } = req.query;
    const { originWord } = req.params;

    try {
        if (showedFrom > showedTo) {
            throw new AppException("ShowedFrom must not be little than showedTo");
        }

        const video = await videoModel.findById(videoId);
        if (!video) {
            throw new AppException("Video not found");
        }


        const vocabulary = await vocabularyModel.findOne({ originWord: originWord })
        if (!vocabulary) {
            throw new AppException("Vocabulary not found");
        }

        const saved = await savedVocaModel.findOne({
            userId: toObjectId(loggingUserId),
            vocabularyId: vocabulary._id,
            videoId: video._id,
            showedFrom: showedFrom,
            showedTo: showedTo
        });

        if (!saved) {
            throw new AppException("Saved not found");
        }

        return httpOk(res, saved);
    } catch (error) {
        next(error);
    }
}

exports.delSaved = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;
    const { videoId, showedFrom, showedTo } = req.query;
    const { originWord } = req.params;

    try {
        if (showedFrom > showedTo) {
            throw new AppException("ShowedFrom must not be little than showedTo");
        }

        const video = await videoModel.findById(videoId);
        if (!video) {
            throw new AppException("Video not found");
        }


        const vocabulary = await vocabularyModel.findOne({ originWord: originWord })
        if (!vocabulary) {
            throw new AppException("Vocabulary not found");
        }

        const saved = await savedVocaModel.findOne({
            userId: toObjectId(loggingUserId),
            vocabularyId: vocabulary._id,
            videoId: video._id,
            showedFrom: showedFrom,
            showedTo: showedTo
        });

        if (!saved) {
            throw new AppException("Saved not found");
        }

        saved.isDeleted = true;
        await saved.save();

        return httpOk(res, null, "Deleted successfully");

    } catch (error) {
        next(error);
    }
}
