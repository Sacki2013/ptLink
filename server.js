// Environment Variables
require('dotenv').config();

// Dependencies
const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

// File Imports
const trainers = require('./routes/trainers');
const config = require('./config/database');

// Database Connection
mongoose.connect(config.db);
console.log(config.db);
mongoose.connection.on('connected', (err) => {
  console.log('Connected to MongoDB');
});

// Server / Port
const server = express();
const port = process.env.PORT || 2204;

// Middleware
server.use(logger('dev'));
server.use(cors());
server.use(bodyParser.json());
server.use('/trainers', trainers);
server.use(express.static(path.join(__dirname, 'client')));
server.use(passport.initialize());
server.use(passport.session());
require('./config/passport')(passport);

// Test Route
server.get('/', (req, res) => {
  res.send('Angular Coming Soon');
});

// Start Server
server.listen(port, () => {
  console.log('Server running on port: ' + port);
});