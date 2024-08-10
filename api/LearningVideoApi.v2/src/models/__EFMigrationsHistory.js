const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('__EFMigrationsHistory', {
    MigrationId: {
      type: DataTypes.STRING(150),
      allowNull: false,
      primaryKey: true
    },
    ProductVersion: {
      type: DataTypes.STRING(32),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: '__EFMigrationsHistory',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK___EFMigrationsHistory",
        unique: true,
        fields: [
          { name: "MigrationId" },
        ]
      },
    ]
  });
};
