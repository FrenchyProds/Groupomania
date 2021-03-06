var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt')
var db = require("../models");
var asyncHandler = require('../middleware/asyncHandler')
require('dotenv').config();


exports.register = asyncHandler(async (req, res, next) => {
  const user = await db.User.create(req.body);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  res.status(200).json({ success : true });
});

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await db.User.findOne({ where: { email } });

  if (!user) {
    return next({
      message: "The email is not yet registered",
      statusCode: 400,
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return next({ message: "The password does not match", statusCode: 400 });
  }

  res.status(200).json({ 
    token: jwt.sign(  // And a 24 hour token is generated, which will be compared throughout the connection
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
    ) 
  });
};


     exports.home = (req, res, next) => {
      db.Reddit.findAll({
       include: {
         model: db.User,
         attributes: ["username"],
       },
     order: [["createdAt", "DESC"]],
      }),
      db.Gag.findAll({
       include: {
         model: db.User,
         attributes: ["username"],
       },
     order: [["createdAt", "DESC"]],
      })
      res.status(200).json({ data: Reddit, Gag })
    };


      exports.userMe = async (req, res, next) => {
        await db.User.findOne({ where: {  id: req.params.id } })
        .then(user => {
           if(!user) {
             return res.status(404).json({ error: 'Utilisateur inconnu !'})
           } else {
           res.status(200).json({ user })
           return user;
           }
         })
       };

      exports.updateMe = async (req, res) => {
        await db.User.update(req.body, {
          where: { id: req.params.id }
        });
        const user = await db.User.findByPk(req.params.id, {
          attributes: [
            "id",
            "email",
            "firstName",
            "lastName",
            "username",
            "avatar",
            "department",
            "password"
          ]
        });
        res.status(200).json({ data: user });
        return user;
      };

      exports.updatePassword = async (req, res) => {
        const user = await db.User.findOne({ where: { id: req.params.id } });
        let password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        await db.User.update( {password: password}, {where: { id: req.params.id}})
          if(!user) {
            return res.status(404).json({ error: 'Utilisateur inconnu !'})
          } else {
          res.status(200).json({ user })
          return user;
          }
        }

      exports.deleteMe = async (req, res) => {
        await db.User.destroy( {
          where : { id : req.params.id }
        }).then(user => {
          if(!user) {
            return res.status(404).json({ error: 'Utilisateur inconnu !'})
          } else {
          res.status(200).json({ success : true })
      }
    })
  }

      exports.findUser = async (req, res) => {
        await db.User.findOne( {
          where: { username: req.params.username}
        })
          .then(user => {
            if(!user) {
              return res.status(404).json({ error: 'Utilisateur inconnu !'})
            } else {
            res.status(200).json({ user })
            return user;
            }
          })
      }

     exports.reportUser = async (req, res) => {
        await db.User.findOne({ where: { username: req.params.username }})
          .then(user => {
            if(!user) {
                return res.status(404).json({ error: 'Utilisateur inconnu !'})
              } else {
              db.User.update( { isFlag: true }, { where: { username: req.params.username }})
              res.status(200).json({ data: user })
              return user;
              }
        })
    }

    exports.flaggedUsers = async (req, res) => {
     const user =  await db.User.findAll({ where: { isFlag: 1 }})
            res.status(200).json({ data: user })
            return user;
  }