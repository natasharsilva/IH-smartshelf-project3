const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const librarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The library name is required'],
    minlength: 1
  },
  address: {
    type: String,
    required: true,
  },
  profilePicture: String,
  _members: [{type: Schema.Types.ObjectId, ref: "User"}],
  _owner: {type: Schema.Types.ObjectId, ref: "User"},
  _books: [{type: Schema.Types.ObjectId, ref: "Book"}],
  description: {
    type: String,
  },
  notification: [{type: Schema.Types.ObjectId, ref: "Book"}],
  _comments: [{
    text: String, 
    rating: Number,
    _commentOwner: {type: Schema.Types.ObjectId, ref: "User"},
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Library = mongoose.model('Library', librarySchema);

module.exports = Library;