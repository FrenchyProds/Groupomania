var express = require('express')
var router = express.Router()

var db = require("../models");

router.post('/reddit/post', async (req, res) => {
    const Reddit = await db.Reddit.create({
        include: {
            model: db.User,
            attributes: ["username", "id"],
        },
        title: req.body.title,
        content: req.body.content,
        userId: req.User.id,
      });
      res.status(200).json({ data: Reddit })
      .catch(error => res.status(500).json({ error }))
});

router.get('/reddit', async (req, res) => {
    const Reddit = await db.Reddit.findAll({
        include: {
            model: db.User,
            attributes: ["username"],
          },
        order: [["createdAt", "DESC"]],
       })
    //    console.log(Reddit)
       res.status(200).json({ data: Reddit })
       return Reddit;
});

router.post('/gag/post', async (req, res) => {
    const Gag = await db.Gag.create({
        include: {
            model: db.User,
            attributes: ["username", "id"],
        },
        title: req.body.title,
        content: req.body.content,
        userId: req.user.id,
      });
      res.status(200).json({ data: Gag });
      return Gag;
});

router.get('/gag', async (req, res) => {
    const Gag = await db.Gag.findAll({
        include: {
            model: db.User,
            attributes: ["username"],
          },
        order: [["createdAt", "DESC"]],
       })
    //    console.log(Gag)
       res.status(200).json({ data: Gag })
       return Gag;
});

module.exports = router;



