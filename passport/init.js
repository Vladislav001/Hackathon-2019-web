const login = require('./login');
const signup = require('./signup');
const Employer = require('../models/employer');

module.exports = function(passport){


  passport.serializeUser(function(user, done) {
    console.log('serializing user: ');
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    Employer.findById(id, function(err, user) {
      console.log('deserializing user:',user);
      done(err, user);
    });
  });


  login(passport);
  signup(passport);

};
