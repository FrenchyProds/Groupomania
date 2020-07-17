var models  = require('../models');
var express = require('express');
var router  = express.Router();
const bcrypt = require('bcrypt')

router.get('/user', function(req, res) {
  models.User.findAll({
  }).then(function(users) {
    res.send({
      title: 'Sequelize: Express Example',
      users: users,
    });
  });
});

router.post('/user/register', function(req, res) {
  // bcrypt.hash(req.body.password, 10)
  // .then(hash => {
    const user = models.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    return res.send(res).status(201).json({ message: 'User created !'})
    .catch(error => res.status(400).json({ error }));
    // })
})

module.exports = router;