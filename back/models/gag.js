var db = require("../models");
const { Sequelize } = require('sequelize')

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Gag = sequelize.define('Gag', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    title: DataTypes.STRING,
    postType:{ 
      type: DataTypes.STRING,
      default: 'gag',
    },
    content: DataTypes.STRING,
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
  Gag.associate = (models) => {
    Gag.hasMany(models.Comment, { foreignKey: 'gagId', sourceKey: 'id' }),
    Gag.belongsTo(models.User, { onDelete: "CASCADE", foreignKey: 'userId', sourceKey:'id' })
};
  return Gag;
};