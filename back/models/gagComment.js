var db = require('../models');

module.exports = (sequelize, DataTypes) => {
    var gagComment =  sequelize.define('gagComment', {
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },
        userId: {
            type: DataTypes.INTEGER,
            references: { 
                model: db.User, 
                key: 'id' },
            allowNull: true
        },
        gagId: {
            type: DataTypes.INTEGER,
            references: { 
                model: db.Gag, 
                key: 'id' },
            allowNull: true
        }
    },
);
    return gagComment
}