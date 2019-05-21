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

// ----------------------- NODEMAILER ----------------------
router.post("/report-problem/:libraryId", (req, res, next) => {
  let {name, subject, message} = req.body
  Member.find({ _library: req.params.libraryId, role: "admin" })
    .then(response => {
      Promise.all([
        User.findById(response[0]._user),
        User.findById(req.user._id)
      ]).then(([admin, user]) => {
        let adminEmail = admin.email;
        let userEmail = user.email;
        let content = `Name: ${name} \n Contact e-mail: ${userEmail} \n Subject: ${subject} \n message: ${message}`;
        let transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
          }
        });

        let mail = {
          from: '"SmartShelf" <smartshelflisbon@gmail.com>',
          to: adminEmail,
          subject: "A member reported a problem in your library",
          text: `Hi, there! \n A member of your library reported a problem with a book. You can take a look at the message they sent and their contact e-mail below. \n
          Best, \n - SmartShelf Team \n ${content}`
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
    })
    .catch(err => next(err));
});

module.exports = router;
