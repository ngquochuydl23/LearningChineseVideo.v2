const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    Id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    FullName: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    PhoneNumber: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    HashPassword: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Birthday: {
      type: DataTypes.DATE,
      allowNull: false
    },
    LastLogin: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Gender: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Avatar: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Role: {
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
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'User',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PK_User",
        unique: true,
        fields: [
          { name: "Id" },
        ]
      },
    ]
  });
};
