var bcrypt = require('bcrypt')

exports.cryptPassword = function(password) {
    bcrypt.hash(password, 10, (err, encrypted) => {
        user.password = encrypted
        next()
    })
 };