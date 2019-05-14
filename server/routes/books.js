const express = require("express");
const { isLoggedIn } = require('../middlewares');
const router = express.Router();
const axios = require('axios');
const Book = require('../models/Book');

router.post("/", (req, res, next) => {
  axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${req.body.isbn}`
    )
    .then(response => {
      Book.create({
        title: response.data.items[0].volumeInfo.title,
        author: response.data.items[0].volumeInfo.authors[0],
        genre: response.data.items[0].volumeInfo.categories ? response.data.items[0].volumeInfo.categories[0] : 'Provide a genre',
        images: response.data.items[0].volumeInfo.imageLinks ? response.data.items[0].volumeInfo.imageLinks[0] : 'Provide an image',
        description: response.data.items[0].volumeInfo.description,
        rating: response.data.items[0].volumeInfo.averageRating,
        pages: response.data.items[0].volumeInfo.pageCount,
        ISBN: response.data.items[0].volumeInfo.industryIdentifiers[1].identifier,
        _createdBy: req.user._id,
        _library: '5cdb135c23066b50d130b60d'
      }).then(response => {
        res.json({
          message: "Book created!",
          response
        });
      })
    })
    .catch(err => next(err))
});

module.exports = router;