const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const Library = require('../models/Library');
const User = require('../models/User');
const uploader = require("../configs/cloudinary")

//1 - Home Route - Logo, testimonials, Get Started, Description
router.get('/', (req, res, next) => {
  render('/');
});


//4- Profile-Page: Show Libraries , Books, 
router.get('/profile-page/',  isLoggedIn, (req, res, next) => {
  Library.find({'_members._id':req.user.id})
    .then(librariesFromDb => {
      res.json(librariesFromDb)
        })
    .catch(err => {
      res.json(err);
    })
  
    //only books borrowed by the user
  Book.find({ "currentOwner.ref._user": req.user.id})
    .then(booksFromDb => {
      res.json(booksFromDb) //change for books which will be shown: only the borrowed books
        })
    .catch(err => {
      res.json(err);
    })
  });


router.put("edit-user/:userId", uploader.single('picture'), (req, res, next) => {
  User.findOneAndUpdate(req.params.userId,{
    name: req.body.name,
    picture: req.file && req.file.secure_url,  
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    favoriteBooks: req.body.favoriteBooks,
    favoriteQuote: req.body.favoriteQuote,
  })
  .then(response => {
    res.json(response);
  })
  .catch(err => next(err))
});





module.exports = router;
