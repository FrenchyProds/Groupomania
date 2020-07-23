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

  const payload = { id: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  console.log(token)

  res.status(200).json({ success: true, data: token });
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

  const payload = { id: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
  res.status(200).json({ success: true, data: token });
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
             
             console.log(req.params.id)
             return res.status(404).json({ error: 'Utilisateur inconnu !'})
           } else {
           res.status(200).json({ data: user })
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
        console.log(req.params.id)
        res.status(200).json({ data: user });
        console.log(user)
        return user;
      };

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
