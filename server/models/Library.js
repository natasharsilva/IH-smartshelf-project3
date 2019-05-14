const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const librarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The library name is required'],
    unique: true,
    minlength: 1
  },
  address: {
    type: String,
    required: true,
  },
  profilePicture: String,
  description: {
    type: String,
  },
    notification: [{
      _user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      _book: {
        type: Schema.Types.ObjectId,
        // status: { type: String, enum: ['Available', 'Unavailable']},
        ref:"Book"
      }}],

    _comments: [{
    type: Schema.Types.ObjectId, ref: "User",
    text: String, 
    rating: Number,
  }],
  



}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Library = mongoose.model('Library', librarySchema);

module.exports = Library;