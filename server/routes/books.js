const express = require("express");
const { isLoggedIn } = require('../middlewares');
const router = express.Router();
const axios = require('axios');
const Book = require('../models/Book');

router.post("/", (req, res, next) => {
  let ISBN = req.body
  axios
    .get(
      "https://www.googleapis.com/books/v1/volumes?q=isbn:"+ISBN
    )
    .then(response => {
      res.json(response);
    })
    .catch(err => next(err))
});

// router.post("/:ISBN", (req, res, next) => {
//   axios
//     .get(
//       "https://www.googleapis.com/books/v1/volumes?q=isbn:" + req.params.ISBN
//     )
//     .then(response => {
//       res.json(response);
//     });
// });

module.exports = router;