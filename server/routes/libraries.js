const express = require('express');
const router = express.Router();
const Library = require("../models/Library")
const uploader = require("../configs/cloudinary")


// when testing use http://localhost:5000/api/libraries

// ------------ Get library details by Id --- Library Homepage / 
router.get("/:libraryId", (req, res, next) => {
  Library.findById(req.params.libraryId)
  .then(response => {
    res.json(response);
  })
  .catch(err => next(err))
});

// ---------Update Libraries ------------

//notification 
router.put("/:libraryId", (req, res, next) => {
  Library.findOneAndUpdate(req.params.id,{
    name: req.body.name,
    profilePicture: req.file && req.file.url,  
    address: req.body.address,
  })
  .then(response => {
    res.json(response);
  })
  .catch(err => next(err))
});

//---------------- Delete libraries --------------   Working
router.delete('/:libraryId', (req, res, next) => {
  Library.findByIdAndRemove(req.params.libraryId)
  .then(() => {
    res.json({
      message: "library was deleted"
    });
  })
  .catch(err => next(err))
});

// ------------------ Create Library ------------- Working
// uploader.single('picture') is a middleware, that takes from the request the field "picture" (must be a file), save it to cloudinary, save the info in req.file and go to the next middleware
router.post('/', uploader.single('picture'), (req, res, next) => {
  Library.create({
    name: req.body.name,
    picture: req.file && req.file.secure_url,  
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
// -----------------------------------------------

// router.get("/library-books/:libraryId", (req,res,next) => {
//   Library.findById(req.params.libraryId)
//   .then(response => {
//     res.json(response);
//   })
//   .catch(err => next(err))
// });


module.exports = router;
