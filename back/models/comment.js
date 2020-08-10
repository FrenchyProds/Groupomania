var db = require('.');
const { Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    var Comment =  sequelize.define('Comment', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
          },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },
        userId: {
            type: DataTypes.UUID,
            references: { 
                model: db.User, 
                key: 'id' },
            allowNull: false
        },
        redditId: {
            type: DataTypes.UUID,
            references: { 
                model: db.Reddit, 
                key: 'id' },
            allowNull: true
        },
        gagId: {
            type: DataTypes.UUID,
            references: { 
                model: db.Gag, 
                key: 'id' },
            allowNull: true
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
    Comment.associate = (models) => {
    Comment.belongsTo(models.Reddit, { onDelete: "CASCADE", foreignKey: 'redditId', sourceKey:'id' }),
    Comment.belongsTo(models.Gag, { onDelete: "CASCADE", foreignKey: 'gagId', sourceKey:'id'}),
    Comment.belongsTo(models.User, { onDelete: "CASCADE", foreignKey: 'userId', sourceKey: 'id'}),
    Comment.hasMany(models.Like, { foreignKey: 'likeId', sourceKey: 'id' })
};
    return Comment
}