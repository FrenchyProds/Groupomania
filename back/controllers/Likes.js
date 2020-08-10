var express = require('express')
var router = express.Router()
const token = require('../middleware/getUserIdByToken');
var db = require("../models");
const { Op } = require("sequelize")
const asyncHandler = require('../middleware/asyncHandler')

exports.likeReddit = asyncHandler(async (req, res, next) => {
    const reddit = await db.Reddit.findByPk(req.params.id);
  
    if (!reddit) {
      return next({
        message: `Aucune discute avec - ${req.params.id} comme ID`,
        statusCode: 404,
      });
    }
  
    const liked = await db.Like.findOne({
      where: {
        userId: token.getUserIdByToken(req),
        RedditId: req.params.id,
        like: 1,
      },
    });
  
    const disliked = await db.Like.findOne({
      where: {
        userId: token.getUserIdByToken(req),
        RedditId: req.params.id,
        like: -1,
      },
    });
  
    if (liked) {
      await liked.destroy();
    } else if (disliked) {
      disliked.like = 1;
      await disliked.save();
    } else {
      await db.Like.create({
        userId: token.getUserIdByToken(req),
        RedditId: req.params.id,
        like: 1,
      });
    }
  
    res.json({ success: true, data: {} });
  });

  exports.likeGag = asyncHandler(async (req, res, next) => {
    const gag = await db.Gag.findByPk(req.params.id);
  
    if (!gag) {
      return next({
        message: `Aucun gag avec - ${req.params.id} comme ID`,
        statusCode: 404,
      });
    }
  
    const liked = await db.Like.findOne({
      where: {
        userId: token.getUserIdByToken(req),
        GagId: req.params.id,
        like: 1,
      },
    });
  
    const disliked = await db.Like.findOne({
      where: {
        userId: token.getUserIdByToken(req),
        GagId: req.params.id,
        like: -1,
      },
    });
  
    if (liked) {
      await liked.destroy();
    } else if (disliked) {
      disliked.like = 1;
      await disliked.save();
    } else {
      await db.Like.create({
        userId: token.getUserIdByToken(req),
        GagId: req.params.id,
        like: 1,
      });
    }
  
    res.json({ success: true, data: {} });
  });
 
  exports.dislikeReddit = asyncHandler(async (req, res, next) => {
    const reddit = await db.Reddit.findByPk(req.params.id);
  
    if (!reddit) {
      return next({
        message: `Aucune discute avec - ${req.params.id} comme ID`,
        statusCode: 404,
      });
    }
  
    const liked = await db.Like.findOne({
      where: {
        userId: token.getUserIdByToken(req),
        RedditId: req.params.id,
        like: 1,
      },
    });
  
    const disliked = await db.Like.findOne({
      where: {
        userId: token.getUserIdByToken(req),
        RedditId: req.params.id,
        like: -1,
      },
    });
  
    if (disliked) {
      await disliked.destroy();
    } else if (liked) {
      liked.like = -1;
      await liked.save();
    } else {
      await db.Like.create({
        userId: token.getUserIdByToken(req),
        RedditId: req.params.id,
        like: -1,
      });
    }
  
    res.json({ success: true, data: {} });
  });


  exports.dislikeGag = asyncHandler(async (req, res, next) => {
    const gag = await db.Gag.findByPk(req.params.id);
  
    if (!gag) {
      return next({
        message: `Aucun gag avec - ${req.params.id} comme ID`,
        statusCode: 404,
      });
    }
  
    const liked = await db.Like.findOne({
      where: {
        userId: token.getUserIdByToken(req),
        GagId: req.params.id,
        like: 1,
      },
    });
  
    const disliked = await db.Like.findOne({
      where: {
        userId: token.getUserIdByToken(req),
        GagId: req.params.id,
        like: -1,
      },
    });
  
    if (disliked) {
      await disliked.destroy();
    } else if (liked) {
      liked.like = -1;
      await liked.save();
    } else {
      await db.Like.create({
        userId: token.getUserIdByToken(req),
        GagId: req.params.id,
        like: -1,
      });
    }
  
    res.json({ success: true, data: {} });
  });

  exports.likeComment = asyncHandler(async (req, res, next) => {
    const comment = await db.Comment.findByPk(req.params.commentId);
  
    if (!comment) {
      return next({
        message: `Aucun commentaire avec - ${req.params.commentId} comme ID`,
        statusCode: 404,
      });
    }
  
    const liked = await db.Like.findOne({
      where: {
        userId: token.getUserIdByToken(req),
        CommentId: req.params.commentId,
        like: 1,
      },
    });
  
    const disliked = await db.Like.findOne({
      where: {
        userId: token.getUserIdByToken(req),
        CommentId: req.params.commentId,
        like: -1,
      },
    });
  
    if (liked) {
      await liked.destroy();
    } else if (disliked) {
      disliked.like = 1;
      await disliked.save();
    } else {
      await db.Like.create({
        userId: token.getUserIdByToken(req),
        CommentId: req.params.commentId,
        like: 1,
      });
    }
  
    res.json({ success: true, data: {} });
  });

  exports.dislikeComment = asyncHandler(async (req, res, next) => {
    const comment = await db.Comment.findByPk(req.params.commentId);
  
    if (!comment) {
      return next({
        message: `Aucun commentaire avec - ${req.params.commentId} comme ID`,
        statusCode: 404,
      });
    }
  
    const liked = await db.Like.findOne({
      where: {
        userId: token.getUserIdByToken(req),
        CommentId: req.params.commentId,
        like: 1,
      },
    });
  
    const disliked = await db.Like.findOne({
      where: {
        userId: token.getUserIdByToken(req),
        CommentId: req.params.commentId,
        like: -1,
      },
    });
  
    if (disliked) {
      await disliked.destroy();
    } else if (liked) {
      liked.like = -1;
      await liked.save();
    } else {
      await db.Like.create({
        userId: token.getUserIdByToken(req),
        CommentId: req.params.commentId,
        like: -1,
      });
    }
  
    res.json({ success: true, data: {} });
  });