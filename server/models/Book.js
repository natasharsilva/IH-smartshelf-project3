const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'The book title is required'],
    minlength: 1
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  picture: String,
  description: String,
  rating: Number,
  pages: Number,
  isbn: {type: Number, minlength: 10},
  _createdBy: {type: Schema.Types.ObjectId, ref: "User"},
  _currentOwner: {type: Schema.Types.ObjectId, ref: "User"},
  status: { type: String, enum: ['Available', 'Unavailable'] },
  _library: {type: Schema.Types.ObjectId, ref:"Library"},
  notification: [
    {_user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
    }],
  comments: [{
      _user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      text: String,
      rating: Number
    }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;