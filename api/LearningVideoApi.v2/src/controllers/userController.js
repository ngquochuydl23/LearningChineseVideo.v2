const { httpOk, http201 } = require("../httpResponse");
const {
  AppException,
} = require("../exceptions/AppException");
const moment = require("moment");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../nosql-models/user.model");

exports.persistLogin = async (req, res, next) => {
  const loggingUserId = req.loggingUserId;

  try {
    const user = await userModel.findById(
      loggingUserId,
      "-hashPassword"
    );
    if (!user) {
      throw new AppException("User does not exist");
    }

    return httpOk(res, user);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    if (_.isEmpty(req.body)) {
      throw new AppException("req.body is empty");
    }

    const { phoneNumber, password } = req.body;
    const user = await userModel.findOne({
      phoneNumber: phoneNumber,
    });

    if (!user) {
      throw new AppException("User does not exist");
    }

    if (
      !(await bcrypt.compare(password, user.hashPassword))
    ) {
      throw new AppException("Password is incorrect");
    }

    user.lastLogin = moment();
    await user.save();
    const copyObj = { ...user.toObject() };

    delete copyObj["hashPassword"];
    delete copyObj["isDeleted"];

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      "secret",
      { expiresIn: "30d" }
    );

    return httpOk(
      res,
      {
        token: token,
        user: copyObj,
      },
      "Login successfully"
    );
  } catch (error) {
    next(error);
  }
};

exports.signUp = async (req, res, next) => {
  const {
    fullName,
    phoneNumber,
    email,
    password,
    birthday,
    gender,
    level,
  } = req.body;

  try {
    var user = await userModel.findOne({
      $or: [{ phoneNumber: phoneNumber }, { email: email }],
    });

    if (user) {
      throw new AppException(
        "Email or phone number is already used"
      );
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hashSync(
      password,
      saltRounds
    );

    user = new userModel({
      fullName: fullName,
      phoneNumber: phoneNumber,
      email: email,
      hashPassword: hashPassword,
      birthday: birthday,
      gender: gender,
      level: level,
      role: "User",
    });

    const copyObj = { ...user.toJSON() };
    delete copyObj["hashPassword"];

    await user.save();
    return http201(
      res,
      copyObj,
      "Create account successfully"
    );
  } catch (error) {
    next(error);
  }
};

exports.deleteAccount = async (req, res, next) => {
  const loggingUserId = req.loggingUserId;

  try {
    const user = await userModel.findById(loggingUserId);
    if (!user) {
      throw new AppException("User does not exist");
    }

    user.isDeleted = true;
    await user.save();

    return httpOk(
      res,
      null,
      "Deleted account successfully"
    );
  } catch (error) {
    next(error);
  }
};

exports.updateInfo = async (req, res, next) => {
  const loggingUserId = req.loggingUserId;
  const {
    fullName,
    phoneNumber,
    email,
    birthday,
    gender,
    level,
    avatar,
  } = req.body;

  try {
    const user = await userModel.findById(loggingUserId);
    if (!user) {
      throw new AppException("User does not exist");
    }

    user.fullName = fullName;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.gender = gender;
    user.birthday = birthday;
    user.level = level;
    user.lastUpdated = moment();
    user.avatar = avatar;

    await user.save();

    const objCopy = { ...user.toObject() };
    delete objCopy["hashPassword"];

    return httpOk(res, objCopy);
  } catch (error) {
    next(error);
  }
};

exports.updateAvatar = async (req, res, next) => {
  const loggingUserId = req.loggingUserId;
  const { avatar } = req.body;

  try {
    const user = await userModel.findById(loggingUserId);
    if (!user) {
      throw new AppException("User does not exist");
    }
    user.avatar = avatar;
    await user.save();

    const objCopy = { ...user.toObject() };
    delete objCopy["hashPassword"];

    return httpOk(res, objCopy);
  } catch (error) {
    next(error);
  }
};
// teacher
exports.signUpTeacher = async (req, res, next) => {
  const {
    fullName,
    phoneNumber,
    email,
    password,
    birthday,
    gender,
    identification,
    experience,
    placeWork,
    bio,
  } = req.body;

  try {
    var user = await userModel.findOne({
      $or: [
        { phoneNumber: phoneNumber },
        { email: email },
        { identification: identification },
      ],
    });

    if (user) {
      throw new AppException(
        "Email or phone number or identification is already used"
      );
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hashSync(
      password,
      saltRounds
    );

    user = new userModel({
      fullName: fullName,
      phoneNumber: phoneNumber,
      email: email,
      hashPassword: hashPassword,
      birthday: birthday,
      gender: gender,
      identification: identification,
      role: "Teacher",
      experience: experience,
      placeWork: placeWork,
      level: 6,
      role: "Teacher",
      bio: bio,
    });

    const copyObj = { ...user.toJSON() };
    delete copyObj["hashPassword"];

    await user.save();
    return http201(
      res,
      copyObj,
      "Create account for teacher successfully"
    );
  } catch (error) {
    next(error);
  }
};
