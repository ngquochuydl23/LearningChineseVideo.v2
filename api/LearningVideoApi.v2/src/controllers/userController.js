const { sequelize } = require('../models');
const { initModels } = require('../models/init-models');
const { httpOk, http201 } = require('../httpResponse');
const { Op } = require('sequelize');
const { AppException } = require('../exceptions/AppException');
const moment = require('moment');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const models = initModels(sequelize);

exports.persistLogin = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;

    try {
        const user = await models.User.findOne({
            where: {
                Id: loggingUserId,
                IsDeleted: false
            },
            logging: console.log,
            attributes: { exclude: ["HashPassword"] }
        });

        if (!user) {
            throw new AppException("User does not exist");
        }

        return httpOk(res, user);
    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    const { phoneNumber, password } = req.body;
    try {
        const user = await models.User.findOne({
            where: {
                PhoneNumber: phoneNumber,
                IsDeleted: false
            },
            logging: console.log,
            raw: true
        });

        if (!user) {
            throw new AppException("User does not exist");
        }

        if (!(await bcrypt.compare(password, user.HashPassword))) {
            throw new AppException("Password is incorrect");
        }

        await models.User.update(
            { LastLogin: moment() },
            {
                where: {
                    Id: user.Id,
                    IsDeleted: false
                },
            },
        );

        delete user['HashPassword'];
        delete user['IsDeleted'];

        const token = jwt.sign({
            id: user.Id,
            role: user.Role
        }, "secret", { expiresIn: "30d" });

        return httpOk(res, {
            token: token,
            user: JSON.parse(JSON.stringify(user))
        }, "Login successfully");

    } catch (error) {
        next(error);
    }
}

exports.signUp = async (req, res, next) => {
    const {
        fullName,
        phoneNumber,
        email,
        password,
        birthday,
        gender,
        level
    } = req.body;

    try {

        var user = await models.User.findOne({
            where: {
                IsDeleted: false,
                [Op.or]: [
                    { PhoneNumber: phoneNumber },
                    { Email: email },
                ],
            },
            logging: console.log
        });

        if (user) {
            throw new AppException("Email or phone number is already used");
        }

        const saltRounds = 10;
        const hashPassword = await bcrypt.hashSync(password, saltRounds);

        user = await models.User.create({
            FullName: fullName,
            PhoneNumber: phoneNumber,
            Email: email,
            HashPassword: hashPassword,
            Birthday: birthday,
            Gender: gender,
            Level: level,
            Role: "User",
            LastLogin: moment(),
            IsDeleted: false,
            LastUpdated: moment(),
            CreatedAt: moment()
        });

        const copyObj = { ...user.toJSON() }
        delete copyObj['HashPassword'];

        return http201(res, copyObj, "Create account successfully");
    } catch (error) {
        next(error);
    }
}

exports.deleteAccount = async (req, res, next) => {
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

        user.IsDeleted = true;
        await user.save();

        return httpOk(res, null, "Deleted account successfully");
    } catch (error) {
        next(error);
    }
}

exports.updateInfo = async (req, res, next) => {
    const loggingUserId = req.loggingUserId;
    const {
        fullName,
        phoneNumber,
        email,
        birthday,
        gender,
        level
    } = req.body;

    try {
        const user = await models.User.findOne({
            where: {
                Id: loggingUserId,
                IsDeleted: false
            },
            logging: console.log,
            attributes: { exclude: ["HashPassword"] }
        });

        if (!user) {
            throw new AppException("User does not exist");
        }


        user.FullName = fullName;
        user.Email = email;
        user.PhoneNumber = phoneNumber;
        user.Gender = gender;
        user.Birthday = birthday;
        user.Level = level;
        user.LastUpdated = moment();
        user.Avatar = avatar;

        await user.save();
        
        return httpOk(res, user);
    } catch (error) {
        next(error);
    }
}