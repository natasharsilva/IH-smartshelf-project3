const express = require('express');
const router = express.Router();
const Library = require("../models/Library")
const Member = require("../models/Member")
const uploader = require("../configs/cloudinary")


// Get library details by Id --- Library Homepage / when testing use http://localhost:5000/api/libraries
router.get('/:libraryId', (req, res, next) => {
  Library.findById(req.params.libraryId)
  .then(response => {
    res.json(response);
  })
  .catch(err => next(err))
});

// Create Library -- when testing use http://localhost:5000/api/libraries
router.post('/', uploader.single('picture'), (req, res, next) => {
  Library.create({
    name: req.body.name,
    profilePicture: req.file && req.file.url,  
    address: req.body.address,
  })
    .then(libraryCreated => {
        Member.create({
            role:'admin',
            _user: req.user._id,
            _library: libraryCreated._id
          })
          .then(memberCreated => {
            res.json({
              message: `Member ${memberCreated._user} and Library ${libraryCreated._id}  created!`,
              memberCreated,libraryCreated
            });
          }).catch(err => next(err))
    })})

// router.get("/library-books/:libraryId", (req,res,next) => {
//   Library.findById(req.params.libraryId)
//   .then(response => {
//     res.json(response);
//   })
//   .catch(err => next(err))
// });


module.exports = router;
