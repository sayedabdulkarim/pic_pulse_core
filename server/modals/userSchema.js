const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const schema =  mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  pic: {
    type: String,
    default: null
  },
  followers: [
    { type: ObjectId, ref: "User" }
  ],
  following: [
    { type: ObjectId, ref: "User" }
  ],
})

const User = mongoose.model('User', schema)

module.exports = User