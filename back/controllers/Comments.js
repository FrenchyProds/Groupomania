var express = require('express')
var router = express.Router()

const token = require('../middleware/getUserIdByToken');

var db = require("../models");

router.get('/reddit/comments', async (req, res) => {
    const Comment = await db.Comment.findAll({ })
})

router.post('/reddit/:id/comment', async (req, res) => {
    const reddit = await Reddit.findByPk(req.params.id);

  if (!reddit) {
    return next({
      message: `Cette discute n'existe pas - ${req.params.id}`,
      statusCode: 404,
    });
  }

  const comment = await Comment.create({
    text: req.body.text,
    userId: token.userId,
    redditId: req.params.id,
  });

  res.status(200).json({ success: true, data: comment });
});

router.post('/gag/:id/comment', async (req, res) => {
    const gag = await Gag.findByPk(req.params.id);

  if (!gag) {
    return next({
      message: `Ce gag n'existe pas - ${req.params.id}`,
      statusCode: 404,
    });
  }

  const comment = await Comment.create({
    text: req.body.text,
    userId: token.userId,
    gagId: req.params.id,
  });

  res.status(200).json({ success: true, data: comment });
});

module.exports = router;
