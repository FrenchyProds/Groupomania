var express = require('express');
var router  = express.Router();
const likeCtrl = require('../controllers/Likes');
const auth = require("../middleware/auth");


router.get('/reddit/:id/like', likeCtrl.likeReddit);
router.get('/gag/:id/like', likeCtrl.likeGag);
router.get('/reddit/:id/dislike', likeCtrl.dislikeReddit);
router.get('/gag/:id/dislike', likeCtrl.dislikeGag);
router.get('/reddit/:id/comment/:commentId/like', likeCtrl.likeComment);
router.get('/gag/:id/comment/:commentId/like', likeCtrl.likeComment);
router.get('/reddit/:id/comment/:commentId/dislike', likeCtrl.dislikeComment);
router.get('/gag/:id/comment/:commentId/dislike', likeCtrl.dislikeComment);

module.exports = router;