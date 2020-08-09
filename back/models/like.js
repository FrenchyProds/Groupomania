const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  var Like = sequelize.define("Like", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    like: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Like.associate = (models) => {
  // likes association
models.User.belongsToMany(models.Reddit, { through: Like, foreignKey: "userId" });
models.User.belongsToMany(models.Gag, { through: Like, foreignKey: "userId" });
// models.Reddit.belongsToMany(models.User, { through: Like, foreignKey: "redditId" });
// models.Gag.belongsToMany(models.User, { through: Like, foreignKey: "gagId" });
  }
  return Like;
}