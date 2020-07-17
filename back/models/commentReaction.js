var db = require('../models')

module.exports = (sequelize, DataTypes) => {
    var commentReaction =  sequelize.define('commentReaction', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        like: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        redditCommentId: {
            type: DataTypes.INTEGER,
            references: { 
                model: db.redditComment, 
                key: 'id' },
            allowNull: true
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                 model: db.User, 
                 key: 'id' },
            allowNull: true
        },
    });
    commentReaction.associate = (models) => {
    commentReaction.belongsTo(models.redditComment, { foreignKey: 'redditCommentId', sourceKey:'id' }),
    commentReaction.belongsTo(models.User, { foreignKey: 'userId', sourceKey:'id' })
    };
    return commentReaction
}