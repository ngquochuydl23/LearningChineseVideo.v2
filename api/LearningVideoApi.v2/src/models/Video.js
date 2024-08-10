const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Video', {
    Id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    Title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ViewerCount: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    CommentCount: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    VideoUrl: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Thumbnail: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    MimeType: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    LastUpdated: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Duration: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    Level: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ""
    },
    LikeCount: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    },
    SearchVector: {
      type: "TSVECTOR",
      allowNull: true
    },
    PlainTextWithTopic: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    HasAutoLabeled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'Video',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "IX_Video_SearchVector",
        fields: [
          { name: "SearchVector" },
        ]
      },
      {
        name: "PK_Video",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
