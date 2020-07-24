require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.getUserIdByToken = (req) => {
    console.log(req.headers)
    const token = req.headers.authorization.replace("Bearer ", "").trim();
    console.log(token)
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET,);
    const userId = decodedToken.userId;
    console.log(userId)
  return userId;
}