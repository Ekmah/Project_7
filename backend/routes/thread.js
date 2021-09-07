const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-configs');

const sauceCtrl = require('../controllers/threads');
const rateLimit = require("express-rate-limit");

const reqLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

router.get('/', auth, sauceCtrl.getAllthreads);
router.post('/', multer, sauceCtrl.createThread);
// router.post('/', auth, reqLimiter, multer, sauceCtrl.createThread);
router.get('/:id', auth, sauceCtrl.getOneThread);
router.put('/:id', auth, reqLimiter, multer, sauceCtrl.modifyThread);
router.delete('/:id', auth, reqLimiter, sauceCtrl.deleteThread);

module.exports = router;