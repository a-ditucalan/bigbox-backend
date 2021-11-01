require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const ItemRoute = require('./routes/item')
const AuthRoute = require('./routes/user')
const StatusRoute = require('./routes/status')
mongoose.connect("mongodb+srv://anuar:anuar@bigbox.zkdgy.mongodb.net/bigboxDB?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
mongoose.Promise = global.Promise
db.on('error',(err)=> {
  console.log(err)
})

db.once('open',()=> {
  console.log("database connection established!")
})

const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header("Access-Control-allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
    return res.status(200).json({})
  }

  next()
})
const PORT = process.env.PORT || 5000

app.listen(PORT,()=> {
  console.log(`Server is running on port ${PORT}`)
})

app.use('/api/item',ItemRoute)
app.use('/api/status',StatusRoute)
app.use('/api',AuthRoute)
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong. Please try again",
    status: err.status || 500
  });
});