const { httpOk, http201 } = require("../httpResponse");
const {
  AppException,
} = require("../exceptions/AppException");
const _ = require("lodash");
const toObjectId = require("../utils/toObjectId");
const courseLessonModel = require("../nosql-models/course-lesson.model");
const excerciseModels = require("../nosql-models/excercise.models");

exports.getLessonById = async (req, res, next) => {
  const lessonId = req.params.lessonId;
  try {
    const lesson = await courseLessonModel.findOne({
      _id: toObjectId(lessonId),
    });

    if (!lesson) {
      throw new AppException("Lesson not found");
    }

    return httpOk(res, lesson);
  } catch (error) {
    next(error);
  }
};

exports.getExcercisesByLessonId = async (
  req,
  res,
  next
) => {
  const lessonId = req.params.lessonId;
  try {
    const lesson = await courseLessonModel.findOne({
      _id: toObjectId(lessonId),
    });

    if (!lesson) {
      throw new AppException("Lesson not found");
    }

    const excercises = await excerciseModels.find({
      lessonId: lesson._id,
    });

    return httpOk(res, excercises);
  } catch (error) {
    next(error);
  }
};

exports.checkExcercise = async (req, res, next) => {
  const lessonId = req.params.lessonId;
  const loggingUserId = req.loggingUserId;
  const excerciseId = req.params.excerciseId;
  const {
    type,
    fillInBlankAnswer,
    imageQuestionAnswer,
    audioQuestionAnswer,
    sentenceOrderAnswer,
    synonymAntonymAnswer,
    grammaAnswer,
  } = req.body;

  try {
    const lesson = await courseLessonModel.findOne({
      _id: toObjectId(lessonId),
    });
    if (!lesson) {
      throw new AppException("Lesson not found");
    }

    const excercise = await excerciseModels.findOne({
      _id: toObjectId(excerciseId),
    });
    if (!excercise) {
      throw new AppException("Excercise not found");
    }

    if (type !== excercise.type) {
      throw new AppException("Invalid question");
    }

    if (
      excercise.type === "fill-in-blank" &&
      fillInBlankAnswer
    ) {
      const rightPosition =
        excercise.fillInBlank.rightAwswerPosition;
      if (
        excercise.fillInBlank.rightAwswerPosition !==
        fillInBlankAnswer.positionAnswer
      ) {
        return httpOk(
          res,
          {
            checkResult: false,
            rightAnswer:
              excercise.fillInBlank.answers[rightPosition],
            rightPosition,
          },
          "Answer is not correct"
        );
      }

      return httpOk(
        res,
        {
          checkResult: true,
          answer:
            excercise.fillInBlank.answers[
              fillInBlankAnswer.positionAnswer
            ],
          rightPosition,
        },
        "Correct answer"
      );
    } else if (
      excercise.type === "image-question" &&
      imageQuestionAnswer
    ) {
      const rightPosition =
        excercise.imageQuestion.rightAwswerPosition;
      if (
        excercise.imageQuestion.rightAwswerPosition !==
        imageQuestionAnswer.positionAnswer
      ) {
        return httpOk(
          res,
          {
            checkResult: false,
            rightAnswer:
              excercise.imageQuestion.answers[
                rightPosition
              ],
            rightPosition,
          },
          "Answer is not correct"
        );
      }

      return httpOk(
        res,
        {
          checkResult: true,
          answer:
            excercise.imageQuestion.answers[
              imageQuestionAnswer.positionAnswer
            ],
          rightPosition,
        },
        "Correct answer"
      );
    } else if (
      excercise.type === "audio-question" &&
      audioQuestionAnswer
    ) {
      const rightPosition =
        excercise.audioQuestion.rightAwswerPosition;
      if (
        excercise.audioQuestion.rightAwswerPosition !==
        audioQuestionAnswer.positionAnswer
      ) {
        return httpOk(
          res,
          {
            checkResult: false,
            rightAnswer:
              excercise.audioQuestion.answers[
                rightPosition
              ],
            rightPosition,
          },
          "Answer is not correct"
        );
      }
      return httpOk(
        res,
        {
          checkResult: true,
          answer:
            excercise.audioQuestion.answers[
              audioQuestionAnswer.positionAnswer
            ],
          rightPosition,
        },
        "Correct answer"
      );
    } else if (
      excercise.type === "sentence-order-question" &&
      sentenceOrderAnswer
    ) {
      const correctOrder =
        excercise.sentenceOrderQuestion.correctOrder;

      if (!_.isEqual(correctOrder, sentenceOrderAnswer)) {
        return httpOk(
          res,
          {
            checkResult: false,
            correctOrder,
            sentenceOrderAnswer,
          },
          "Answer is not correct"
        );
      }

      return httpOk(
        res,
        {
          checkResult: true,
          correctOrder,
          sentenceOrderAnswer,
        },
        "Correct answer"
      );
    } else if (
      type === "synonym-antonym-question" &&
      synonymAntonymAnswer
    ) {
      const rightPosition =
        excercise.synonymAntonymQuestion
          .rightAwswerPosition;
      if (
        excercise.synonymAntonymQuestion
          .rightAwswerPosition !==
        synonymAntonymAnswer.positionAnswer
      ) {
        return httpOk(
          res,
          {
            checkResult: false,
            rightAnswer:
              excercise.synonymAntonymQuestion.answers[
                rightPosition
              ],
            rightPosition,
          },
          "Answer is not correct"
        );
      }
      return httpOk(
        res,
        {
          checkResult: true,
          answer:
            excercise.synonymAntonymQuestion.answers[
              synonymAntonymAnswer.positionAnswer
            ],
          rightPosition,
        },
        "Correct answer"
      );
    } else if (type === "gramma-question" && grammaAnswer) {
      const rightPosition =
        excercise.grammaQuestion.rightAwswerPosition;
      if (
        excercise.grammaQuestion.rightAwswerPosition !==
        grammaAnswer.positionAnswer
      ) {
        return httpOk(
          res,
          {
            checkResult: false,
            rightAnswer:
              excercise.grammaQuestion.answers[
                rightPosition
              ],
            rightPosition,
          },
          "Answer is not correct"
        );
      }
      return httpOk(
        res,
        {
          checkResult: true,
          answer:
            excercise.grammaQuestion.answers[
              grammaAnswer.positionAnswer
            ],
          rightPosition,
        },
        "Correct answer"
      );
    }

    throw new AppException("Type and answer are invalid.");
  } catch (e) {
    next(e);
  }
};

