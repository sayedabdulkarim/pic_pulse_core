const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/keys')
const jwt_decode = require('jwt-decode')
//require login middleware
const requireLogin = require('../middleware/requireLogin')

//modals
const Post = require('../modals/postSchema')
const User = require('../modals/userSchema')

//create post
router.post('/createpost', requireLogin, (req, res) => {
    const { title, body, pic } = req.body

    if (!title || !body || !pic) {
        return res.status(422).json({
            error: 'Please add all the fields'
        })
    }

    // res.send('ok')
    const newPost = new Post({ title, body, pic, postedBy: req.user })

    //hide password from middleware(require login or we can use populate)
    req.user.password = undefined

    newPost.save()
        .then(result => res.status(200).json({
            message: 'Created Post succesfully.',
            data: result
        })).catch(err => console.log(err, ' error'))
})
//all post
router.get('/allposts', requireLogin, (req, res) => {
    
    Post.find()
        .populate("postedBy", "_id name email pic")
        .populate("comments.postedBy", "_id name")
        .then(result => res.status(200).json({
            message: "Fetched all posts successfully.",
            result
        })).catch(err => console.log(err, ' error'))
})
//post created by individual
router.get('/mypost', requireLogin, (req, res) => {
    Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then(result => res.status(200).json({
        message: "Fetched user posts successfully.",
        result
    })).catch(err => console.log(err, ' error'))
})

/**
 * push - add
 * pull - rmv
 * new - send the new 
 */
//like
router.put('/like', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push: {likes: req.user._id}
    }, {
        new: true
    })
    .populate('postedBy', "_id, name")
    .populate("comments.postedBy", "_id name")
    .exec((err, result) => {
        if(err){
            return res.status(422).json({ error: err })
        }else{
            res.json(result)
        }
    })
})

//unlike
router.put('/unlike', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: {likes: req.user._id}
    }, {
        new: true
    })
    .populate('postedBy', "_id, name")
    .populate("comments.postedBy", "_id name")
    .exec((err, result) => {
        if(err){
            return res.status(422).json({ error: err })
        }else{
            res.json(result)
        }
    })
})

//coment
router.put('/comment', requireLogin, (req, res) => {
    const comment = {
        text: req.body.comment,
        postedBy: req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId, {
        $push: {comments: comment}
    }, {
        new: true
    })
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .exec((err, result) => {
        if(err){
            return res.status(422).json({ error: err})
        }else{
            res.json(result)
        }
    })
})

//dlete post = _id
router.delete('/deletepost/:postId', requireLogin, (req, res) => {
    Post.findOne({_id: req.params.postId})
        .populate("postedBy", "_id")
        .exec((err, post) => {
            if(err || !post){
                res.status(402).json({ error: err })
            }
            // if(post.postedBy._id.toString() === req.user._id.toString()){
            else {   
                post.remove()
                .then(data => {
                    res.json({
                        data,
                        message: 'Post deleted succesfully'
                    })
                }).catch(err => console.log(err, ' errr'))
            }
        })
})

//following user post
/**
 * $in: req.user.following 
 * to check postedby is present or not in following bcz we r sending posted by user id while -
 * following or unfollowing user
 */
router.get('/followingposts', requireLogin, (req, res) => {
    Post.find({postedBy: { $in: req.user.following } })
        .populate("postedBy", "_id name email pic")
        .populate("comments.postedBy", "_id name")
        .then(result => res.status(200).json({
            message: "Fetched all following posts successfully.",
            result
        })).catch(err => console.log(err, ' error'))
})

router.get('/likeposts', requireLogin, (req, res) => {
    Post.find({likes: { $in: req.user._id } })
        // .populate("postedBy", "_id name email")
        // .populate("comments.postedBy", "_id name")
        .then(result => res.status(200).json({
            message: "Fetched liked posts successfully.",
            result
        })).catch(err => console.log(err, ' error'))
})

router.get('/suggestion', requireLogin, (req, res) => {
    req.user.following.push(req.user._id)
    // console.log(req.user.following, ' iii')
    User.find({})
        .select('-password -following -followers')
        .populate("postedBy", "_id name email pic")
        .then(result => res.json({
            // result,
            result: result.filter(o => !req.user.following.find(o2 => o._id == o2.toString())),
            message: 'Fetched suggestion / unfollowed user succesfully.'
        })
        )
    })

module.exports = router