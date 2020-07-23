require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.getUserIdByToken = (req) => {
  const token = req.headers.authorization.replace("Bearer", "").trim();
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const id = decoded.id;
  
  return id;
}