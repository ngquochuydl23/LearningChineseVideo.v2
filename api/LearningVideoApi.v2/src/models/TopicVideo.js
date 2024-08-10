const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('TopicVideo', {
    Id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    VideoId: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: 'Video',
        key: 'Id'
      }
    },
    TopicId: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: 'Topic',
        key: 'Id'
      }
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    LastUpdated: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'TopicVideo',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "IX_TopicVideo_TopicId",
        fields: [
          { name: "TopicId" },
        ]
      },
      {
        name: "IX_TopicVideo_VideoId",
        fields: [
          { name: "VideoId" },
        ]
      },
      {
        name: "PK_TopicVideo",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
