const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');
const { getAllPosts, getPostsById, createPost, postComment, putLike, putUnlike, deletePost, deleteComment } = require('../../controllers/post-controller');




// @route     GET api/posts
// @desc      Get all post
// @access    Private
router.get('/', [auth, [
    check('text', 'Text is required').not().isEmpty()
]], getAllPosts)


// @route     GET api/posts/:id
// @desc      Get post by ID
// @access    Private
router.get('/:id', auth, getPostsById)


// @route     POST api/posts
// @desc      Create a post
// @access    Private
router.post('/', [auth, [
    check('text', 'Text is required').not().isEmpty()
]], createPost)


// @route     POST api/posts/comment/:id
// @desc      Comment on a post
// @access    Private
router.post('/comment/:id', auth, postComment)


// @route     PUT api/posts/like/:id
// @desc      Like a post
// @access    Private
router.put('/like/:id', auth, putLike)


// @route     PUT api/posts/unlike/:id
// @desc      Like a post
// @access    Private
router.put('/unlike/:id', auth, putUnlike)



// @route     DELETE api/posts/:id
// @desc      Delete a post
// @access    Private
router.delete('/:id', auth, deletePost)


// @route     DELETE api/posts/comment/:id/:comment_id
// @desc      Delete a comment 
// @access    Private
router.delete('/comment/:id/:comment_id', auth, deleteComment)

module.exports = router;