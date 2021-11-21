const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');
const verifyPassword = require('../middleware/verifyPassword');
const rateLimit = require("express-rate-limit");
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

router.post('/signup', authLimiter, verifyPassword, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/user/:id', auth, userCtrl.getuser);
router.delete('/user/:userId/:role', auth, authLimiter, userCtrl.deleteUser);

module.exports = router;