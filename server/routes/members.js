const express = require('express');
const router = express.Router();
const Member = require("../models/Member")
const uploader = require("../configs/cloudinary")


// Get Members using library IDs / when testing use http://localhost:5000/api/members/ 
router.get("/:id", (req, res, next) => {
  Member.find({_library: req.params.id}).populate("_user")
  .then(response => {
    res.json(response);
  })
  .catch(err => next(err))
});


// Create a Member -- 
router.post('/',(req, res, next) => {
  Member.create({
    _user: req.user._id,
    _library: req.body._library 
  })
  .then(response => {
    res.json({
      message: "Member created!",
      response,
    });
  })
  .catch(err => next(err))
});




module.exports = router;
