const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Topic', {
    Id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    Title: {
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
    }
  }, {
    sequelize,
    tableName: 'Topic',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK_Topic",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
