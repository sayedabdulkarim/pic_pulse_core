const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
//modals
const User = require("../modals/userSchema");

//protected middleware
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      error: "You must be logged in.",
    });
  }
  //send token from jwt
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must be logged in." });
    }
    // console.log(payload, ' payyy')
    const { _id } = payload;
    User.findById(_id).then((userData) => {
      // console.log(userData, ' usrrr')
      req.user = userData;
      next();
    });
  });
};

// let fetchedSugesstion = await Song.aggregate([
//     { "$match": { "_id": { "$in": list } } },
//     { "$addFields": {
//       "copies": {
//         "$filter": {
//           "input": {
//             "$map": {
//               "input": {
//                 "$zip":  {
//                   "inputs": [
//                     list,
//                     { "$range": [0, { "$size": { "$literal": list } } ] }
//                   ]
//                 }
//               },
//               "in": {
//                 "_id": { "$arrayElemAt": [ "$$this", 0 ] },
//                 "idx": { "$arrayElemAt": [ "$$this", 1 ] }
//               }
//             }
//           },
//           "cond": { "$eq": ["$$this._id", "$_id"] }
//         }
//       }
//     }},
//     { "$unwind": "$copies" },
//     { "$sort": { "copies.idx": 1 } },
//     { "$project": { "copies": 0 } }
//   ]);
