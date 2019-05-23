const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: ["Your email is required"], minlength: 1, unique:true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    picture: { type: String, default: "/images/defaultProfile.png" },
    phoneNumber: Number,
    favoriteBooks: {
      type: String,
      default:'Here goes my favorite book'
    },
    favoriteQuote: {
      type: String,
      default:'Always read something that will make you look good if you die in the middle of it.'
    },
  },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
