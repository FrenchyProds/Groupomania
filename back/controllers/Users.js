var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')

var db = require("../models");

   router.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, 10,)  // We hash and salt the password
    .then(hash => {
       db.User.create({
         username: req.body.username,
         email: req.body.email,
         password: hash,
       })
        .then(() => res.status(201).json({ message: 'User created !'}))
        .catch(error => res.status(400).json({ error }));
      })
   })

   router.post('/login', (req, res) => {
     db.User.findOne({ email: req.body.email })
     .then(user => {
        if(!user) {
          return res.status(401).json({ error: 'Email inconnue !'})
        }
        bcrypt.compare(req.body.password, user.password)  // If the email exists, we first compare the password in the DB to the one that was input
                .then(valid => {
                    if (!valid) { // If the passwords don't match, error !
                        return res.status(401).json({ error: 'Wrong Password !'})
                    }
                    res.status(200).json({   // However if the passwords match, the user is logged in
                        userId: user._id,
                        token: jwt.sign(  // And a 24 hour token is generated, which will be compared throughout the connection
                            { userId: user.id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
     });

    //  router.post('/postReddit', (req, res) => {
      
    //  })

    // router.post('/postGag', (req, res) => {
      
    // })

    // router.put('/postReddit/id', (req, res) => {

    // })

    // router.put('/postGag/id', (req, res) => {
      
    // })

    // router.delete('/postReddit/id', (req, res) => {

    // })

    // router.delete('/postGag/id', (req, res) => {
      // if (userId = req.data.userId && this.post == postGag.id) {

      // }
    // })


  module.exports = router;