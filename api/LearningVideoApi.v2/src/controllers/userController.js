const { sequelize } = require('../models');
const { initModels } = require('../models/init-models');
const { httpOk, http201 } = require('../httpResponse');
const { Op, Sequelize } = require('sequelize');
const { AppException } = require('../exceptions/AppException');
const { v4: uuidv4 } = require('uuid');
const { logger } = require('../logger');
const moment = require('moment');
const _ = require('lodash   ');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const models = initModels(sequelize);

exports.persistLogin = async (req, res, next) => {
    const user = await models.User.findOne({
        where: {
            PhoneNumber: phoneNumber,
            IsDeleted: false
        },
        logging: console.log
    });

    if (!user) {
        throw new AppException("User does not exist");
    }

    return httpOk(res, user);
}

exports.login = async (req, res, next) => {
    const { phoneNumber, password } = req.body;
    try {
        const user = await models.User.findOne({
            where: {
                PhoneNumber: phoneNumber,
                IsDeleted: false
            },
            logging: console.log
        });

        if (!user) {
            throw new AppException("User does not exist");
        }

        if (!(await bcrypt.compare(password, user.HashPassword))) {
            throw new AppException("Password is incorrect");
        }

        user.LastLogin = moment();
        await user.save();


        const token = jwt.sign({ userId: user._id, deviceId: device._id, }, "secret", { expiresIn: "30d" });

        return httpOk(res, {
            token: token,
            userId: user._id,
            deviceId: device._id
        }, "Login successfully");

    } catch (error) {
        next(error);
    }
}

exports.signUp = async (req, res, next) => {

}

exports.deleteAccount = async (req, res, next) => {
    const user = await models.User.findOne({
        where: {
            PhoneNumber: phoneNumber,
            IsDeleted: false
        },
        logging: console.log
    });

    if (!user) {
        throw new AppException("User does not exist");
    }

    user.IsDeleted = true;
    await user.save();

    return httpOk(res, null, "Deleted account successfully");
}

exports.updateInfo = async (req, res, next) => {
    const user = await models.User.findOne({
        where: {
            PhoneNumber: phoneNumber,
            IsDeleted: false
        },
        logging: console.log
    });

    if (!user) {
        throw new AppException("User does not exist");
    }

    return httpOk(res, user);
}