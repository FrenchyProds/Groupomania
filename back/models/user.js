const { Sequelize } = require('sequelize')

'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
        id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        firstName : {
          type: DataTypes.STRING,
          validate: {
            len: [3, 20]
          }
        },
        lastName : { 
          type: DataTypes.STRING,
          validate: {
            len: [3, 30]
          }
        },
        email : { 
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true
          }
        },
        password : {
          type: DataTypes.STRING,
          allowNull: false,
        },
        username : { 
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            len: [4, 20],
            isAlphanumeric: true,
          }
        },
        avatar : { 
          type: DataTypes.STRING,
          validate: {
            isUrl: true
          }
        },
        department : { 
          type: DataTypes.STRING,
          validate: {
            len: [3, 20]
          }
        },
        isAdmin: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isFlag: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        hasBeenModerated: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
  });
  User.associate = (models) => {
    // hasMany association: foreign key (userId) stored on target model (Text)
    User.hasMany(models.Reddit, { foreignKey: 'userId', sourceKey: 'id' });
    User.hasMany(models.Gag, { foreignKey: 'userId', sourceKey: 'id' });
    User.hasMany(models.Comment, { foreignKey: 'userId', sourceKey: 'id' });
};
  return User;
};
