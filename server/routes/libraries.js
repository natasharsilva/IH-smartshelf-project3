const express = require('express');
const router = express.Router();
const Library = require("../models/Library")
const uploader = require("../configs/cloudinary")

router.get('/:libraryId', (req, res, next) => {
  Library.findById(req.params.libraryId)
  .then(response => {
    res.json(response);
  })
  .catch(err => next(err))
});



// router.get("/library-books/:libraryId", (req,res,next) => {
//   Library.findById(req.params.libraryId)
//   .then(response => {
//     res.json(response);
//   })
//   .catch(err => next(err))
// });


router.post('/', uploader.single('picture'), (req, res, next) => {
    Library.create({
    name: req.body.name,
    profilePicture: req.file && req.file.url,  
    address: req.body.address,
    })
  .then(response => {
    res.json({
      message: "library created!",
      response,
    });
  })
  .catch(err => next(err))
});


module.exports = router;
