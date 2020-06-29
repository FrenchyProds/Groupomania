var db = require('../models')

module.exports = (sequelize, DataTypes) => {
    var commentReaction =  sequelize.define('commentReaction', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },like: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },postId: {
            type: DataTypes.INTEGER,
            // references: { 
            //     model: db.redditComment, 
            //     key: 'id' },
            allowNull: false
        },userId: {
            type: DataTypes.INTEGER,
            // references: {
            //      model: db.User, 
            //      key: 'id' },
            allowNull: false
        },
    },
);
    return commentReaction
}