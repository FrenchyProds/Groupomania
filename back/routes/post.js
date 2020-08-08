var express = require('express');
var router  = express.Router();
const postCtrl = require('../controllers/Posts')
const auth = require("../middleware/auth");

router.post('/reddit/post', postCtrl.createReddit);
router.post('/gag/post', postCtrl.createGag);
router.get('/reddit', postCtrl.getAllReddits);
router.get('/gag', postCtrl.getAllGags);
router.get('/reddit/:id', postCtrl.findOneReddit);
router.get('/gag/:id', postCtrl.findOneGag);
router.put('/reddit/:id',  postCtrl.updateReddit);
router.put('/gag/:id',  postCtrl.updateGag);
router.put('/reddit/report/:id', postCtrl.reportReddit);
router.put('/gag/report/:id',  postCtrl.reportGag);
router.delete('/reddit/:id',  postCtrl.deleteReddit);
router.delete('/gag/:id',  postCtrl.deleteGag);
router.get('/reddit/byUser/:id', postCtrl.redditsByUser);
router.get('/gag/byUser/:id', postCtrl.gagsByUser);
router.get('/flaggedReddits', postCtrl.flaggedReddits);
router.get('/flaggedGags', postCtrl.flaggedGags);

module.exports = router;