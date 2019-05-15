const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const Member = require('../models/Member');
const Library = require('../models/Library');
const Book = require('../models/Book');
const User = require('../models/User');
const uploader = require("../configs/cloudinary")

//4- Profile-Page: Show Libraries and Show Books, 
//ONLY LIBRARIES THAT THE USER IS A PART OF
//only books borrowed by the user
router.get('/profile',  isLoggedIn, (req, res, next) => {
  Promise.all([
    Member.find({_user: req.user._id}).populate("_library"),
        //{'_currentOwner': '5cdc2b9196f7706fc9e93389'}
    Book.find({_currentOwner: req.user._id})])
            .then(([members,books]) => {
              res.json({members,books});
            })
  })
  

  router.put("/profile", isLoggedIn, uploader.single('picture'), (req, res, next) => {
  User.findOneAndUpdate(req.user._id,{
    username: req.body.username,
    picture: req.file && req.file.secure_url,  
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    favoriteBooks: req.body.favoriteBooks,
    favoriteQuote: req.body.favoriteQuote,
  }, {new: true})
  .then(response => {
    res.json(response);
  })
  .catch(err => next(err))
});





module.exports = router;
