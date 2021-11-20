const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-configs');

const threadCtrl = require('../controllers/threads');
const rateLimit = require("express-rate-limit");

const reqLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});
router.get('/', auth, threadCtrl.getAllThreads);
router.post('/', auth, multer, threadCtrl.createThread);
// router.post('/', auth, reqLimiter, multer, threadCtrl.createThread);
router.get('/:id', auth, threadCtrl.getOneThread);
router.put('/:threadId/:userId/:role', auth, reqLimiter, multer, threadCtrl.modifyThread);
router.delete('/:threadId/:userId/:role', auth, reqLimiter, threadCtrl.deleteThread);

module.exports = router;