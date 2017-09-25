var router = require('express').Router();
var jwt = require('jsonwebtoken');

var Message = require('../models/message');
var User = require('../models/user');

router.get('/getall', function(req, res, next) {
  //chaining multiple queries and executing them
  Message.find().populate('user', 'firstName').exec(function(err, messages) {
    if (err) {
      res.status(500).json({title: 'error in getting messages', error: err})
    }
    res.status(201).json({message: 'successfully retrieved', obj: messages})
  })
});

// this method executes on each req
router.use('/', function(req, res, next) {
  jwt.verify(req.query.token, 'MyS3CR3T', function(err, decoded) {
    if (err) {
      return res.status(401).json({title: 'Not Authenticated', error: err});
    }
    next();
  })
});

router.post('/save', function(req, res, next) {
  var decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, function(err, user) {
    if (err) {
      return res.status(500).json({title: 'Error Occured', error: err})
    }
    var message = new Message({content: req.body.content, user: user._id});
    message.save(function(err, result) {
      if (err) {
        res.status(500).json({title: 'error in creating', error: err})
      }
      result.user = user;
      user.messages.push(result);
      user.save();
      res.status(201).json({message: 'successfully created', obj: result})
    });
  });
});

router.patch('/editmessage/:id', function(req, res, next) {
  var decoded = jwt.decode(req.query.token);
  Message.findById(req.params.id, function(err, message) {
    if (err) {
      res.status(500).json({title: 'error in finding message', error: err});
    }
    if (!message) {
      res.status(500).json({
        title: 'message not found',
        error: {
          message: 'No message of this particular id'
        }
      });
    }
    if(message.user != decoded.user._id) {
      return res.status(401).json({title: 'Not Authenticated', error: err})
    }
    message.content = req.body.content;
    // mongoose will automatically over ride the existing record and it wont create a new one
    message.save(function(err, result) {
      if (err) {
        res.status(500).json({title: 'error in updating', error: {message: 'User do not match'}})
      }
      res.status(200).json({message: 'successfully updated', obj: result})
    })
  })
})

router.delete('/deletemessage/:id', function(req, res, next) {
  var decoded = jwt.decode(req.query.token);
  Message.findById(req.params.id, function(err, message) {
    if (err) {
      res.status(500).json({title: 'error in finding message', error: err});
    }
    if (!message) {
      res.status(500).json({
        title: 'message not found',
        error: {
          message: 'No message of this particular id'
        }
      });
    }
    if(message.user != decoded.user._id) {
      return res.status(401).json({title: 'Not Authenticated', error: {message: 'User do not match'}})
    }
    message.remove(function(err, result) {
      if (err) {
        res.status(500).json({title: 'error in removing', error: err})
      }
      res.status(200).json({message: 'successfully removed', obj: result})
    })
  })
});

module.exports = router;
