const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mailValidator = require('email-validator');
const passwordValidator = require('password-validator');

const User = require('../models/user');

var schema = new passwordValidator();

schema
.is().min(8)  // Minimum 8 characters long
.is().max(30) // Maximum 30 characters long
.has().not().spaces();

exports.signup = (req, res, next) => {  // Function that allows users to register an account
    if (!mailValidator.validate(req.body.email) || (!schema.validate(req.body.password)) || (!req.body.first_name) || (!req.body.last_name)) {  // We check email && password validity
        throw { error: "Merci de bien vouloir entrer une adresse email et un mot de passe valide !" }  // Fails if invalid
    } else if (mailValidator.validate(req.body.email) && (schema.validate(req.body.password)) && (req.body.first_name) && (req.body.last_name)) {  // If both are valid
    bcrypt.hash(req.body.password, 10)  // We hash and salt the password
        .then(hash => {  // We then create an object containing the user information
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()  // And we push this information to the DB
                .then(() => res.status(201).json({ message: 'Votre utilisateur a été crée !'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error: 'Votre mot de passe doit faire entre 8 et 30 caractères et ne peut pas contenir un espace' }));
    }
};

exports.getOneUser = (req, res) => {
    const users = User.findAll();  
}