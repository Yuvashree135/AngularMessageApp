var Router = require('express').Router();

var User = require('../models/user');

// const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

Router.post('/',(req, res, next) => {
  // const cipher = crypto.createCipher('aes192', 'password');
  // let encrypted = cipher.update(req.body.password, 'utf8', 'hex');
  // encrypted = cipher.final('hex');
  //
  // let password = encrypted;

  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  })
  user.save( function(err, result) {
    if(err) {
      res.status(500).json({
        title: 'An error occured while creating',
        error: err
      })
    }
      res.status(201).json({
        message: 'User created successfully',
        obj: result
      });
  });
});

Router.post('/signin', function(req, res, next) {

  User.findOne({email: req.body.email} , function(err, result) {
    if(err) {
      res.status(500).json({
        title: 'An error occured while finding a user',
        error: err
      })
    }
    if(result === null) {
      res.status(401).json({
        title: 'Login Failed',
        error: { message: 'Check your mail ID/ password'}
      })
    }
    if(!bcrypt.compareSync(req.body.password, result.password)) {
      res.status(401).json({
        title: 'Login Failed',
        error: { message: 'Check your mail ID/ password'}
      })
    }
    // token creation
    var token = jwt.sign({user: result}, 'MyS3CR3T', {expiresIn: 7200});
    res.status(200).json({
      message: 'Login Successfull',
      token: token,
      userId: result._id
    })
  })
})

module.exports = Router;
