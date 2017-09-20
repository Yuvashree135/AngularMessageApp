var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

module.exports = mongoose.model('Message',message)
