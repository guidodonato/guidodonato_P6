const express = require('express');
const router = express.Router();
const createlimiter = require('../middleware/ceatelimiter');
const loginlimiter  = require('../middleware/loginlimiter');
const userCtrl = require('../controllers/user') 

router.post('/signup', createlimiter, userCtrl.signup);

router.post('/login', loginlimiter, userCtrl.login);

module.exports = router;