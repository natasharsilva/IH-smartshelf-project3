const express = require('express');
const Library = require('../models/Library')

const router = express.Router();

// Route to get all libraries -> Profile
router.get('/', (req, res, next) => {
  Library.find()
    .then(libraries => {
      res.json(libraries);
    })
    .catch(err => next(err))
});

// Route to add a Library
router.post('/', (req, res, next) => {
  let { name, capitals, area, description } = req.body//change this
  Library.create({ name, capitals, area, description })//change this
    .then(Library => {
      res.json({
        success: true,
        Library
      });
    })
    .catch(err => next(err))
});

module.exports = router;
