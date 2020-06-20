const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const sequelize = require('sequelize')

const User = require('../models/user');

var schema = new passwordValidator();

schema
.is().min(8)  // Minimum 8 characters long
.is().max(30) // Maximum 30 characters long
.has().not().spaces();

exports.findOne = (req, res) => {  
    User.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id="
        });
      });
  };