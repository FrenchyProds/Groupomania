const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize("groupomania", "root", "", {
    host: "localhost",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to MySQL Database established successfully !');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db