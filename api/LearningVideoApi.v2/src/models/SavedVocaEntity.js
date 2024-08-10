const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SavedVocaEntity', {
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
    VocabularyId: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: 'Vocabulary',
        key: 'OriginWord'
      }
    },
    ShowedTo: {
      type: DataTypes.DOUBLE,
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
    ShowedFrom: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0
    },
    Sentence: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'SavedVocaEntity',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "IX_SavedVocaEntity_UserId",
        fields: [
          { name: "UserId" },
        ]
      },
      {
        name: "IX_SavedVocaEntity_VideoId",
        fields: [
          { name: "VideoId" },
        ]
      },
      {
        name: "IX_SavedVocaEntity_VocabularyId",
        fields: [
          { name: "VocabularyId" },
        ]
      },
      {
        name: "PK_SavedVocaEntity",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
