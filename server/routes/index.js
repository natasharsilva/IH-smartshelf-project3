const express = require("express");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();
const Member = require("../models/Member");
const Book = require("../models/Book");
const User = require("../models/User");
const uploader = require("../configs/cloudinary");

//4- Profile-Page: Show Libraries and Show Books,
//ONLY LIBRARIES THAT THE USER IS A PART OF
//only books borrowed by the user
router.get('/profile', isLoggedIn, (req, res, next) => {
  Promise.all([
    User.findById(req.user._id),
    Member.find({ _user: req.user._id }).populate("_library"),
    Book.find({ _currentOwner: req.user._id })
  ]).then(([user, members, books]) => {
    res.json({
      user,
      members,
      books
    });
  });
});

router.put("/profile", isLoggedIn, uploader.single("picture"), (req, res, next) => {
    const {
      username,
      phoneNumber,
      favoriteBooks,
      favoriteQuote
    } = req.body;

    let updatedData = {
      username,
      phoneNumber,
      favoriteBooks,
      favoriteQuote
    };
    if (req.file) updatedData.picture = req.file.secure_url;

    User.findOneAndUpdate({_id: req.user._id}, updatedData, { new: true })
      .then(response => {
        res.json(response);
      })
      .catch(err => next(err));
  }
);

module.exports = router;
