const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const Library = require('../models/Library');
const Book = require('../models/Book');



//1 - Home Route - Logo, testimonials, Get Started, Description
router.get('/', (req, res, next) => {
  render('/');
});

//4- Profile-Page: Show Libraries, Books, 
router.get('/profile-page',  isLoggedIn, (req, res, next) => {
  Library.find()
    .then(librariesFromDb => {
      res.json(librariesFromDb)
        })
    .catch(err => {
      res.json(err);
    })
  
  Book.find()
    .then(booksFromDb => {
      res.json(booksFromDb) //change for cooks which will be shown: only the borrowed books
        })
    .catch(err => {
      res.json(err);
    })
  });


//Route Secret --Optional
router.get('/secret', isLoggedIn, (req, res, next) => {
  res.json({
    secret: 42,
    user: req.user
  });
});


module.exports = router;
