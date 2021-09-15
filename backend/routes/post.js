const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-configs');

const postCtrl = require('../controllers/posts');
const rateLimit = require("express-rate-limit");

const reqLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

router.get('/', auth, postCtrl.getAllPosts);
router.post('/', multer, postCtrl.createPost);
// router.post('/', auth, reqLimiter, multer, postCtrl.createPost);
router.get('/:id', auth, postCtrl.getOnePost);
// router.get('/:'), auth, postCtrl.getPostsofThread);
router.put('/:id', auth, reqLimiter, multer, postCtrl.modifyPost);
router.delete('/:id', auth, reqLimiter, postCtrl.deletePost);

module.exports = router;