var db = require("../models");

'use strict';

module.exports = (sequelize, DataTypes) => {
  const Gag = sequelize.define('Gag', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
    type: DataTypes.INTEGER,
    references: { 
        model: db.user, 
        key: 'id' },
    allowNull: false
    },  
});
  Gag.associate = (models) => {
    Gag.hasMany(models.gagComment, { foreignKey: 'gagId', sourceKey: 'id' }),
    Gag.belongsTo(models.User, { foreignKey: 'userId', sourceKey:'id' })
    // hasMany association: foreign key (textId) stored on target model (redditComment)
};
  return Gag;
};