exports.delExcercise = async (req, res, next) => {
  const lessonId = req.params.lessonId;
  const loggingUserId = req.loggingUserId;
  const excerciseId = req.params.excerciseId;
  try {
    const lesson = await courseLessonModel.findOne({
      _id: toObjectId(lessonId),
    });

    if (!lesson) {
      throw new AppException("Lesson not found");
    }

    const excercise = await excerciseModels.findOne({
      _id: toObjectId(excerciseId),
    });
    if (!excercise) {
      throw new AppException("Excercise not found");
    }
    excercise.isDeleted = true;
    await excercise.save();

    lesson.excerciseCount = lesson.excerciseCount - 1;
    await lesson.save();
    return httpOk(res, null, "Deleted like successfully");
  } catch (e) {
    next(e);
  }
};

exports.addExcercise = async (req, res, next) => {
  const lessonId = req.params.lessonId;
  const loggingUserId = req.loggingUserId;
  const {
    type,
    fillInBlank,
    imageQuestion,
    audioQuestion,
    sentenceOrderQuestion,
    synonymAntonymQuestion,
    grammaQuestion,
  } = req.body;
  try {
    const lesson = await courseLessonModel.findOne({
      _id: toObjectId(lessonId),
    });

    if (!lesson) {
      throw new AppException("Lesson not found");
    }
    lesson.excerciseCount = lesson.excerciseCount + 1;

    if (type === "fill-in-blank" && fillInBlank) {
      const excercise = new excerciseModels({
        creatorId: toObjectId(loggingUserId),
        lessonId: lesson._id,
        type,
        fillInBlank,
      });

      await excercise.save();
      await lesson.save();

      return httpOk(res, excercise);
    } else if (type === "image-question" && imageQuestion) {
      const excercise = new excerciseModels({
        creatorId: toObjectId(loggingUserId),
        lessonId: lesson._id,
        type,
        imageQuestion,
      });

      await excercise.save();
      await lesson.save();

      return httpOk(res, excercise);
    } else if (type === "audio-question" && audioQuestion) {
      const excercise = new excerciseModels({
        creatorId: toObjectId(loggingUserId),
        lessonId: lesson._id,
        type,
        audioQuestion,
      });

      await excercise.save();
      await lesson.save();

      return httpOk(res, excercise);
    } else if (
      type === "sentence-order-question" &&
      sentenceOrderQuestion
    ) {
      const excercise = new excerciseModels({
        creatorId: toObjectId(loggingUserId),
        lessonId: lesson._id,
        type,
        sentenceOrderQuestion,
      });

      await excercise.save();
      await lesson.save();

      return httpOk(res, excercise);
    } else if (
      type === "synonym-antonym-question" &&
      synonymAntonymQuestion
    ) {
      const excercise = new excerciseModels({
        creatorId: toObjectId(loggingUserId),
        lessonId: lesson._id,
        type,
        synonymAntonymQuestion,
      });

      await excercise.save();
      await lesson.save();

      return httpOk(res, excercise);
    } else if (
      type === "gramma-question" &&
      grammaQuestion
    ) {
      const excercise = new excerciseModels({
        creatorId: toObjectId(loggingUserId),
        lessonId: lesson._id,
        type,
        grammaQuestion,
      });

      await excercise.save();
      await lesson.save();

      return httpOk(res, excercise);
    }

    throw new AppException(
      "Type and question are invalid."
    );
  } catch (error) {
    next(error);
  }
};
