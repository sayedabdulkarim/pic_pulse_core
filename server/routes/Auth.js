const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const jwt_decode = require("jwt-decode");
//require login middleware
const requireLogin = require("../middleware/requireLogin");
//modals
const User = require("../modals/userSchema");
//mail
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transport = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.MAILERKEY,
    },
  })
);

//get
router.get("/", (req, res) => {
  res.send("Hello world from Route");
});
//get protected
router.get("/protected", requireLogin, (req, res) => {
  // console.log(req.user, ' reqqq')
  res.send("Hello world from protected routes.");
});

//post signup
router.post("/signup", (req, res) => {
  const { name, email, password, pic } = req.body;
  //check whether all fields are present
  if (!name || !email || !password) {
    return res.status(422).json({
      error: "Please add all the fields",
    });
  }
  //find same email
  User.findOne({ email }).then((savedUser) => {
    if (savedUser) {
      return res.status(422).json({
        error: "User is already registered.",
      });
    }
    //hashed password
    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        //save user
        const newUser = new User({
          name,
          email,
          password: hashedPassword,
          pic,
        });
        newUser
          .save()
          .then((user) => {
            res.status(200).json({
              message: "User saved succesfully.",
            });
          })
          .catch((err) => console.log(err, " error"));
      })
      .catch((err) => console.log(err, " outer err"));
  });
});
//post signin
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  //check whether all fields are present
  if (!email || !password) {
    return res.status(422).json({
      error: "Please add all the fields",
    });
  }
  //check whether user email is there
  User.findOne({ email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({
          error: "Please Check email or password.",
        });
      }
      bcrypt
        .compare(password, savedUser.password)
        .then((isMatch) => {
          if (isMatch) {
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
            //
            savedUser.password = undefined;
            return res.status(200).json({
              message: "Signed In succesfully.",
              token,
              user: savedUser,
            });
          } else {
            return res.status(400).json({
              error: "Please check email or password",
            });
          }
        })
        .catch((err) => console.log(err, " signin error"));
    })
    .catch((err) => console.log(err, " signin out errr"));
});

module.exports = router;
