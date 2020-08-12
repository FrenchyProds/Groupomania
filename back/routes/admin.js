const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/admin");
const auth = require("../middleware/auth");

router.put('/reddit/:id/admin', auth.admin,  adminCtrl.moderateReddit);
router.put('/gag/:id/admin', auth.admin, adminCtrl.moderateGag);
router.delete('/reddit/:id/admin', auth.admin, adminCtrl.adminDeleteReddit);
router.delete('/gag/:id/admin', auth.admin, adminCtrl.adminDeleteGag);
router.put('/user/:id/admin', auth.admin, adminCtrl.moderateUser);
router.delete('/user/:id/admin', auth.admin, adminCtrl.adminDeleteUser);
router.delete('/reddit/:id/comment/:commentId/admin', auth.admin, adminCtrl.adminDeleteRedditComment);
router.delete('gag/:id/comment/:commentId/admin', auth.admin, adminCtrl.adminDeleteGagComment);

module.exports = router;