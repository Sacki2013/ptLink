// Dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// File Imports
const Trainer = require('../models/trainer');
const config = require('../config/database');

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
router.post('/authenticate', (req, res, next) => {
  const userName = req.body.userName;
  const password = req.body.password;

  Trainer.getTrainerByUsername(userName, (err, trainer) => {
    if (err) throw err;
    if (!trainer) {
      return res.json({
        success: false,
        message: 'Trainer not found!'
      });
    }

    Trainer.comparePassword(password, trainer.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(trainer, config.secret, {
          expiresIn: 604800 // A week
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          trainer: {
            id: trainer._id,
            fullName: trainer.firstName + ' ' + trainer.lastName
          }
        })
      } else {
        return res.json({
          success: false,
          message: 'Incorrect password'
        });
      }
    });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json({
    trainer: req.user
  });
});

// TODO: Note Really: passport.authenticate is how to protect routes for the user

module.exports = router;