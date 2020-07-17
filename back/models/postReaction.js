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
        },redditId: {
            type: DataTypes.INTEGER,
            references: { 
                model: db.reddit,
                key: 'id' },
            allowNull: true,
        },userId: {
            type: DataTypes.INTEGER,
            references: {
                 model: db.user, 
                 key: 'id' },
            allowNull: true,
        },
    },
);
    postReaction.associate = (models) => {
    postReaction.belongsTo(models.Reddit, { foreignKey: 'redditId', sourceKey:'id' }),
    postReaction.belongsTo(models.User, { foreignKey: 'userId', sourceKey:'id' })
    };
    return postReaction
}