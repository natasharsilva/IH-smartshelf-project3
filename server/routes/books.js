const express = require('express');
const router = express.Router();
const axios = require('axios');
const Book = require('../models/Book');
const uploader = require('../configs/cloudinary');
const { isLoggedIn } = require('../middlewares')

// when testing use http://localhost:5000/api/books

// ------------ Get book details by Id ------- Working
router.get("/:bookId", (req, res, next) => {
  Book.findById(req.params.bookId)
    .then(response => {
      res.json({
        user: req.user,
        response
      });
    })
    .catch(err => next(err));
});

// --------- Update Books ------------ Working without picture ****

router.put("/:bookId", uploader.single("picture"), (req, res, next) => {
    const {
      title,
      author,
      genre,
      picture,
      description,
      rating,
      pages,
      language,
      status,
      _currentOwner,
      comments,
      _createdBy
    } = req.body;

    let updatedData = {
      status,
      _currentOwner,
      comments
    };

    Book.findOneAndUpdate({_id: req.params.bookId}, updatedData, { new: true })
      .then(response => {
        res.json({
          message: "Book updated!",
          response
        });
      })
      .catch(err => next(err));
  }

  // Book.findOneAndUpdate(req.params.id, {
  //   title: req.body.title,
  //   author: req.body.author,
  //   genre: req.body.genre,
  //   picture: req.file && req.file.secure_url,
  //   description: req.body.description,
  //   rating: req.body.rating,
  //   pages: req.body.pages,
  //   language: req.body.language,
  //   _currentOwner: req.user._id,
  //   status: req.body.status
  // })
  //   .then(response => {
  //     res.json({
  //       message: "Book updated!",
  //       response
  //     });
  //   })
  //   .catch(err => next(err));}
  );

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

// ------------------ Create Book with Form ------------- Working

router.post("/",isLoggedIn, uploader.single("picture"), (req, res, next) => {
  Book.create({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    picture: req.file ? req.file.url : req.body.picture,
    description: req.body.description,
    rating: req.body.rating,
    pages: req.body.pages,
    language: req.body.language,
    isbn: req.body.isbn,
    _createdBy: req.user._id,
    _currentOwner: "0".repeat(24),
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