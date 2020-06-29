var db = require("../models")

module.exports = (sequelize, DataTypes) => {
    var postReaction =  sequelize.define('postReaction', {
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
            //     model: db.reddit,
            //     key: 'id' },
            allowNull: false
        },userId: {
            type: DataTypes.INTEGER,
            // references: {
            //      model: db.user, 
            //      key: 'id' },
            allowNull: false
        },
    },
);
    return postReaction
}