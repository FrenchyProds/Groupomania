const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/admin");
const auth = require("../middleware/auth");

router.get('/reddit/admin/moderated', auth.admin, adminCtrl.moderatedReddits);
router.get('/gag/admin/moderated', auth.admin, adminCtrl.moderatedGags);
router.get('/user/admin/moderated', auth.admin, adminCtrl.moderatedUsers);
router.get('/comment/admin/moderated', auth.admin, adminCtrl.moderatedComments);
router.put('/reddit/:id/admin', auth.admin,  adminCtrl.moderateReddit);
router.put('/gag/:id/admin', auth.admin, adminCtrl.moderateGag);
router.put('/reddit/:id/admin/unflag', auth.admin, adminCtrl.removeRedditFlag);
router.put('/gag/:id/admin/unflag', auth.admin, adminCtrl.removeGagFlag);
router.delete('/reddit/:id/admin', auth.admin, adminCtrl.adminDeleteReddit);
router.delete('/gag/:id/admin', auth.admin, adminCtrl.adminDeleteGag);
router.get('/user/:id/admin/unflag', auth.admin, adminCtrl.unflagUser);
router.put('/user/:id/admin', auth.admin, adminCtrl.moderateUser);
router.delete('/user/:id/admin', auth.admin, adminCtrl.adminDeleteUser);
router.get('/reddit/:id/comment/:commentId/admin/unflag', auth.admin, adminCtrl.removeRedditCommentFlag);
router.get('/gag/:id/comment/:commentId/admin/unflag', auth.admin, adminCtrl.removeGagCommentFlag);
router.delete('/reddit/:id/comment/:commentId/admin', auth.admin, adminCtrl.adminDeleteRedditComment);
router.delete('/gag/:id/comment/:commentId/admin', auth.admin, adminCtrl.adminDeleteGagComment);

module.exports = router;