'use strict';

const { DataTypes } = require("sequelize");

module.exports = function(sequelize, Datatypes) {
    var user = sequelize.define('user', {
        firstName : DataTypes.STRING,
        lastName : DataTypes.STRING,
        email : DataTypes.STRING,
        password : DataTypes.STRING,
        userId : DataTypes.UUID,
        username : DataTypes.STRING,
        avatar : DataTypes.STRING,
        department : DataTypes.STRING,
        darkMode : DataTypes.BOOLEAN
    }, {
        classMethods: {
            associate: function(models) {

            }
        }
    });
    return user;
};