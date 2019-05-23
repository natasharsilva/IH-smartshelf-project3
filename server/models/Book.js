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
    default:'No genre defined'
  },
  picture: {
    type: String,
    default:'/images/book-cover-placeholder.jpg'
  },
  description: String,
  rating: Number,
  pages: String,
  language: String,
  isbn: {type: Number, minlength: 10},
  _createdBy: {type: Schema.Types.ObjectId, ref: "User"},
  _currentOwner: {type: Schema.Types.ObjectId, ref: "User"},
  borrowedDate:{type:Date, default:Date.now()},
  status: { type: String, enum: ['Available', 'Unavailable'], default:'Available' },
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
      author: String,
      title: String,
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