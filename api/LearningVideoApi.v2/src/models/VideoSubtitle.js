const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('VideoSubtitle', {
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
    Url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    SrcLang: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    IsDefault: {
      type: DataTypes.BOOLEAN,
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
    FileName: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ""
    }
  }, {
    sequelize,
    tableName: 'VideoSubtitle',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "IX_VideoSubtitle_VideoId",
        fields: [
          { name: "VideoId" },
        ]
      },
      {
        name: "PK_VideoSubtitle",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
