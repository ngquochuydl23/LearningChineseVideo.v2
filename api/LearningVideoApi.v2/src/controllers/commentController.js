const { httpOk, http201 } = require('../httpResponse');
const { AppException } = require('../exceptions/AppException');
const moment = require('moment');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const userModel = require('../nosql-models/user.model');
const commentModel = require('../nosql-models/comment.model');
const toObjectId = require('../utils/toObjectId');


exports.getComments = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;

    try {
        const user = await userModel.findById(loggingUserId);
        if (!user) {
            throw new AppException("User does not exist");
        }

        const comments = await commentModel.find({
            creatorId: toObjectId(loggingUserId)
        });

        return httpOk(res, comments);
    } catch (error) {
        next(error);
    }
}

exports.addComment = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;
    const {
        commentId,
        content,
        videoId,
    } = req.body;
    try {
        const user = await userModel.findById(loggingUserId);
        if (!user) {
            throw new AppException("User does not exist");
        }

        const comment = new commentModel({
            content,
            creatorId: toObjectId(loggingUserId),
            videoId: toObjectId(videoId)
        });

        await comment.save();

        return http201(res, comment, 'Created comment successfully');
    } catch (error) {
        next(error);
    }
}

exports.delComment = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;

    try {
        const comment = await commentModel.findOne({
            creatorId: toObjectId(loggingUserId),
            commentId: toObjectId(req.params.commentId)
        });

        comment.isDeleted = false;
        await comment.save();

        return http201(res, comment, 'Created comment successfully');
    } catch (error) {
        next(error);
    }
}

exports.getCommentById = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;

    try {

        const comment = await commentModel.findById(req.params.commentId);

        comment.isDeleted = false;
        await comment.save();

        return http201(res, comment, 'Created comment successfully');
    } catch (error) {
        next(error);
    }
}