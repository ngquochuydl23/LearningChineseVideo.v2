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
const { error } = require('winston');

const models = initModels(sequelize);

exports.getSavedByVideo = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;

    try {
        const videos = await models.SavedVocaEntity.findAll({
            where: {
                IsDeleted: false,
                UserId: loggingUserId,
            },
            attributes: [
                [Sequelize.cast(Sequelize.fn('COUNT', Sequelize.col('SavedVocaEntity.Id')), 'INTEGER'), 'SavedCount'],
                [Sequelize.fn('MIN', Sequelize.col('SavedVocaEntity.CreatedAt')), 'LastUpdated']
            ],
            group: ['Video.Id'],
            include: [
                {
                    model: models.Video,
                    as: 'Video',
                    required: true,
                }
            ],
            order: [
                ['LastUpdated', 'DESC'],
            ],
        });

        return httpOk(res, videos);
    } catch (error) {
        next(error);
    }
}


exports.saveVocabulary = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;
    const {
        videoId,
        vocabularyId,
        showedFrom,
        showedTo,
        sentence
    } = req.body;

    try {
        const video = await models.Video.findOne({
            where: {
                Id: videoId,
                IsDeleted: false
            },
            logging: console.log
        });

        if (!video) {
            throw new AppException("Video not found");
        }

        const vocabulary = await models.Vocabulary.findOne({
            where: {
                IsDeleted: false,
                OriginWord: { [Op.like]: originWord }
            },
            logging: console.log
        });

        if (!vocabulary) {
            throw new AppException("Vocabulary not found");
        }

        var saved = await models.SavedVocaEntity.create({
            where: {
                IsDeleted: false,
                UserId: loggingUserId,
                VocabularyId: { [Op.like]: vocabularyId },
                ShowedFrom: showedFrom,
                ShowedTo: showedTo,
                Sentence: sentence
            },
            logging: console.log
        });

        if (saved) {
            throw new AppException("You've already saved this word");
        }

        saved = await models.SavedVocaEntity.create({
            UserId: loggingUserId,
            VocabularyId: vocabularyId,
            ShowedFrom: showedFrom,
            VideoId: videoId,
            ShowedTo: showedTo,
            Sentence: sentence,
            IsDeleted: false,
            LastUpdated: moment(),
            CreatedAt: moment(),
        });

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


        if (showedFrom.localeCompare(showedTo, undefined, { numeric: true }) === 1) {
            throw new AppException("ShowedFrom must not be larger than showedTo");
        }

        const video = await models.Video.findOne({
            where: {
                Id: videoId,
                IsDeleted: false
            },
            logging: console.log
        });

        if (!video) {
            throw new AppException("Video not found");
        }

        const vocabulary = await models.Vocabulary.findOne({
            where: {
                IsDeleted: false,
                OriginWord: { [Op.like]: originWord }
            },
            logging: console.log
        });

        if (!vocabulary) {
            throw new AppException("Vocabulary not found");
        }

        const saved = await models.SavedVocaEntity.findOne({
            where: {
                IsDeleted: false,
                VocabularyId: originWord,
                VideoId: videoId,
                UserId: loggingUserId,
                ShowedFrom: showedFrom,
                ShowedTo: showedTo
            },
            logging: console.log
        });


        if (!saved) {
            throw new AppException("Saved not found");
        }

        saved.IsDeleted = true;
        await saved.save();

        return httpOk(res, null, "Deleted successfully");
    } catch (error) {
        next(error);
    }
}
