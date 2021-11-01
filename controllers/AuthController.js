const User = require('../models/User')
const bcrypt = require('bcryptjs')
 const jwt = require('jsonwebtoken')

 const register = (req,res,next)=> {

   bcrypt.hash(req.body.password,10,function(err,hashedPass){
       if(err){
         res.json({
           error: err
         })
       }
       let user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPass,
        role: req.body.role
      })
   
      user.save().then(user=> {
        res.json({
          message: 'User added successfully'
        })
      }).catch(error => {
        res.json({
         message: "An error Occured"
        })
      
      })
   })
 }


 const login = (req,res,next)=> {
   var username = req.body.username
   var password = req.body.password

   User.findOne({$or: [{email: username}, {phone:username}]})
   .then(user => {
     if(user){
          bcrypt.compare(password, user.password, function(err, result){
            if(err){
              res.json({
                error: err
              })
            }
            if(result){
              let token = jwt.sign({name: user.name}, 'fsdfsd32')
                res.json({
                  message: 'Login Successful!',
                  token,user_id: user.id, user_role: user.role,user: user.name
                })
            } else {
              res.json({
                message: 'Password does not match'
              })
            }
          })
     } else {
  
       res.status(400).json({message: 'No user found!'})
     }
   })

 }

 //all employee with pagination
const userPagination = (req,res,next) => {
  User.find().then(response => {
    res.json({count: response.length,response})
  }).catch(error => {
    res.json({message: 'An error Occured!'})
  })
}
 const logout = (req,res,next) => {
   res.localStorage('jwt','',{maxAge: 1})
   res.redirect('/')
 }
 module.exports = {
  register,
  login,
  logout,
  userPagination,
 }