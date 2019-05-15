const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const Member = require('../models/Member');
const Library = require('../models/Library');
const Book = require('../models/Book');
const User = require('../models/User');
const uploader = require("../configs/cloudinary")

//1 - Home Route - Logo, testimonials, Get Started, Description
router.get('/', (req, res, next) => {
  render('/');
});


//4- Profile-Page: Show Libraries and Show Books, 
//ONLY LIBRARIES THAT THE USER IS A PART OF
//only books borrowed by the user
router.get('/profile-page/',  isLoggedIn, (req, res, next) => {
  Promise.all([
    Member.find({_user: req.user._id}).populate("_library"),
        //{'_currentOwner': '5cdc2b9196f7706fc9e93389'}
    Book.find({_currentOwner: req.user._id})])
            .then(response => {
              res.json(response);
            })
  })
  

  router.put("edit-profile/:userId", uploader.single('picture'), (req, res, next) => {
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
