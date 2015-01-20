var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DocumentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  updatedAt: {
    type: Date
  }
});

module.exports = mongoose.model('Document', DocumentSchema, 'documents');
