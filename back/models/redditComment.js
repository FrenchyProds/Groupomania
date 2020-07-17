var db = require('../models');

module.exports = (sequelize, DataTypes) => {
    var redditComment =  sequelize.define('redditComment', {
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
        redditId: {
            type: DataTypes.INTEGER,
            references: { 
                model: db.Reddit, 
                key: 'id' },
            allowNull: true
        }
    });
    redditComment.associate = (models) => {
    redditComment.hasMany(models.commentReaction, { foreignKey: 'redditCommentId', sourceKey: 'id' }),
    redditComment.belongsTo(models.Reddit, { foreignKey: 'redditId', sourceKey:'id' })
};
    return redditComment
}