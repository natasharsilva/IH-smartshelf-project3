const express = require("express");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();
const Member = require("../models/Member");
const Book = require("../models/Book");
const User = require("../models/User");
const uploader = require("../configs/cloudinary");
const nodemailer = require("nodemailer");

//4- Profile-Page: Show Libraries and Show Books,
//ONLY LIBRARIES THAT THE USER IS A PART OF
//only books borrowed by the user
router.get("/profile", isLoggedIn, (req, res, next) => {
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

router.put(
  "/profile",
  isLoggedIn,
  uploader.single("picture"),
  (req, res, next) => {
    const { username, phoneNumber, favoriteBooks, favoriteQuote } = req.body;

    let updatedData = {
      username,
      phoneNumber,
      favoriteBooks,
      favoriteQuote
    };
    if (req.file) updatedData.picture = req.file.secure_url;

    User.findOneAndUpdate({ _id: req.user._id }, updatedData, { new: true })
      .then(response => {
        res.json(response);
      })
      .catch(err => next(err));
  }
);

//----------------------- NODEMAILER ----------------------
router.post("/send-email", (req, res, next) => {
  let name = req.body.name;
  let subject = req.body.subject;
  let message = req.body.message;
  let content = `name: ${name} \n subject: ${subject} \n message: ${message} `;

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });

  let mail = {
    from: '"SmartShelf" <smartshelflisbon@gmail.com>',
    to: "ADMIN", // Find the admin and send the email
    subject: "A member reported a problem in your library",
    text: `Hi, there! A member of your library reported a problem with a book. Take a look at the message they sent ${content}`
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        mail,
        msg: "Something's wrong"
      });
    } else {
      res.json({
        mail,
        msg: "Success!"
      });
    }
  });
});

module.exports = router;
