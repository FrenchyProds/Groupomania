var db = require('../models');
const { Sequelize } = require('sequelize')

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reddit = sequelize.define('Reddit', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    postType:{ 
      type: DataTypes.STRING,
      default: 'reddit',
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
  Reddit.associate = (models) => {
    Reddit.hasMany(models.Comment, { foreignKey: 'commentId', sourceKey: 'id' }),
    Reddit.belongsTo(models.User, { foreignKey: 'userId', sourceKey:'id' }),
    Reddit.hasMany(models.Like, { foreignKey: 'redditId', sourceKey: 'id' })
};
  return Reddit;
}