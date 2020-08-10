var express = require('express');
var router  = express.Router();
const commentCtrl = require('../controllers/Comments')
const auth = require("../middleware/auth");

router.get('/reddit/:id/comments/', commentCtrl.redditComments);
router.get('/gag/:id/comments/', commentCtrl.gagComments);
router.get('/reddit/:id/comment/:commentId/', commentCtrl.eachRedditComment);
router.get('/gag/:id/comment/:commentId/', commentCtrl.eachGagComment);
router.post('/reddit/:id/comment', commentCtrl.createRedditComment);
router.post('/gag/:id/comment', commentCtrl.createGagComment);
router.get('/comments/Reddit/byUser/:id', commentCtrl.findRedditCommentByUser);
router.get('/comments/Gag/byUser/:id', commentCtrl.findGagCommentByUser);
router.put('/reddit/:id/comment/report/:commentId', commentCtrl.reportRedditComment);
router.put('/gag/:id/comment/report/:commentId', commentCtrl.reportGagComment);
router.get('/flaggedComments', commentCtrl.flaggedComments);

module.exports = router;