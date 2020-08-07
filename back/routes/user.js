const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/Users");
const auth = require("../middleware/auth");

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/home', auth.me, userCtrl.home);
router.get('/user/:id', auth.me, userCtrl.userMe);
router.get('/admin/:id', auth.me, auth.admin, userCtrl.userMe);
router.put('/user/:id', auth.me, userCtrl.updateMe);
router.put('/user/password/:id', auth.me, userCtrl.updatePassword);
router.delete('/user/:id', auth.me, userCtrl.deleteMe);
router.get('/finduser/:username', userCtrl.findUser);
router.put('/user/report/:username', userCtrl.reportUser);
router.get('/flaggedUsers', auth.admin, userCtrl.flaggedUsers)

module.exports = router;