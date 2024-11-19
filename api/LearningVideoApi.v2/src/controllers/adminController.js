const userModel = require("../nosql-models/user.model");
const toObjectId = require("../utils/toObjectId");
exports.getUsers = async (req, res, next) => {
  try {
    const users = await userModel.aggregate([
      {
        $match: {
          isDeleted: false,
        },
      },
    ]);

    return httpOk(res, users);
  } catch (error) {
    next(error);
  }
};
exports.getTeachers = async (req, res, next) => {
  try {
    const users = await userModel.aggregate([
      {
        $match: {
          isDeleted: false,
          role: "Teacher",
        },
      },
    ]);

    return httpOk(res, users);
  } catch (error) {
    next(error);
  }
};
exports.getUserNotAdmin = async (req, res, next) => {
  try {
    const users = await userModel.aggregate([
      {
        $match: {
          isDeleted: false,
          role: "User",
        },
      },
    ]);

    return httpOk(res, users);
  } catch (error) {
    next(error);
  }
};
exports.getAdmins = async (req, res, next) => {
  try {
    const users = await userModel.aggregate([
      {
        $match: {
          isDeleted: false,
          role: "Administrator",
        },
      },
    ]);

    return httpOk(res, users);
  } catch (error) {
    next(error);
  }
};
exports.approveTeacher = async (req, res, next) => {
  try {
    const { teacherId } = req.params;
    const teacher = await userModel.findByIdAndUpdate(
      teacherId,
      { approve: "ACCEPTED" },
      { new: true }
    );
    return httpOk(res, teacher);
  } catch (error) {
    next(error);
  }
};
exports.rejectTeacher = async (req, res, next) => {
  try {
    const { teacherId } = req.params;
    const teacher = await userModel.findByIdAndUpdate(
      teacherId,
      { approve: "REJECTED" },
      { new: true }
    );
    return httpOk(res, teacher);
  } catch (error) {
    next(error);
  }
};

exports.approveUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findByIdAndUpdate(
      userId,
      { approveAdmin: "ACCEPTED", role: "Administrator" },
      { new: true }
    );
    return httpOk(res, user);
  } catch (error) {
    next(error);
  }
};
exports.requestAdmin = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findByIdAndUpdate(
      userId,
      { approveAdmin: "QUEUE" },
      { new: true }
    );
    return httpOk(res, user);
  } catch (error) {
    next(error);
  }
};
exports.rejectAdmin = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findByIdAndUpdate(
      userId,
      { approveAdmin: "REJECTED" },
      { new: true }
    );
    return httpOk(res, user);
  } catch (error) {
    next(error);
  }
};
