const express = require('express');
const router = express.Router();
const Member = require("../models/Member")
const uploader = require("../configs/cloudinary")
const { isLoggedIn } = require('../middlewares')


// Get Members using library IDs / when testing use http://localhost:5000/api/members/ 
router.get("/:id", (req, res, next) => {
  Member.find({_library: req.params.id, _user: req.user._id}).populate("_user")
  .then(response => {
    res.json(response);
  })
  .catch(err => next(err))
});

// ------------ Add a new member ------------------
router.post("/", isLoggedIn, (req, res, next) => {
  Member.create({
    _library: req.body._library,
    _user: req.user._id
  })
  .then(response => {
    console.log("TCL: req.body._library", req.body._library)
    res.json(response);
  })
  .catch(err => next(err))
});

//-------------- Delete a Member-------------- 

router.delete("/:memberId", isLoggedIn, (req,res,next) => {
  Member.findById(req.params.memberId)
  .then(member => {
    if (!member) {
      next({ status: 400, message: "No member with the id"+req.params.memberId })
    }
    // If the connected user is an admin or the member found, delete the member
    else if (req.user.role === "admin" || member._user.equals(req.user._id)) {
      Member.findByIdAndDelete(req.params.memberId)
      .then(() => {
        res.json({
          message: "The member with the following id is deleted"+req.params.memberId
        })
      })
    }
    else {
      next({ status: 403, message: "You cannot delete the member with the id"+req.params.memberId })
    }
  })
})

// Make sure the user is connected and is either an admin or himself
router.delete("/:libraryId", isLoggedIn, (req, res, next) => {
  Member.findOne({ _user: req.user._id, _library: req.params.libraryId })
  .then(memberToDelete => {
    console.log("TCL: memberToDelete");
    Member.findOne({
      _user: req.user._id,
      _library: memberToDelete._library
    })
    .then(loggedUser => {
      if (
        loggedUser.role === "admin" ||
        loggedUser._user._id.equals(memberToDelete._user._id)
      ) {
        Member.deleteOne({ _id: memberToDelete._id });
        res.json({
          memberToDelete,
          loggedUser,
          message: `Deleted the member ${memberToDelete._id}`
        });
      } else {
        res
          .json({
            memberToDelete,
            loggedUser,
            message: `You do not have permission to delete this member`
          })
          .catch(err => next(err));
      }
    });
  });
});


module.exports = router;
