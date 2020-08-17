require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.getUserIdByToken = (req) => {
    const token = req.headers.authorization.replace("Bearer ", "").trim();
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET,);
    const userId = decodedToken.userId;
  return userId;
}