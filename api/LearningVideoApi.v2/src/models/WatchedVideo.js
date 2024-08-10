const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('WatchedVideo', {
    Id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    UserId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'User',
        key: 'Id'
      }
    },
    VideoId: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: 'Video',
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
    tableName: 'WatchedVideo',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "IX_WatchedVideo_UserId",
        fields: [
          { name: "UserId" },
        ]
      },
      {
        name: "IX_WatchedVideo_VideoId",
        fields: [
          { name: "VideoId" },
        ]
      },
      {
        name: "PK_WatchedVideo",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
