'use strict';
module.exports = (sequelize, DataTypes) => {
  const reddit = sequelize.define('reddit', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  }, {});
  reddit.associate = function(models) {
    reddit.hasMany(models.User, {
      foreignKey:'id',
      foreignKey:'username'
    })
  };
  return reddit;
};