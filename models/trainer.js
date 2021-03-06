// Dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// File Imports
const config = require('../config/database');

// Trainer Schema
const TrainerSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  address: {
    doorNumber: { type: String },
    street: { type: String },
    town: { type: String },
    city: { type: String },
    postCode: { type: String }
  }, 
  trainingMethod: { type: String },
  tags: [String],
  age: { type: Number, required: true },
  sex: { type: String, required: true },
  repsRef: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
  clients: { type: Array, default: [] },
  password: { type: String, required: true }
});

const Trainer = module.exports = mongoose.model('Trainer', TrainerSchema);

module.exports.getTrainerById = function(id, callback) {
  Trainer.findById(id, callback);
}

module.exports.getTrainerByUsername = function(userName, callback) {
  const query = { userName: userName };
  Trainer.findOne(query, callback);
}

module.exports.addTrainer = function(newTrainer, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newTrainer.password, salt, (err, hash) => {
      newTrainer.password = hash;
      if (err) throw err;
      newTrainer.save(callback);
    });
  });
}

module.exports.comparePassword = function(loginPassword, hash, callback) {
  bcrypt.compare(loginPassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
}

module.exports.updateTrainer = function(id, updTrainer, callback) {
  Trainer.findByIdAndUpdate(id, updTrainer, callback);
}