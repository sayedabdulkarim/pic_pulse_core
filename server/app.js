const express = require('express')
require('dotenv').config({path: __dirname + '/.env'})
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// const { MONGOURI } = require('./config/keys')

const app = express()
//db-connect
mongoose.connect( process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false } )
    .then(res => console.log('mongo connected'))
    .catch(err => console.log(err, ' err'))
/**
 * add parser-cors before the routes for req.body
 */

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
//routes
app.use(require('./routes/Auth.js'))
app.use(require('./routes/Post.js'))
app.use(require('./routes/User.js'))

//PORT
const PORT = process.env.PORT || 5000
//listen
app.listen(PORT, () => console.log(`running on PORT ${PORT}`))
