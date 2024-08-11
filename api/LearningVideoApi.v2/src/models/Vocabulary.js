const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Vocabulary', {
    OriginWord: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    VietnameseMean: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    WordType: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Pinyin: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    SimiliarMeaning: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    OppositeMeaning: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Example: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    LastUpdated: {
      type: DataTypes.DATE,
      allowNull: false
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    SinoVietnamese: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Level: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Vocabulary',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK_Vocabulary",
        unique: true,
        fields: [
          { name: "OriginWord" },
        ]
      },
    ]
  });
};
