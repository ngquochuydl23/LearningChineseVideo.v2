const mongoose = require("mongoose");
const {
  BaseSchema,
  whereNotDeleted,
} = require("./share.models");
const { min } = require("lodash");

const schema = BaseSchema("User.Collection", {
  fullName: {
    type: String,
    text: true,
    required: [true, "fullName must not be null"],
  },
  phoneNumber: {
    type: String,
    text: true,
    required: [true, "phoneNumber must not be null"],
  },
  email: {
    type: String,
    text: true,
    required: [true, "email must not be null"],
    match: [
      /\S+@\S+\.\S+/,
      "Please enter a valid email address",
    ],
  },
  hashPassword: {
    type: String,
    text: true,
    required: [true, "hashPassword must not be null"],
  },
  birthday: {
    type: String,
    text: true,
    required: [false],
  },
  lastLogin: {
    type: Date,
    required: [false],
  },
  gender: {
    type: Number,
    enum: [0, 1],
    required: [true, "gender must not be null"],
  },
  avatar: {
    type: String,
    required: [false],
  },
  level: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6],
    required: [true, "level must not be null"],
  },
  role: {
    type: String,
    text: true,
    enum: ["User", "Administrator", "Teacher"],
    default: "User",
    required: [false],
  },
  identification: {
    type: Number,
    required: [false],
  },
  experience: {
    type: String,
    required: [false],
  },
  placeWork: {
    type: String,
    required: [false],
  },
  allowTeaching: {
    type: Boolean,
    required: [false],
  },
  bio: {
    type: String,
    required: [false],
  },
});

schema.pre("find", whereNotDeleted);
schema.pre("findOne", whereNotDeleted);
schema.pre("updateOne", whereNotDeleted);

module.exports = mongoose.model("User.Model", schema);
