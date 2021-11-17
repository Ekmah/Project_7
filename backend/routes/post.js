const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const matchrights = require('../middleware/has_rights');
const multer = require('../middleware/multer-configs');

const postCtrl = require('../controllers/posts');
const rateLimit = require("express-rate-limit");

const reqLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});
router.get('/:id', auth, postCtrl.getOnePost);
router.get('/', auth, postCtrl.getAllPosts);
router.get('/new/', auth, postCtrl.getAllNewPosts);
router.post('/', auth, multer, postCtrl.createPost);
// router.post('/', auth, reqLimiter, multer, postCtrl.createPost);
// router.get('/thread/:id', auth, postCtrl.getPostsofThread);
router.put('/:id', auth, matchrights, reqLimiter, multer, postCtrl.modifyPost);
router.delete('/:id', auth, matchrights, reqLimiter, postCtrl.deletePost);

module.exports = router;