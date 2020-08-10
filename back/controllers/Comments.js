var express = require('express')
var router = express.Router()
const token = require('../middleware/getUserIdByToken');
var db = require("../models");
const { Op } = require("sequelize")

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

exports.eachRedditComment = async (req, res) => {
  const Comment = await db.Comment.findOne({ where: {redditId: req.params.id, id: req.params.commentId},
    include: {
      model: db.User,
      attributes: ["username", "id"],
      },
    order: [["createdAt", "DESC"]],
    })

  const isLiked = await db.Like.findOne({
    where: {
      [Op.and]: [
        { commentId: req.params.commentId },
        { userId: token.getUserIdByToken(req) },
        { like: 1 },
      ],
    },
  });
  
  const isDisliked = await db.Like.findOne({
    where: {
      [Op.and]: [
        { commentId: req.params.commentId },
        { userId: token.getUserIdByToken(req) },
        { like: -1 },
      ],
    },
  });
  
  const likesCount = await db.Like.count({
    where: {
      [Op.and]: [{ commentId: req.params.commentId }, { like: 1 }],
    },
  });
  
  const dislikesCount = await db.Like.count({
    where: {
      [Op.and]: [{ commentId: req.params.commentId }, { like: -1 }],
    },
  });
  
  Comment.setDataValue("isLiked", !!isLiked);
  Comment.setDataValue("isDisliked", !!isDisliked);
  Comment.setDataValue("likesCount", likesCount);
  Comment.setDataValue("dislikesCount", dislikesCount);

  res.status(200).json({ Comment });
  return Comment;

}

exports.eachGagComment = async (req, res) => {
  const Comment = await db.Comment.findOne({ where: {gagId: req.params.id, id: req.params.commentId},
    include: {
      model: db.User,
      attributes: ["username", "id"],
      },
    order: [["createdAt", "DESC"]],
    })

  const isLiked = await db.Like.findOne({
    where: {
      [Op.and]: [
        { commentId: req.params.commentId },
        { userId: token.getUserIdByToken(req) },
        { like: 1 },
      ],
    },
  });
  
  const isDisliked = await db.Like.findOne({
    where: {
      [Op.and]: [
        { commentId: req.params.commentId },
        { userId: token.getUserIdByToken(req) },
        { like: -1 },
      ],
    },
  });
  
  const likesCount = await db.Like.count({
    where: {
      [Op.and]: [{ commentId: req.params.commentId }, { like: 1 }],
    },
  });
  
  const dislikesCount = await db.Like.count({
    where: {
      [Op.and]: [{ commentId: req.params.commentId }, { like: -1 }],
    },
  });
  
  Comment.setDataValue("isLiked", !!isLiked);
  Comment.setDataValue("isDisliked", !!isDisliked);
  Comment.setDataValue("likesCount", likesCount);
  Comment.setDataValue("dislikesCount", dislikesCount);

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

exports.reportRedditComment = async (req, res) => {
  await db.Comment.findOne({ where: { redditId: req.params.id, id: req.params.commentId }})
    .then(comment => {
      if(!comment) {
          return res.status(404).json({ error: 'Commentaire inconnu !'})
        } else {
        db.Comment.update( { isFlag: true }, { where: { redditId: req.params.id, id: req.params.commentId }})
        res.status(200).json({ data: comment })
        return comment;
        }
  })
}

exports.reportGagComment = async (req, res) => {
  await db.Comment.findOne({ where: { gagId: req.params.id, id: req.params.commentId }})
    .then(comment => {
      if(!comment) {
          return res.status(404).json({ error: 'Commentaire inconnu !'})
        } else {
        db.Comment.update( { isFlag: true }, { where: { gagId: req.params.id, id: req.params.commentId }})
        res.status(200).json({ data: comment })
        return comment;
        }
  })
}

exports.flaggedComments = async (req, res) => {
  const Comment = await db.Comment.findAll({ where: { isFlag : 1 },
    include: {
      model: db.User,
      attributes: ["username"],
    },
    order: [["createdAt", "DESC"]],
    })
    res.status(200).json({ Comment })
    return Comment;
}




