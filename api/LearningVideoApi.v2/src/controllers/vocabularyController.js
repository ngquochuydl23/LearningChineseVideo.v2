const { sequelize } = require('../models');
const { initModels } = require('../models/init-models');
const { httpOk, http201, httpOkAsCollection } = require('../httpResponse');
const { Op, Sequelize } = require('sequelize');
const { AppException } = require('../exceptions/AppException');
const { logger } = require('../logger');
const moment = require('moment');
const _ = require('lodash');

const models = initModels(sequelize);

exports.getVocabularies = async (req, res, next) => {
    const { level, search, type } = req.query;

    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    try {

        const { rows, count } = await models.Vocabulary.findAndCountAll({
            where: {
                IsDeleted: false,
                ...(level && { Level: level }),
                ...(search && {
                    [Op.or]: [
                        { OriginWord: { [Op.like]: search } },
                        { VietnameseMean: { [Op.like]: search } },
                        { Pinyin: { [Op.like]: search } }
                    ]
                }),
                ...(type && { WordType: type })
            },
            offset: offset,
            limit: limit,
            order: [['CreatedAt', 'DESC']],
            logging: console.log
        });

        return httpOkAsCollection(res, rows, count, limit, offset)
    } catch (error) {
        next(error);
    }
}

exports.getVocaByOriginWord = async (req, res, next) => {
    const { originWord } = req.params;


    try {
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

        return httpOk(res, vocabulary)
    } catch (error) {
        next(error);
    }
}

exports.delVocabulary = async (req, res, next) => {
    const { originWord } = req.params;
    try {
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

        await models.Vocabulary.destroy(
            {
                where: {
                    OriginWord: { [Op.like]: originWord }
                },
            },
        );

        return httpOk(res, null, "Deleted vocabulary successfully.");
    } catch (error) {
        next(error);
    }
}

exports.addVocabulary = async (req, res, next) => {
    const {
        originWord,
        vietnameseMean,
        sinoVietnamese,
        wordType,
        pinyin,
        similiarMeaning,
        oppositeMeaning,
        example,
        level
    } = req.body;
    try {
        var vocabulary = await models.Vocabulary.findOne({
            where: {
                IsDeleted: false,
                OriginWord: { [Op.like]: originWord }
            },
            logging: console.log
        });

        if (vocabulary) {
            throw new AppException("Vocabulary is already created");
        }

        vocabulary = await models.Vocabulary.create({
            OriginWord: originWord,
            VietnameseMean: vietnameseMean,
            WordType: wordType,
            Pinyin: pinyin,
            SimiliarMeaning: similiarMeaning,
            OppositeMeaning: oppositeMeaning,
            Example: example,
            IsDeleted: false,
            CreatedAt: moment(),
            LastUpdated: moment(),
            SinoVietnamese: sinoVietnamese,
            Level: level
        });

        return http201(res, vocabulary, "Add vocabulary successfully");
    } catch (error) {
        next(error);
    }
}

exports.editVocabulary = async (req, res, next) => {
    const { originWord } = req.params;
    const {
        vietnameseMean,
        sinoVietnamese,
        wordType,
        pinyin,
        similiarMeaning,
        oppositeMeaning,
        example,
        level
    } = req.body;
    try {
        var vocabulary = await models.Vocabulary.findOne({
            where: {
                IsDeleted: false,
                OriginWord: { [Op.like]: originWord }
            },
            logging: console.log
        });

        if (!vocabulary) {
            throw new AppException("Vocabulary not found");
        }

        vocabulary.OriginWord = originWord;
        vocabulary.VietnameseMean = vietnameseMean;
        vocabulary.WordType = wordType;
        vocabulary.Pinyin = pinyin;
        vocabulary.SimiliarMeaning = similiarMeaning;
        vocabulary.OppositeMeaning = oppositeMeaning;
        vocabulary.Example = example;
        vocabulary.LastUpdated = moment();
        vocabulary.SinoVietnamese = sinoVietnamese;
        vocabulary.Level = level;

        await vocabulary.save();

        return httpOk(res, vocabulary, "Updated vocabulary successfully");
    } catch (error) {
        next(error);
    }
}


