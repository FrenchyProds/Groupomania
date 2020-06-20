var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/user', function(req, res) {
  models.User.findAll({
  }).then(function(users) {
    res.send({
      title: 'Sequelize: Express Example',
      users: users,
    });
  });
});

module.exports = router;