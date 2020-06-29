// var db = require('../models')

'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
        firstName : DataTypes.STRING,
        lastName : DataTypes.STRING,
        email : { 
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password : {
          type: DataTypes.STRING,
          allowNull: false,
        },
        username : { 
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        avatar : DataTypes.STRING,
        department : DataTypes.STRING,
        darkMode: DataTypes.BOOLEAN,
  });
  User.associate = (models) => {
    // hasMany association: foreign key (userId) stored on target model (Text)
    User.hasMany(models.Reddit, { foreignKey: 'userId', sourceKey: 'id' });
    User.hasMany(models.Gag, { foreignKey: 'userId', sourceKey: 'id' });
    User.hasMany(models.redditComment, { foreignKey: 'userId', sourceKey: 'id' });
    User.hasMany(models.gagComment, { foreignKey: 'userId', sourceKey: 'id' })
};
  return User;
};
