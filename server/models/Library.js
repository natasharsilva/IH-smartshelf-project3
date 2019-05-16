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
  picture: { type: String, default: "/images/defaultProfile.png" },
  description: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Library = mongoose.model('Library', librarySchema);

module.exports = Library;