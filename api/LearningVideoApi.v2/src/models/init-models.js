var DataTypes = require("sequelize").DataTypes;
var _SavedVocaEntity = require("./SavedVocaEntity");
var _Topic = require("./Topic");
var _TopicVideo = require("./TopicVideo");
var _User = require("./User");
var _Video = require("./Video");
var _VideoSubtitle = require("./VideoSubtitle");
var _Vocabulary = require("./Vocabulary");
var _WatchedVideo = require("./WatchedVideo");
var ___EFMigrationsHistory = require("./__EFMigrationsHistory");

function initModels(sequelize) {
  var SavedVocaEntity = _SavedVocaEntity(sequelize, DataTypes);
  var Topic = _Topic(sequelize, DataTypes);
  var TopicVideo = _TopicVideo(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);
  var Video = _Video(sequelize, DataTypes);
  var VideoSubtitle = _VideoSubtitle(sequelize, DataTypes);
  var Vocabulary = _Vocabulary(sequelize, DataTypes);
  var WatchedVideo = _WatchedVideo(sequelize, DataTypes);
  var __EFMigrationsHistory = ___EFMigrationsHistory(sequelize, DataTypes);

  TopicVideo.belongsTo(Topic, { as: "Topic", foreignKey: "TopicId"});
  Topic.hasMany(TopicVideo, { as: "TopicVideos", foreignKey: "TopicId"});
  SavedVocaEntity.belongsTo(User, { as: "User", foreignKey: "UserId"});
  User.hasMany(SavedVocaEntity, { as: "SavedVocaEntities", foreignKey: "UserId"});
  WatchedVideo.belongsTo(User, { as: "User", foreignKey: "UserId"});
  User.hasMany(WatchedVideo, { as: "WatchedVideos", foreignKey: "UserId"});
  SavedVocaEntity.belongsTo(Video, { as: "Video", foreignKey: "VideoId"});
  Video.hasMany(SavedVocaEntity, { as: "SavedVocaEntities", foreignKey: "VideoId"});
  TopicVideo.belongsTo(Video, { as: "Video", foreignKey: "VideoId"});
  Video.hasMany(TopicVideo, { as: "TopicVideos", foreignKey: "VideoId"});
  VideoSubtitle.belongsTo(Video, { as: "Video", foreignKey: "VideoId"});
  Video.hasMany(VideoSubtitle, { as: "VideoSubtitles", foreignKey: "VideoId"});
  WatchedVideo.belongsTo(Video, { as: "Video", foreignKey: "VideoId"});
  Video.hasMany(WatchedVideo, { as: "WatchedVideos", foreignKey: "VideoId"});
  SavedVocaEntity.belongsTo(Vocabulary, { as: "Vocabulary", foreignKey: "VocabularyId"});
  Vocabulary.hasMany(SavedVocaEntity, { as: "SavedVocaEntities", foreignKey: "VocabularyId"});

  return {
    SavedVocaEntity,
    Topic,
    TopicVideo,
    User,
    Video,
    VideoSubtitle,
    Vocabulary,
    WatchedVideo,
    __EFMigrationsHistory,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
