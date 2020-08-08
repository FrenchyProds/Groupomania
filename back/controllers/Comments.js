var express = require('express')
var router = express.Router()
const token = require('../middleware/getUserIdByToken');
var db = require("../models");

exports.redditComments = async (req, res) => {
    const Comment = await db.Comment.findAll({ where: { redditId: req.params.id },
      include: {
        model: db.User,
        attributes: ["username", "id"],
        },
      order: [["createdAt", "DESC"]],
    })
    res.status(200).json({ Comment });
    return Comment;
}

exports.gagComments = async (req, res) => {
  const Comment = await db.Comment.findAll({ where: { gagId: req.params.id },
    include: {
      model: db.User,
      attributes: ["username", "id"],
      },
    order: [["createdAt", "DESC"]],
  })
  res.status(200).json({  data: Comment });
  return Comment;
}

exports.createRedditComment = async (req, res) => {
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
};



exports.createGagComment = async (req, res) => {
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
};

exports.findGagCommentByUser = async (req, res) => {
  const Comment = await db.Comment.findAll({ where: { userId: req.params.id, },
    include: {
      model: db.Gag,
      attributes: ["title",],
    },
    order: [["createdAt", "DESC"]],
  })
  res.status(200).json({  data: Comment });
  return Comment;
}

exports.findRedditCommentByUser = async (req, res) => {
  const Comment = await db.Comment.findAll({ where: { userId: req.params.id },
    include: {
      model: db.Reddit,
      attributes: ["title",],
    },
    order: [["createdAt", "DESC"]],
  })
  res.status(200).json({  data: Comment });
  return Comment;
}


// router.put(':id/report', async (req, res) => {
//   await db.Comment.findOne({ where: { id: req.comment.id }})
//   console.log(req.comment.id)
//     .then(comment => {
//       if(!comment) {
//           return res.status(404).json({ error: 'Commentaire inconnu !'})
//         } else {
//         db.Comment.update( { isFlag: true }, { where: { id: req.comment.id }})
//         res.status(200).json({ data: comment })
//         return comment;
//         }
//   })
// })


