'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
        firstName : DataTypes.STRING,
        lastName : DataTypes.STRING,
        email : DataTypes.STRING,
        password : DataTypes.STRING,
        username : DataTypes.STRING,
        avatar : DataTypes.STRING,
        department : DataTypes.STRING,
  });
  return User;
};
