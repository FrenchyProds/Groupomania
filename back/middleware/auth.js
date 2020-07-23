require('dotenv').config();
const db = require('../models');
const token = require('./getUserIdByToken');

exports.admin = async (req, res, next) => {
  const userId = token.getUserIdByToken(req);

  let user = await db.User.findOne({ where: { id: userId }})
  
  if (user.isAdmin == true) {
    return next();
  }

  return res.status(401).json({
    message: "Autorisation refusée, seuls les admins peuvent utiliser cette route",
    statusCode: 401
  });
};

exports.me = async (req, res, next) => {
  const userId = token.getUserIdByToken(req);

  if (req.params.id == userId) {
    return next();
  }

  return res.status(401).json({
    message: "Autorisation refusée, vous n'avez pas le droit d'utiliser cette route",
    statusCode: 401
  })
};