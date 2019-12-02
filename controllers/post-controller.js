const Post = require('../models/post');
const User = require('../models/user');
const { validationResult } = require('express-validator');



const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
}



const getPostsById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' })
        }

        res.json(post)

    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        return res.status(500).send('Server Error');
    }
}


const createPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })

        const post = await newPost.save();
        res.json(post)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


const postComment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })

        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


const putLike = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //Check if post is already liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' })
        }

        post.likes.unshift({ user: req.user.id })

        await post.save();
        res.json(post.likes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


const putUnlike = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //Check if post is already liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post has not yet been liked' })
        }

        const removeLikeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeLikeIndex, 1);

        await post.save();
        res.json(post.likes);

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}



const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' })
        }

        // Check that user who deletes the post is the same as the post author
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' })
        }

        await post.remove();
        res.json({ msg: 'Post removed' })

    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' })
        }
        return res.status(500).send('Server Error');
    }
}


const deleteComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Find comment
        const comment = await post.comments.find(comment => comment.id === req.params.comment_id);

        // Check if comment already exists
        if (!comment) {
            return res.status(404).json({ msg: 'Comment does not exist' })
        }

        // Check that user who deletes the comment is the same as the comment author
        if (comment.user.toString() !== req.user.id) {
            return res.status(404).json({ msg: 'User not authorized' })
        }

        //Get remove index
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex, 1);

        await post.save();
        res.json(post.comments);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports = { getAllPosts, getPostsById, createPost, postComment, putLike, putUnlike, deletePost, deleteComment };