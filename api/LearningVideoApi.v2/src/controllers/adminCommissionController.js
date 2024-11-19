const adminCommissionModel = require("../nosql-models/adminCommission.model");
const toObjectId = require("../utils/toObjectId");
exports.getCommissions = async (req, res, next) => {
  const loggingUserId = req.loggingUserId;
  try {
    const commissions =
      await adminCommissionModel.aggregate([
        {
          $match: {
            isDeleted: false,
            // userId: toObjectId(loggingUserId),
          },
        },
        {
          $lookup: {
            from: "Course.Collection",
            localField: "courseId",
            foreignField: "_id",
            as: "course",
          },
        },
        {
          $unwind: "$course",
        },
        {
          $project: {
            "course.studentCount": 0,
            "course.rateCount": 0,
            "course.rating": 0,
            "course.subtitle": 0,
            "course.description": 0,
            "course.targets": 0,
            "course.topics": 0,
            "course.requirements": 0,
            "course.totalDuration": 0,
            "course.level": 0,
          },
        },
      ]);

    return httpOk(res, commissions);
  } catch (error) {
    next(error);
  }
};
