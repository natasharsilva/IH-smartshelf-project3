const express = require("express");
const router = express.Router();
const axios = require("axios");
const Book = require("../models/Book");
const uploader = require("../configs/cloudinary");
const { isLoggedIn } = require('../middlewares')

// when testing use http://localhost:5000/api/books

// ------------ Get book details by Id ------- Working
router.get("/:bookId", (req, res, next) => {
  Book.findById(req.params.bookId)
    .then(response => {
      res.json(response);
    })
    .catch(err => next(err));
});

// --------- Update Books ------------ Working without picture ****

router.put("/:bookId", uploader.single("picture"), (req, res, next) => {
  Book.findOneAndUpdate(req.params.id, {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    picture: req.file && req.file.secure_url,
    description: req.body.description,
    rating: req.body.rating,
    pages: req.body.pages
  })
    .then(response => {
      res.json({
        message: "Book updated!",
        response
      });
    })
    .catch(err => next(err));
});

//---------------- Delete books -------------- Working
router.delete("/:bookId", (req, res, next) => {
  Book.findById(req.params.bookId).then(book => {
    if (!book) {
      next({
        status: 400,
        message: `There is no book with the id ${req.params.bookId}`
      })
    }
    // Other solution: req.user._id.equals(book._createdBy)
    else if (JSON.stringify(req.user._id) === JSON.stringify(book._createdBy)) {
      Book.deleteOne({ '_id': book._id }).then(() => {
        res.json({
          message: `The book ${book.title} was deleted`
        });
      });
    } else {
      next({
        status: 403,
        message: `You are not allowed to delete ${book.title}`
      })
    }
  });
});

// ------------------ Create Book with API ------------- Working

router.post("/", isLoggedIn, (req, res, next) => {
  axios
    .get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${req.body.isbn}`)
    .then(response => {
      Book.create({
        title: response.data.items[0].volumeInfo.title,
        author: response.data.items[0].volumeInfo.authors[0],
        genre: response.data.items[0].volumeInfo.categories
          ? response.data.items[0].volumeInfo.categories[0]
          : "Provide a genre",
        picture: response.data.items[0].volumeInfo.imageLinks
          ? response.data.items[0].volumeInfo.imageLinks[0]
          : "Provide an image",
        description: response.data.items[0].volumeInfo.description,
        rating: response.data.items[0].volumeInfo.averageRating,
        pages: response.data.items[0].volumeInfo.pageCount,
        isbn:
          response.data.items[0].volumeInfo.industryIdentifiers[1].identifier,
        _createdBy: req.user._id,
        _library: req.body._library
      }).then(response => {
        res.json({
          message: "Book created!",
          response
        });
      });
    })
    .catch(err => {
      next({
        status: 400,
        message: "We couldn't find your book, please fill in the form",
      });
    });
});

// ------------------ Create Book with Form ------------- Working

router.post("/form",isLoggedIn, uploader.single("picture"), (req, res, next) => {
  Book.create({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    picture: req.file && req.file.url,
    description: req.body.description,
    rating: req.body.rating,
    pages: req.body.pages,
    isbn: req.body.isbn,
    _createdBy: req.user._id,
    _library: req.body._library
  })
    .then(response => {
      res.json({
        message: "Book created!",
        response
      });
    })
    .catch(err => next(err));
});

module.exports = router;
