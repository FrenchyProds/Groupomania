const express = require("express")
const router = express.Router()

const userCtrl = require('../controllers/Users')

router.post('/signup', userCtrl.signup)
router.get('/user', userCtrl.getOneUser)


// REGISTER
module.exports = router;