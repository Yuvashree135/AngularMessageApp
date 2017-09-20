var router = require('express').Router();

var Message = require('../models/message');

router.get('/getall', function(req, res, next) {
  //chaining multiple queries and executing them
  Message.find()
    .exec(function(err, messages) {
      if (err) {
        res.status(500).json({msg: 'error in getting messages', error: err})
      }
      res.status(201).json({msg: 'successfully retrieved', obj: messages})
    })
})

router.post('/save', function (req, res, next) {
  console.log(req.body.content);
  var message = new Message({
    content: req.body.content
  });
  message.save(function(err, result) {
    if(err) {
      res.status(500).json({msg: 'error in creating', error: err})
    }
    res.status(201).json({msg: 'successfully created', obj: result})
  })
})

router.patch('/editmessage/:id', function(req, res, next) {
  Message.findById(req.params.id, function(err, message) {
    if(err) {
      res.status(500).json({msg: 'error in finding message', error: err});
    }
    if(!message) {
      res.status(500).json({msg: 'message not found', error: { message: 'No message of this particular id'}});
    }
    message.content = req.body.content;
    // mongoose will automatically over ride the existing record and it wont create a new one
    message.save(function(err, result) {
      if(err) {
        res.status(500).json({msg: 'error in updating', error: err})
      }
      res.status(200).json({msg: 'successfully updated', obj: result})
    })
  })
})

router.delete('/deletemessage/:id', function(req, res, next) {
  Message.findById(req.params.id, function(err, message) {
    if(err) {
      res.status(500).json({msg: 'error in finding message', error: err});
    }
    if(!message) {
      res.status(500).json({msg: 'message not found', error: { message: 'No message of this particular id'}});
    }
    message.remove(function(err, result) {
      if(err) {
        res.status(500).json({msg: 'error in removing', error: err})
      }
      res.status(200).json({msg: 'successfully removed', obj: result})
    })
  })
});



module.exports = router;
