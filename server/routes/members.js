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

//----Delete a Member---- 

router.delete('/:id', (req, res, next)=>{
  Member.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `Member with ${req.params.id} is removed successfully.` });
    })
    .catch( err => {
      res.json(err);
    })
})


module.exports = router;
