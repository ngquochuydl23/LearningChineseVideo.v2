const mongoose = require("mongoose");
const {
  BaseSchema,
  whereNotDeleted,
} = require("./share.models");

const schema = BaseSchema("Course.Collection", {
  title: {
    type: String,
    required: [true, "title must not be null"],
    trim: true,
  },
  subtitle: {
    type: String,
    required: [true, "subtitle must not be null"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "description must not be null"],
    trim: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  rateCount: {
    type: Number,
    default: 0,
  },
  studentCount: {
    type: Number,
    default: 0,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User.Model",
    required: [true, "authorId must not be null"],
  },
  targets: [String],
  lessonCount: {
    type: Number,
    default: 0,
  },
  totalDuration: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  level: {
    type: String,
    required: [true, "level must not be null"],
    enum: ["1", "2", "3", "4", "5"],
  },
  topics: {
    type: [String],
    required: [true, "At least one topic is required"],
  },
  requirements: {
    type: [String],
    required: false,
  },
  status: {
    type: String,
    required: false,
    default: "QUEUE",
  },
});

schema.pre("find", whereNotDeleted);
schema.pre("findOne", whereNotDeleted);
schema.pre("updateOne", whereNotDeleted);
schema.pre("findById", whereNotDeleted);

module.exports = mongoose.model("Course.Model", schema);
