const express = require('express');
const Book = require('../models/Book')

const router = express.Router();

router.post('/add-book-ISBN', isLoggedIn, (req, res, next) => {
  Book.create({
    createdBy: req.user._id
  })
})