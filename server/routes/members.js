const express = require('express');
const router = express.Router();
const Member = require("../models/Member")
const uploader = require("../configs/cloudinary")
const { isLoggedIn } = require('../middlewares')


// Get Members using library IDs / when testing use http://localhost:5000/api/members/ 
router.get("/:id", (req, res, next) => {
  Member.find({_library: req.params.id}).populate("_user")
  .then(response => {
    res.json(response);
  })
  .catch(err => next(err))
});
// ------------ Add a new member ------------------
router.post("/", isLoggedIn, (req, res, next) => {
  Member.create({_library: req.body._library, _user: req.user._id})
  .then(response => {
    res.json(response);
  })
  .catch(err => next(err))
});

//-------------- Delete a Member-------------- 

// Make sure the user is connected and is either an admin or himself
router.delete('/:id', isLoggedIn, (req, res, next)=>{

    Member.findOne({_id: req.params.id})
      .then(memberToDelete => {
        console.log("TCL: memberToDelete")
        Member.findOne({_user: req.user._id,_library:memberToDelete._library})
        .then(loggedUser =>{
            console.log("TCL: memberToDelete,loggedUser", loggedUser )
          
        if(loggedUser.role === 'admin'){
      Member.deleteOne({_id: memberToDelete.id})
      res.json({
        memberToDelete,loggedUser,
        message: `Deleted the member ${memberToDelete.id}` 
      })
    } else {
      res.json({
        memberToDelete,loggedUser,
        message: `You do not have permission to delete this member` 
      }) 
      .catch(err => next(err))
    }})
  })
});


module.exports = router;
