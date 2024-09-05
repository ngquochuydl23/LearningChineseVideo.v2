const { sequelize } = require('../models');
const { initModels } = require('../models/init-models');
const { httpOk, http201, httpOkAsCollection } = require('../httpResponse');
const { Op, Sequelize } = require('sequelize');
const { AppException } = require('../exceptions/AppException');
const { logger } = require('../logger');
const moment = require('moment');
const _ = require('lodash');
const vocabularyModel = require('../nosql-models/vocabulary.model');
const models = initModels(sequelize);

exports.getVocabularies = async (req, res, next) => {
    const { level, search, type } = req.query;

    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    const whereObj = {
        ...(type && { wordType: type }),
        ...(level && { level: level }),
        ...(search && {
            $or: [
                { originWord: { $regex: search } },
                { vietnameseMean: { $regex: search } },
                { pinyin: { $regex: search } }
            ]
        })
    }

    try {
        const count = await vocabularyModel
            .find(whereObj)
            .count();

        const documents = await vocabularyModel
            .find(whereObj)
            .limit(limit)
            .skip(offset)
            .sort({ createdAt: -1 });

        return httpOkAsCollection(res, documents, count, limit, offset)
    } catch (error) {
        next(error);
    }
}

exports.getVocaByOriginWord = async (req, res, next) => {
    const { originWord } = req.params;

    try {

        const vocabulary = await vocabularyModel.findOne({ originWord });

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

        const vocabulary = await vocabularyModel.findOne({ originWord });

        if (!vocabulary) {
            throw new AppException("Vocabulary not found");
        }

        vocabulary.isDeleted = true;
        vocabulary.save();

        return httpOk(res, null, "Deleted vocabulary successfully.");
    } catch (error) {
        next(error);
    }
}

exports.addVocabulary = async (req, res, next) => {
    try {
        var vocabulary = await vocabularyModel.findOne({ originWord: req.body.originWord });

        if (vocabulary) {
            throw new AppException("Vocabulary is already created");
        }

        vocabulary = new vocabularyModel(req.body);

        await vocabulary.save();
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
        const vocabulary = await vocabularyModel.findOne({ originWord });

        if (!vocabulary) {
            throw new AppException("Vocabulary not found");
        }

        vocabulary.originWord = originWord;
        vocabulary.vietnameseMean = vietnameseMean;
        vocabulary.wordType = wordType;
        vocabulary.pinyin = pinyin;
        vocabulary.similiarMeaning = similiarMeaning;
        vocabulary.oppositeMeaning = oppositeMeaning;
        vocabulary.example = example;
        vocabulary.sinoVietnamese = sinoVietnamese;
        vocabulary.level = level;

        await vocabulary.save();

        return httpOk(res, vocabulary, "Updated vocabulary successfully");
    } catch (error) {
        next(error);
    }
}


