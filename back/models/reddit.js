var db = require('../models');

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reddit = sequelize.define('Reddit', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      references: { 
          model: db.User, 
          key: 'id' },
      allowNull: false
    },  
  });
  Reddit.associate = (models) => {
    Reddit.hasMany(models.redditComment, { foreignKey: 'redditId', sourceKey: 'id' })
    // hasMany association: foreign key (textId) stored on target model (redditComment)
};
  return Reddit;
}