// Dependencies
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// File Imports
const config = require('../config/database');
const Trainer = require('../models/trainer');

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    Trainer.getTrainerById(jwt_payload._doc._id, (err, trainer) => {
      if (err) {
        return done(err, false);
      }
      if (trainer) {
        return done(null, trainer);
      } else {
        return done(null, false);
      }
    });
  }));
}