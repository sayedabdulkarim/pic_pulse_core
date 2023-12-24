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
const { generateToken } = require("../utils/generateToken");

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

// POST signup
router.post("/signup", async (req, res) => {
  const { name, email, password, pic } = req.body;

  // Check whether all fields are present
  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  try {
    // Check if the user already exists
    const savedUser = await User.findOne({ email });

    if (savedUser) {
      res.status(400).json({
        message: "User with this phone number already exists. Please Login.",
      });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save the new user to the database
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      pic,
    });

    const user = await newUser.save();

    // Generate JWT token
    const token = generateToken(user._id);

    // Respond with user details and token
    res.status(201).json({
      message: "User registered successfully",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    // Log the error and respond with a server error status code
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
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
