var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var message = new Schema({
    content: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
})

message.post('remove', function(message) {
  User.findById(message.user, function(err, user) {
    user.messages.pull(message._id);
    user.save();
  })
})

module.exports = mongoose.model('Message',message)
