const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/Users");
const auth = require("../middleware/auth");

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/home', auth.me, userCtrl.home);
router.get('/user/:id', auth.me, userCtrl.userMe);
router.put('/user/:id', auth.me, userCtrl.updateMe);
router.delete('/user/:id', auth.me, userCtrl.deleteMe);
router.get('/finduser/:username', userCtrl.findUser);

module.exports = router;