const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt-nodejs');
const Employer = require('../models/employer');

module.exports = function (passport) {

  passport.use('login', new LocalStrategy({
    passReqToCallback: true
  },
    function (req, email, password, done) {

        Employer.findOne({ 'email': email },
        function (err, user) {
          if (err)
            return done(err);

          if (!user) {
            console.log('User Not Found with email ' + email);
            return done(null, false, req.flash('message', 'User Not found.'));
          }

          if (!isValidPassword(user, password)) {
            console.log('Invalid Password');
            return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
          }

          return done(null, user);
        }
      );
    })
  );


  const isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.password);
  }

}
