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
