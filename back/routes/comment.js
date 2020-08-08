var express = require('express');
var router  = express.Router();
const commentCtrl = require('../controllers/Comments')
const auth = require("../middleware/auth");

router.get('/reddit/:id/comments/', commentCtrl.redditComments);
router.get('/gag/:id/comments/', commentCtrl.gagComments);
router.post('/reddit/:id/comment', commentCtrl.createRedditComment);
router.post('/gag/:id/comment', commentCtrl.createGagComment);
router.get('/comments/Reddit/byUser/:id', commentCtrl.findRedditCommentByUser);
router.get('/comments/Gag/byUser/:id', commentCtrl.findGagCommentByUser);

module.exports = router;