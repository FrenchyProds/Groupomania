const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/Users");
const auth = require("../middleware/auth");

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);
router.get('/home', userCtrl.home);
router.get('/user/:id', auth.me, userCtrl.userMe);
router.put('/user/:id', auth.me, userCtrl.updateMe);

module.exports = router;