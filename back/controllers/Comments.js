var express = require('express')
var router = express.Router()
const token = require('../middleware/getUserIdByToken');
var db = require("../models");

router.get('/reddit/:id/comments/', async (req, res) => {
    const Comment = await db.Comment.findAll({ where: { redditId: req.params.id },
      include: {
        model: db.User,
        attributes: ["username"],
        },
      order: [["createdAt", "DESC"]],
    })
    res.status(200).json({  data: Comment });
    return Comment;
})

router.post('/reddit/:id/comment', async (req, res) => {
    const reddit = await db.Reddit.findByPk(req.params.id);

  if (!reddit) {
    return next({
      message: `Cette discute n'existe pas - ${req.params.id}`,
      statusCode: 404,
    });
  }

  const comment = await db.Comment.create({
    content: req.body.content,
    userId: token.getUserIdByToken(req),
    redditId: req.params.id,
  });

  res.status(200).json({ success: true, data: comment });
});

router.get('/gag/:id/comments/', async (req, res) => {
  const Comment = await db.Comment.findAll({ where: { gagId: req.params.id },
    include: {
      model: db.User,
      attributes: ["username"],
      },
    order: [["createdAt", "DESC"]],
  })
  res.status(200).json({  data: Comment });
  return Comment;
})

router.post('/gag/:id/comment', async (req, res) => {
    const gag = await db.Gag.findByPk(req.params.id);

  if (!gag) {
    return next({
      message: `Ce gag n'existe pas - ${req.params.id}`,
      statusCode: 404,
    });
  }

  const comment = await db.Comment.create({
    content: req.body.content,
    userId: token.getUserIdByToken(req),
    gagId: req.params.id,
  });

  res.status(200).json({ success: true, data: comment });
});

router.get('/comments/byUser/:id', async (req, res) => {
  const Comment = await db.Comment.findAll({ where: { userId: req.params.id },
    include: {
      model: db.Reddit || db.Gag,
      attributes: ["title"],
    },
    order: [["createdAt", "DESC"]],
  })
  res.status(200).json({  data: Comment });
  return Comment;
})


module.exports = router;
