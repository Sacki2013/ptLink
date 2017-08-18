// Dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// File Imports
const Trainer = require('../models/trainer');

// Register
router.post('/register', (req, res, next) => {
  let newTrainer = new Trainer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    age: req.body.age,
    sex: req.body.sex,
    repsRef: req.body.repsRef,
    password: req.body.password
  });

  Trainer.addTrainer(newTrainer, (err, trainer) => {
    if (err) {
      res.json({
        success: false,
        message: 'Failed to register trainer.',
        error: err
      });
    } else {
      res.json({
        success: true,
        message: 'Trainer registered'
      });
    }
  });
});

// Authenticate
router.post('/login', (req, res, next) => {
  res.send('Authenticate Route');
});

// Profile
router.get('/profile', (req, res, next) => {
  res.send('Profile Route');
});

module.exports = router;