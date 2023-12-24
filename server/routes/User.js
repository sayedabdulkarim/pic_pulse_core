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

//single User profile with data
// router.get('/user/:id', requireLogin, (req, res) => {
//     console.log(req.params)
// })

//particular user data /:id
router.get('/user/:id', requireLogin, (req, res) => {
    User.findOne({ _id: req.params.id })
        .select('-password')
        .then(user => {
            Post.find({ postedBy: req.params.id })
            .populate("postedBy", "_id name")
            .exec((err, post) => {
                if(err) return res.status(422).json({
                    error: err,
                    message: 'Something went wrong.'
                })
                res.status(200).json({ message: `Fetched user's data successfully`, user, post })
            })
        })
        .catch(err => res.status(404).json({
            error: "User not found"
        }))
})

//all users
router.get('/allusers', requireLogin, (req, res) => {
    User.find({})
        .select('-password')
        .then(result => res.status(200).json({
            message: "Fetched all users successfully.",
            result
        }))
        .catch(err => res.status(404).json({
            error: "User not found"
        }))
})

//follow
/**
 *  jo user login, wahi follow unfollow krega, bcz of that we r passing the login user id
 *  422 - understand but mostly bcz of data throw new Error
 */
router.put('/follow', requireLogin, (req, res) => {
    //added to the user to which the login user follow 
    // console.log(req.body, ' rrr')
    User.findByIdAndUpdate(req.body.followId, {
        $push: { followers: req.user._id } // user who is signed in , he can able to follow or unfollow 
    }, {
        new: true //return update data
    }, (err, result) => {
        if(err) return res.status(422).json({ error: err, message: 'Something went wrong.'})
        
        //update the login user following data or add the followId to the login user following arr
        User.findByIdAndUpdate(req.user._id, {
            $push: { following: req.body.followId }
        }, {
            new: true // rtn update data
        }).select('-password').then(result => res.status(200).json({
            message: 'Follow User successfully',
            result
        })).catch(err => res.status(422).json({ message: 'Something went wrong', error: err } ))
        
    })
})

//unfollow
router.put('/unfollow', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.unfollowId, {
        $pull: { followers: req.user._id }
    }, {
        new: true //return update data
    }, (err, result) => {
        if(err) return res.status(422).json({ error: err, message: 'Something went wrong.'})
        
        User.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.body.unfollowId }
        }, {
            new: true // rtn update data
        }).select('-password').then(result => res.status(200).json({
            message: 'Unfollow User successfully',
            result
        })).catch(err => res.status(422).json({ message: 'Something went wrong', error: err } ))
        
    })
})

router.put('/updateuserpic', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.user._id, { $set:{ pic: req.body.pic }}, (err, result) => {
        if(err){
            return res.status(422).json({
                message: 'Photo cannot updated.',
                error: err
            })
        } else{
            return res.status(200).json({
                message: 'Photo updated successfully.',
                result
            })
        }
    })
})

module.exports = router